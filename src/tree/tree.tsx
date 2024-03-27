import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { withNativeProps } from '../utils/native-props';
import { CheckTree, TreeInstance, TreeNode, TreeProps } from './type'
import CheckBox from '../check-box';
import { classBem, replaceClassName } from '../utils';
import { getCheckKeys, getIsSomeChildCheck, getParentKeys, getTreeDataItem } from './utils';
import { usePropsState } from '../hooks';

const classPrefix = `lhhui-tree`;

type TitleNodeInfo = Record<string, {height: number}>

/** 标题的最小高度 */
const TITLE_MIN_HEIGHT = 24;
/** 每个标题的下边距 */
const TITLE_MB = 6;

const Tree = forwardRef<TreeInstance, TreeProps>((props, ref) => {
  const { checkable, treeData, checkedKeys, defaultExpandAll, multiple, singleSelected, selectable = true, selectedKeys: propsSelectedKeys, onCheck, onSelect, onRightClick, ...ret } = props

  /** 首层节点的key值 */
  const [firstNodeKeys, setFirstNodeKeys] = useState<string[]>([]);
  /** 用于渲染和交互的树形结构 */
  const [checkTree, setCheckTree] = useState<CheckTree>();
  const [selectedKeys, setSelectedKeys] = usePropsState<string[] | undefined>(propsSelectedKeys);
  /** 标题节点的高度等信息 */
  const [titleNodeInfo, setTitleNodeInfo] = useState<TitleNodeInfo>({});
  const isTreeRender = useRef(false)

  /** 单选节点 */
  const onSingleCheck = (key: string, curChecked: boolean, cTree = checkTree!) => {
    if(!cTree[key]) return
    Object.keys(cTree).forEach(k => {
      cTree[k].checked = false
    });
    if(!curChecked) return;
    // 找到最底层的子节点并选中
    (function findChildToCheck(curKey: string, childKeys?: string[]) {
      if(childKeys?.length) {
        findChildToCheck(childKeys[0], cTree[childKeys[0]].childKeys)
      } else {
        cTree[curKey].checked = true
      }
    })(key, cTree[key]?.childKeys);
  }

  /** 处理父子节点的选中状态 */
  const onCheckChildAndParent = (key: string, curChecked: boolean, cTree = checkTree!) => {
    const checkItem = cTree[key];

    // 全选/不选所有子节点
    (function checkAllChild(childKeys?: string[]) {
      childKeys?.forEach(childKey => {
        cTree[childKey].checked = curChecked
        checkAllChild(cTree[childKey].childKeys)
      })
    })(checkItem.childKeys);

    // 处理父节点的选中状态
    (function checkAllParent(parentKey?: string) {
      if(!parentKey) return
      if(!curChecked) { // 取消所有父节点的选中
        cTree[parentKey].checked = false
        checkAllParent(cTree[parentKey].parentKey)
      } else { // 将所有子节点被全选的父节点也选中
        const isSiblingCheck = !!cTree[parentKey].childKeys?.every(childKey => cTree[childKey].checked)
        if(isSiblingCheck) { // 判断兄弟节点是否也全被选中
          cTree[parentKey].checked = true
          checkAllParent(cTree[parentKey].parentKey)
        }
      }
    })(checkItem.parentKey);

    // 同层单选时，使兄弟节点取消选中
    if(singleSelected && curChecked) {
      const keys = cTree[key].parentKey ? cTree[cTree[key].parentKey!].childKeys : firstNodeKeys
      keys?.forEach(siblingKey => {
        if(siblingKey !== key) {
          cTree[siblingKey].checked = false
        }
      })
    }
  }

  // 初始化选择树形结构
  useEffect(() => {
    if(!treeData?.length) return
    const generateCheckTree = (list: TreeNode[], parentKey?: string) => {
      return list?.reduce((pre, cur) => {
        const curChecked = Boolean(checkedKeys?.includes(cur.key));
        pre[cur.key] = {
          show: !!defaultExpandAll, 
          checked: curChecked, 
          parentKey,
        }
        if(cur.checkable) pre[cur.key].checkable = true
        if(cur.disableCheckbox) pre[cur.key].disableCheckbox = true
        if(cur.disabled) pre[cur.key].disabled = true
        if(cur.children?.length) {
          pre[cur.key].childKeys = cur.children.map(c => c.key)
          const treeChild = generateCheckTree(cur.children, cur.key)
          pre = {...pre, ...treeChild}
        }
        return pre
      }, {} as CheckTree)
    }
    const state = generateCheckTree(treeData)
    if(!singleSelected) {
      checkedKeys?.forEach(key => onCheckChildAndParent(key, true, state))
    } else {
      if(checkedKeys?.[0]) onSingleCheck(checkedKeys[0], true, state)
    }
    onCheck?.(getCheckKeys(state))
    setFirstNodeKeys(treeData.map(item => item.key))
    setCheckTree(state)
    isTreeRender.current = true
  }, [treeData])
  
  // 等待树形结构渲染完毕，获取 title 的高度
  useEffect(() => {
    if(!checkTree || !isTreeRender.current) return
    const info: TitleNodeInfo = {};
    for(let key in checkTree) {
      const titleNode = document.querySelector(`.${classPrefix}-node-title-${replaceClassName(key)}`)
      if(titleNode) {
        info[key] = {height: Math.max(titleNode.clientHeight, TITLE_MIN_HEIGHT) + TITLE_MB} 
      }
    }
    setTitleNodeInfo(info)
    isTreeRender.current = false
  }, [checkTree])

  useEffect(() => {
    if(!checkTree) return
    if(!singleSelected) {
      checkedKeys?.forEach(key => onCheckChildAndParent(key, true))
    } else {
      if(checkedKeys?.[0]) onSingleCheck(checkedKeys[0], true)
    }
    if(checkedKeys?.length) {
      setCheckTree({...checkTree})
    }
  }, [checkedKeys])

  useImperativeHandle(ref, () => ({
    getCheckTree: () => JSON.parse(JSON.stringify(checkTree)),
    getParentKeys(key) {
      return getParentKeys(key, checkTree)
    },
    getSiblingKeys(key) {
      if(!checkTree?.[key]) return void 0
      if(!checkTree[key]?.parentKey) {
        return firstNodeKeys
      }
      return checkTree[checkTree[key].parentKey!].childKeys
    },
    getChildKeys(key) {
      return checkTree?.[key].childKeys
    },
    getCheckKeys: () => getCheckKeys(checkTree),
    getTreeDataItem,
  }))

  /** 点击选中节点 */
  const onNodeCheck = (key: string) => {
    const checkItem = checkTree![key]
    const curChecked = !checkItem.checked
    checkItem.checked = curChecked;

    if(singleSelected) onSingleCheck(key, curChecked)
    else onCheckChildAndParent(key, curChecked)
    setCheckTree({...checkTree})

    const keys = getCheckKeys(checkTree!)

    onCheck?.(keys, {
      key, 
      // 这步判断主要是单选时，选择父节点时只会选中其子节点
      checked: keys.includes(key) ? curChecked : false,  
      parentKeys: getParentKeys(key, checkTree!),
      treeDataItem: getTreeDataItem(key, treeData),
    })
  }

  /** 点击标题选中 */
  const onTitleClick = (key: string) => {
    if(!selectable) return
    let keys = selectedKeys ?? [];
    const index = keys.indexOf(key)
    if(index === -1) {
      if(multiple) keys.push(key)
      else keys = [key]
    } else {
      keys.splice(index, 1)
    }
    setSelectedKeys([...keys])
    onSelect?.([...keys], {
      key, 
      selected: index === -1,
      parentKeys: getParentKeys(key, checkTree!),
      treeDataItem: getTreeDataItem(key, treeData),
    })
  }

  const getTreeChildHeight = (list: TreeNode[]) => {
    return list?.reduce((pre, cur) => {
      pre += (titleNodeInfo[cur.key]?.height ?? (TITLE_MIN_HEIGHT + TITLE_MB))
      if(checkTree?.[cur.key]?.show && cur.children?.length) {
        pre += getTreeChildHeight(cur.children)
      }
      return pre
    }, 0) ?? 0
  }

  const renderTreeList = (list?: TreeNode[]) => {
    if(!checkTree) return null
    return list?.map(item => {
      const checkItem = checkTree[item.key]
      if(!checkItem) return null
      return (
        <div key={item.key} className={`${classPrefix}-node`}>
          <div className={`${classPrefix}-node-content`}>
            {item.children?.length ? (
              <div 
                onClick={() => {
                  checkItem.show = !checkItem.show
                  setCheckTree({...checkTree})
                }}
              >
                <span className={`${classPrefix}-node-expand`}>
                  <span className={classBem(`${classPrefix}-node-expand-icon`, {show: checkItem.show})}>
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>
                  </span>
                </span>
              </div>
            ) : <span className={`${classPrefix}-node-expand-placeholder`}></span>}
            {(checkable && item.checkable !== false) && (
              <CheckBox 
                checked={checkItem.checked} 
                disabled={item.disabled || item.disableCheckbox}
                indeterminate={getIsSomeChildCheck(checkItem, checkTree)}
                onChange={() => {
                  if(item.disabled || item.disableCheckbox) return
                  onNodeCheck(item.key)
                }} 
              />   
            )}
            <div 
              className={classBem(`${classPrefix}-node-title`, {
                selected: selectedKeys?.includes(item.key),
                disabled: item.disabled,
                [item.key]: true,
              })} 
              onClick={() => {
                if(!item.disabled) onTitleClick(item.key)
              }}
              onContextMenu={(event) => {
                event.stopPropagation()
                event.preventDefault()
                onRightClick?.({event, key: item.key, parentKeys: getParentKeys(item.key, checkTree!)})
              }}
            >{item.title}</div>
          </div>
          <div 
            className={`${classPrefix}-node-children`} 
            // height: fit-content; 无法触发过渡效果，需要准确的值
            // 也可通过 maxHeight 设置一个很大的值来解决，但值过大又会使过度效果难看，所以这里需要获取一个准确的高度
            style={{maxHeight: checkItem.show ? `${getTreeChildHeight(item.children!)}px` : 0}}
          >
            {renderTreeList(item.children)}
          </div>
        </div>
      )
    })
  }

  return withNativeProps(
    ret,
    <div className={classPrefix}>
      {renderTreeList(treeData)}
    </div>
  )
})

export default Tree
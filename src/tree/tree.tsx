import React, { useEffect, useState } from 'react';
import { withNativeProps } from '../utils/native-props';
import { TreeNode, TreeProps } from './type'
import CheckBox from '../check-box';
import { classBem } from '../utils';

const classPrefix = `lhhui-tree`;

// const firstNode = 'first-node'

type CheckTreeItem = {
  /** 父节点的 key 值 */
  parentKey?: string
  /** 子节点的 key 数组 */
  childKeys?: string[]
  /** 是否展开 */
  show: boolean
  /** 是否选中 */
  checked: boolean
  checkable?: boolean
  disableCheckbox?: boolean
  disabled?: boolean
}

type CheckTree = Record<string, CheckTreeItem>

const Tree = (props: TreeProps) => {
  const { checkable, treeData, checkedKeys, defaultExpandAll, multiple, singleSelected, onCheck, onSelect, onRightClick, ...ret } = props

  /** 首层节点的key值 */
  const [firstNodeKeys, setFirstNodeKeys] = useState<string[]>([]);
  /** 用于渲染和交互的树形结构 */
  const [checkTree, setCheckTree] = useState<CheckTree>();
  const [selectdKeys, setSelectdKeys] = useState<string[]>([]);
  console.log('checkTree: ', checkTree);

  // 单选节点
  const onSingleCheck = (key: string, curChecked: boolean, cTree = checkTree!) => {
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
    })(key, cTree[key].childKeys);
  }

  /** 判断父子节点的选中状态 */
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

  const getCheckKeys = (tree: CheckTree = checkTree!) => (
    Object.keys(tree).reduce((pre, key) => {
      if(tree[key].checked) {
        pre.push(key)
      }
      return pre
    }, [] as string[])
  )

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
  }, [treeData])

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

  /** 点击选中节点 */
  const onNodeCheck = (key: string) => {
    const checkItem = checkTree![key]
    const curChecked = !checkItem.checked
    checkItem.checked = curChecked;

    if(singleSelected) onSingleCheck(key, curChecked)
    else onCheckChildAndParent(key, curChecked)
    setCheckTree({...checkTree})

    onCheck?.(getCheckKeys(), {checked: curChecked, key})
  }

  /** 点击标题选中 */
  const onTitleClick = (key: string) => {
    let keys = selectdKeys;
    const index = keys.indexOf(key)
    if(index === -1) {
      if(multiple) keys.push(key)
      else keys = [key]
    } else {
      keys.splice(index, 1)
    }
    setSelectdKeys([...keys])
    onSelect?.([...keys], {key, selected: index === -1})
  }

  /** 获取孩子节点的数量 */
  const getTreeChildLength = (list: TreeNode[]) => {
    return list?.reduce((pre, cur) => {
      if(checkTree![cur.key].show && cur.children?.length) {
        pre += getTreeChildLength(cur.children)
      }
      return pre
    }, list.length) ?? 0
  }

  const getIsEveryChildCheck = (checkItem: CheckTreeItem): boolean => {
    if(!checkItem.childKeys?.length) return true
    const isAllCheck = checkItem.childKeys.every(cKey => (
      checkTree![cKey].checked && getIsEveryChildCheck(checkTree![cKey])
    ))
    return Boolean(isAllCheck)
  }

  const getIsSomeChildCheck = (checkItem: CheckTreeItem): boolean => {
    const isSomeCheck = checkItem.childKeys?.some(cKey => (
      checkTree![cKey].checked || getIsSomeChildCheck(checkTree![cKey])
    ))
    return Boolean(isSomeCheck)
  }

  const renderTreeList = (list?: TreeNode[]) => {
    if(!checkTree) return null
    return list?.map(item => {
      const checkItem = checkTree![item.key]
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
              (() => {
                // 单选的时候才需该逻辑
                // const isAllChildCheck = singleSelected ? getIsEveryChildCheck(checkItem) : true
                return (
                  <CheckBox 
                    // checked={checkItem.checked && isAllChildCheck} 
                    checked={checkItem.checked} 
                    disabled={item.disabled || item.disableCheckbox}
                    indeterminate={getIsSomeChildCheck(checkItem)}
                    onChange={() => {
                      if(item.disabled || item.disableCheckbox) return
                      onNodeCheck(item.key)
                    }} 
                  />   
                )
              })()
            )}
            <div 
              className={classBem(`${classPrefix}-node-title`, {
                selected: selectdKeys.includes(item.key),
                disabled: item.disabled,
              })} 
              onClick={() => {
                if(!item.disabled) onTitleClick(item.key)
              }}
            >{item.title}</div>
          </div>
          <div 
            className={`${classPrefix}-node-children`} 
            // height: fit-content; 无法触发过渡效果，需要准确的值
            // 也可通过 maxHeight 设置一个很大的值来解决，但值过大又会使过度效果难看，所以这里需要获取一个准确的高度
            style={{maxHeight: checkItem.show ? `${getTreeChildLength(item.children!) * 30}px` : 0}}
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
}

export default Tree
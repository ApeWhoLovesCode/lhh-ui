import React, { useEffect, useState } from 'react';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { TreeDataItem, TreeProps } from './type'
import CheckBox from '../check-box';
import { classBem } from '../utils';

const classPrefix = `lhhui-tree`;

export type CheckTree = Record<string, {
  /** 父节点的 key 值 */
  parentKey?: string
  /** 子节点的 key 数组 */
  childKeys?: string[]
  /** 是否展开 */
  show: boolean
  /** 是否选择 */
  checked: boolean
}>

const defaultProps = {
  
}
type RequireType = keyof typeof defaultProps

const Tree = (comProps: TreeProps) => {
  const props = useMergeProps<TreeProps, RequireType>(comProps, defaultProps)
  const { treeData, checkedKeys, defaultExpandAll, onCheck, onRightClick, ...ret } = props

  const [checkTree, setCheckTree] = useState<CheckTree>();
  console.log('checkTree: ', checkTree);

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
  }

  // 初始化选择树形结构
  useEffect(() => {
    const generateCheckTree = (list?: TreeDataItem[], parentKey?: string) => {
      return list?.reduce((pre, cur) => {
        const curChecked = Boolean(checkedKeys?.includes(cur.key));
        pre[cur.key] = {
          show: !!defaultExpandAll, 
          checked: curChecked, 
          parentKey
        }
        if(cur.children?.length) {
          pre[cur.key].childKeys = cur.children.map(c => c.key)
          const treeChild = generateCheckTree(cur.children, cur.key)
          pre = {...pre, ...treeChild}
        }
        return pre
      }, {} as CheckTree)
    }
    const state = generateCheckTree(treeData)
    checkedKeys?.forEach(key => {
      onCheckChildAndParent(key, true, state)
    })
    setCheckTree(state)
  }, [treeData])

  useEffect(() => {
    if(!checkTree) return
    checkedKeys?.forEach(key => {
      onCheckChildAndParent(key, true)
    })
    if(checkedKeys?.length) {
      setCheckTree({...checkTree})
    }
  }, [checkedKeys])

  /** 点击选中节点 */
  const onNodeCheck = (key: string) => {
    const cTree = checkTree!
    const checkItem = cTree[key]
    const curChecked = !checkItem.checked
    checkItem.checked = curChecked;

    onCheckChildAndParent(key, curChecked)
    setCheckTree({...checkTree})

    if(onCheck instanceof Function) {
      const checkKeys = Object.keys(cTree).reduce((pre, key) => {
        if(cTree[key].checked) {
          pre.push(key)
        }
        return pre
      }, [] as string[])
      onCheck(checkKeys, {checked: curChecked, key})
    }
  }

  /** 获取孩子节点的数量 */
  const getTreeChildLength = (list: TreeDataItem[]) => {
    return list?.reduce((pre, cur) => {
      if(checkTree![cur.key].show && cur.children?.length) {
        pre += getTreeChildLength(cur.children)
      }
      return pre
    }, list.length) ?? 0
  }

  const renderTreeList = (list?: TreeDataItem[]) => {
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
            <CheckBox 
              checked={checkItem.checked} 
              indeterminate={!checkItem.checked && checkItem.childKeys?.some(cKey => checkTree?.[cKey].checked)}
              onChange={() => onNodeCheck(item.key)} 
            />
            <div className={`${classPrefix}-node-text`}>{item.title}</div>
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
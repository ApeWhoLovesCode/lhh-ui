import { CheckTree, CheckTreeItem } from "./tree";
import { TreeNode } from "./type";

/** 获取父节点的所有 key */
export const getParentKeys = (key: string, checkTree: CheckTree, list: string[] = []): string[] => {
  if(!checkTree![key].parentKey) return list
  list.push(checkTree![key].parentKey!)
  return getParentKeys(checkTree![key].parentKey!, checkTree, list)
}

/** 获取当前 check 的所有 key */
export const getCheckKeys = (tree: CheckTree) => (
  Object.keys(tree).reduce((pre, key) => {
    if(tree[key].checked) {
      pre.push(key)
    }
    return pre
  }, [] as string[])
)

  /** 获取孩子节点的数量 */
export const getTreeChildLength = (list: TreeNode[], checkTree: CheckTree) => {
  return list?.reduce((pre, cur) => {
    if(checkTree![cur.key].show && cur.children?.length) {
      pre += getTreeChildLength(cur.children, checkTree)
    }
    return pre
  }, list.length) ?? 0
}

/** 获取是否有子节点 check 了 */
export const getIsSomeChildCheck = (checkItem: CheckTreeItem, checkTree: CheckTree): boolean => {
  const isSomeCheck = checkItem.childKeys?.some(cKey => (
    checkTree![cKey].checked || getIsSomeChildCheck(checkTree![cKey], checkTree)
  ))
  return Boolean(isSomeCheck)
}

/** 暂时没用 */
export const getIsEveryChildCheck = (checkItem: CheckTreeItem, checkTree: CheckTree): boolean => {
  if(!checkItem.childKeys?.length) return true
  const isAllCheck = checkItem.childKeys.every(cKey => (
    checkTree![cKey].checked && getIsEveryChildCheck(checkTree![cKey], checkTree)
  ))
  return Boolean(isAllCheck)
}

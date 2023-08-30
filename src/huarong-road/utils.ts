import { Direction, DirectionType } from "../utils";
import { HeroesIndex } from "./type";

export const getPositionItem = (
  {gridSize, index, locationArr, gap}: {
    gridSize: number
    index: number
    locationArr: HeroesIndex[][] 
    gap: number
  }
) => {
  const obj = {
    row: 0,
    col: 0,
    width: gridSize,
    height: gridSize,
  }
  locationArr.some((item, rowIndex) => {
    const colIndex = item.indexOf(handleIndex(index))
    if(colIndex !== -1) {
      obj.row = rowIndex
      obj.col = colIndex
      if(index === 0) {
        obj.width = 2 * gridSize + gap
        obj.height = 2 * gridSize + gap
      } else if(index <= 5) {
        if(item[colIndex + 1] === item[colIndex]) { // 该五虎将是横着的
          obj.width = 2 * gridSize + gap
        } else { // 该五虎将是竖着的
          obj.height = 2 * gridSize + gap
        }
      }
      return true
    }
    return false
  })
  return obj
}

export const handleIndex = (index: number): HeroesIndex => {
  if(index === 0) {
    return 1
  } else if(index <= 5) {
    return 20 + index as HeroesIndex
  } else {
    return 25 + index as HeroesIndex
  }
}

/** 获取行列的位置 */
export function getRowColItem(gridArr: HeroesIndex[][], index: number) {
  const obj = {
    row: 0,
    col: 0,
  }
  gridArr.some((item, rowIndex) => {
    const colIndex = item.indexOf(handleIndex(index))
    if(colIndex !== -1) {
      obj.row = rowIndex
      obj.col = colIndex
      return true
    }
    return false
  })
  return obj
}

type CheckDirectionRes = {[key in Direction]: number} | 0

/** 检查华容道item可以移动的方向 */
export function checkRoadDirection(arr: HeroesIndex[][], row: number, col: number): CheckDirectionRes {
  if(!arr?.length) return 0
  const value = arr[row][col]
  if(value > 30) { // 小兵
    return handleHeroDirectionVal({arr, row, col, status: 4})
  } else { 
    let status: HeroesStatus = 1
    if(value > 20) { // 五虎将
      status = arr[row][col + 1] === value ? 2 : 3
    }
    return handleHeroDirectionVal({arr, row, col, status})
  }
}

type HeroesStatus = 1 | 2 | 3 | 4
/**
 * @param status 1: boss 2: 横着的英雄 3: 竖着的英雄 4: 卒
 */
function handleHeroDirectionVal({arr, row, col, status}: {
  arr: HeroesIndex[][], row: number, col: number, status: HeroesStatus
}): CheckDirectionRes {
  const colNext = status === 2 || status === 1
  const rowNext = status === 3 || status === 1
  // 上右下左四个位置组成的数组。
  const checkArr: checkItem[] = [
    {addRow: -1, addCol: 0, colNext},
    {addRow: 0, addCol: 1, rowNext},
    {addRow: 1, addCol: 0, colNext},
    {addRow: 0, addCol: -1, rowNext},
  ]
  const res: CheckDirectionRes = {1: 0, 2: 0, 3: 0, 4: 0}
  // 检查下一个格子是否为空
  const checkNextGrid = ({addRow, addCol, rowNext, colNext}: checkItem, i: number) => {
    const isColNext = colNext ? arr[row + addRow]?.[col + addCol + 1] === 0 : true
    const isRowNext = rowNext ? arr[row + addRow + 1]?.[col + addCol] === 0 : true
    if(arr[row + addRow]?.[col + addCol] === 0 && isColNext && isRowNext) {
      res[(i + 1) as Direction]++
      checkNextGrid({
        addRow: addRow += checkArr[i].addRow, 
        addCol: addCol += checkArr[i].addCol, 
        rowNext, 
        colNext
      }, i)
    }
  }
  for(let i = 0; i < checkArr.length; i++) {
    let {addRow, addCol, ...p} = checkArr[i]
    if(i === 1 && colNext) addCol++;
    if(i === 2 && rowNext) addRow++;
    checkNextGrid({addRow, addCol, ...p}, i)
  }
  return Object.values(res).some(v => v) ? res : 0
}
type checkItem = {
  addRow: number
  addCol: number 
  rowNext?: boolean
  colNext?: boolean
}

/** 检查是否获胜 */
export function checkToWin(arr: HeroesIndex[][]) {
  return arr[3][1] === 1 && arr[3][2] === 1 && arr[4][1] === 1 && arr[4][2] === 1
}
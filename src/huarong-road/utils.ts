import { DirectionType, checkDirectionVal } from "../utils";
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

/** 检查华容道item可以移动的方向 */
export function checkRoadDirection(arr: HeroesIndex[][], row: number, col: number): DirectionType[] | 0 {
  if(!arr?.length) return 0
  const value = arr[row][col]
  if(value > 30) { // 小兵
    return checkDirectionVal({arr, row, col, isArr: true}) as DirectionType[] | 0
  } else { 
    let heroStatus: 1 | 2 | 3 = 1
    if(value > 20) { // 五虎将
      heroStatus = arr[row][col + 1] === value ? 2 : 3
    }
    return handleHeroDirectionVal({arr, row, col, heroStatus})
  }
}

/**
 * 
 * @param heroStatus 1: boss 2: 横着的英雄 3: 竖着的英雄
 * @returns 
 */
function handleHeroDirectionVal({arr, row, col, heroStatus}: {
  arr: HeroesIndex[][], row: number, col: number, heroStatus: 1 | 2 | 3
}): DirectionType[] | 0 {
  const colNext = heroStatus === 2 || heroStatus === 1
  const rowNext = heroStatus === 3 || heroStatus === 1
  const checkArr = [
    {row: row - 1, col: col, colNext},
    {row: row, col: col + (colNext ? 2 : 1), rowNext},
    {row: row + (rowNext ? 2 : 1), col: col, colNext},
    {row: row, col: col - 1, rowNext},
  ]
  const res: DirectionType[] = []
  for(let i = 0; i < checkArr.length; i++) {
    const isColNext = checkArr[i].colNext ? arr[checkArr[i].row]?.[checkArr[i].col + 1] === 0 : true
    const isRowNext = checkArr[i].rowNext ? arr[checkArr[i].row + 1]?.[checkArr[i].col] === 0 : true
    if(arr[checkArr[i].row]?.[checkArr[i].col] === 0 && isColNext && isRowNext) {
      res.push((i + 1) as DirectionType)
    }
  }
  return res.length ? res : 0
}

/** 检查是否获胜 */
export function checkToWin(arr: HeroesIndex[][]) {
  return arr[3][1] === 1 && arr[3][2] === 1 && arr[4][1] === 1 && arr[4][2] === 1
}
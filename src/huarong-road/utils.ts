import { HeroesIndex } from "./type";

export const getPositionItem = (
  {gridSize, index, locationArr, gap}: {
    gridSize: number
    index: number
    locationArr: HeroesIndex[][] 
    gap: number
  }
) => {
  let obj = {
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
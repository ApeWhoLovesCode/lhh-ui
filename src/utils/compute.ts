/** 用于比较num 最大和最小不能超过边界值 */
export function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/** 初始化创建二维数组 */
export function createTwoArray<T>(rowNum: number, colNum: number, cb: (rowNum: number, colNum: number) => T) {
  return Array.from({length: rowNum}, (_, i1) => (
    Array.from({length: colNum}, (_, i2) => cb(i1, i2))
  ))
}

/** 方向 1:上 2:右 3:下 4:左 */
export type Direction = 1 | 2 | 3 | 4
/** 方向 1:上 2:右 3:下 4:左 0:不能移动 */
export type DirectionType = Direction | 0
/** 
 * 检查可以移动的方向
 * @isArr 代表以数组形式返回可以移动的方向值
 * @returns 0: 代表没方向可移动
 */
export function checkDirectionVal({arr, row, col, isArr}: {
  arr?: number[][], row: number, col: number, isArr?: boolean
}): DirectionType | DirectionType[] {
  if(!arr?.length) return 0
  const checkArr = [
    {row: row - 1, col: col},
    {row: row, col: col + 1},
    {row: row + 1, col: col},
    {row: row, col: col - 1},
  ]
  const res: DirectionType[] = []
  for(let i = 0; i < checkArr.length; i++) {
    if(arr[checkArr[i].row]?.[checkArr[i].col] === 0) {
      if(isArr) {
        res.push(i + 1 as DirectionType)
      } else {
        return i + 1 as DirectionType
      }
    }
  }
  return res.length ? res : 0
}
/** 检查xy的移动方向 */
export function checkDirectionXY(deltaX: number, deltaY: number) {
  const directionX = !deltaX ? 0 : (deltaX > 0 ? 2 : 4) as DirectionType
  const directionY = !deltaY ? 0 : (deltaY > 0 ? 3 : 1) as DirectionType
  return {directionX, directionY}
}
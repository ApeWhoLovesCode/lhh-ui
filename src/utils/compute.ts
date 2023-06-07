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

/** 方向 1:左 2:上 3:右 4:下 0:不能移动 */
export type DirectionType = 1 | 2 | 3 | 4 | 0
/** 检查可以移动的方向  */
export function checkDirectionVal(arr: number[][], row: number, col: number): DirectionType {
  if(!arr || !arr?.length) return 0
  if(arr[row]?.[col - 1] === 0) return 1;
  else if(arr[row - 1]?.[col] === 0) return 2;
  else if(arr[row]?.[col + 1] === 0) return 3;
  else if(arr[row + 1]?.[col] === 0) return 4;
  return 0
}
/** 检查xy的移动方向 */
export function checkDirectionXY(deltaX: number, deltaY: number) {
  const directionX = !deltaX ? 0 : (deltaX > 0 ? 3 : 1) as DirectionType
  const directionY = !deltaY ? 0 : (deltaY > 0 ? 4 : 2) as DirectionType
  return {directionX, directionY}
}
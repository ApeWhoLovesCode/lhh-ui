import { CenterPointType } from "./type"

/**
 * 获取圆上一条直线两个点之间的角度(线的长度, 半径)
 */
export const getLineAngle = (line: number, oblique: number) => {
  return (Math.asin(line / oblique) * 180) / Math.PI
}

/** 获取旋转的角度是否需要取反 */
export const getRotateDegAbs = (centerPoint: CenterPointType, isVertical: boolean, isFlipDirection?: boolean) => {
  let num = 1
  if(centerPoint === 'auto') {
    num = isVertical ? 1 : -1
  } else if(centerPoint === 'left' || centerPoint === 'bottom' || centerPoint === 'center') {
    num = -1
  }
  return num * (isFlipDirection ? -1 : 1)
}
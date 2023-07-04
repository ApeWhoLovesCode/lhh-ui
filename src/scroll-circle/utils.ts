import { CenterPointType } from "./type"

/**
 * 获取圆上一条直线两个点之间的角度(线的长度, 半径)
 */
export const getLineAngle = (line: number, oblique: number) => {
  return (Math.asin(line / oblique) * 180) / Math.PI
}

/** 获取圆形区域应该移动的xy */
export const getCircleTransformXy = (centerPoint: CenterPointType, isVertical: boolean, circleR: number) => {
  let x = 0, y = 0;
  if(centerPoint === 'auto') {
    if (isVertical) {
      x = circleR;
    } else {
      y = circleR;
    }
  } else if(centerPoint === 'left') {
    x = -circleR
  } else if(centerPoint === 'top') {
    y = -circleR
  } else if(centerPoint === 'right') {
    x = circleR
  } else if(centerPoint === 'bottom') {
    y = circleR
  }
  return {x, y}
}

/** 获取旋转的角度是否需要取反 */
export const getRotateDegAbs = (
  centerPoint: CenterPointType, isVertical: boolean, isFlipDirection?: boolean
) => {
  let num = 1
  if(centerPoint === 'auto') {
    num = isVertical ? 1 : -1
  } else if(centerPoint === 'left' || centerPoint === 'bottom' || centerPoint === 'center') {
    num = -1
  }
  return (num * (isFlipDirection ? -1 : 1)) as -1 | 1
}
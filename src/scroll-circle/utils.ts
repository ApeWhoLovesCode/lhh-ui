import { CenterPointType } from "./type"

/** 获取圆形区域应该移动的xy */
export const getCircleTransformXy = (centerPoint: CenterPointType, isVertical: boolean, circleR: number) => {
  let x = 0, y = 0;
  if (centerPoint === 'auto') {
    if (isVertical) {
      x = circleR;
    } else {
      y = circleR;
    }
  } else if (centerPoint === 'left') {
    x = -circleR
  } else if (centerPoint === 'top') {
    y = -circleR
  } else if (centerPoint === 'right') {
    x = circleR
  } else if (centerPoint === 'bottom') {
    y = circleR
  }
  return { x, y }
}

/** 获取旋转的角度是否需要取反 */
export const getRotateDegAbs = (
  centerPoint: CenterPointType, isVertical: boolean, isFlipDirection?: boolean
) => {
  let num = 1
  if (centerPoint === 'auto') {
    num = isVertical ? 1 : -1
  } else if (centerPoint === 'left' || centerPoint === 'bottom' || centerPoint === 'center') {
    num = -1
  }
  return (num * (isFlipDirection ? -1 : 1)) as -1 | 1
}

/** 计算两点之间的角度 */
export function calcAngle(
  event: { x: number, y: number },
  center: { x: number, y: number },
) {
  const angle = Math.atan2(event.y - center.y, event.x - center.x);
  const deg = (angle) * (180 / Math.PI)
  return deg < 0 ? 360 + deg : deg;
}

/** 角度取整，处理转动的角度为：卡片的角度的倍数 */
export function roundingAngle({changeDeg, cardDeg, deg}: {changeDeg: number, cardDeg: number, deg: number}) {
  let mathMethods: 'ceil' | 'floor' = 'ceil';
  if (Math.abs(changeDeg) < cardDeg / 3) {
    mathMethods = changeDeg < 0 ? 'ceil' : 'floor';
  } else {
    mathMethods = changeDeg < 0 ? 'floor' : 'ceil';
  }
  return cardDeg * Math[mathMethods](deg / cardDeg);
}

/* 
const getXy = () => {
  let xy = 0
  if(centerPoint === 'auto') {
    xy = isVertical.current ? tInfo.deltaY : -tInfo.deltaX
  } else if(centerPoint === 'center') {
    const {left, top, w, h} = circleDiv.current
    const vy = left < tInfo.startX && tInfo.startX < left + w / 2 ? 1 : -1
    const vx = top < tInfo.startY && tInfo.startY < top + h / 2 ? 1 : -1
    xy = tInfo.offsetY > tInfo.offsetX ? vy * tInfo.deltaY : vx * -tInfo.deltaX
  } else if(centerPoint === 'left') {
    xy = -tInfo.deltaY
  } else if(centerPoint === 'top') {
    xy = tInfo.deltaX
  } else if(centerPoint === 'right') {
    xy = tInfo.deltaY
  } else if(centerPoint === 'bottom') {
    xy = -tInfo.deltaX
  } 
  return xy
}
*/
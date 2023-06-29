import React, { useContext, useMemo } from "react";
import { ScrollCircleItemType } from "./type";
import { ScrollCircleCtx } from "./context";

const classPrefix = 'lhhui-scroll-circle';

export const ScrollCircleItem: React.FC<ScrollCircleItemType> = ({ index, onClick, children }) => {
  const { circleR, cardDeg, isVertical, centerPoint, isClockwise, isClick } = useContext(ScrollCircleCtx);

  const cardStyle = useMemo(() => {
    let initDeg = 0
    let nx = 1;
    let ny = 1;
    let isAddDeg = false
    if(centerPoint === 'left') {
      initDeg = -90;
      if(isClockwise) {
        ny = -1;
        isAddDeg = true;
      }
    } else if(centerPoint === 'top') {
      initDeg = 180; 
      nx = isClockwise ? 1 : -1;
    } else if(centerPoint === 'right' || centerPoint === 'auto' && isVertical) {
      initDeg = 90;
      if(!isClockwise) {
        ny = -1;
        isAddDeg = true;
      }
    } else if(centerPoint === 'bottom' || centerPoint === 'auto' && !isVertical) {
      initDeg = 0;
      nx = isClockwise ? -1 : 1;
    }
    const deg = initDeg + cardDeg * index;
    const top = circleR * (1 - ny * Math.cos((deg * Math.PI) / 180));
    const left = circleR * (1 - nx * Math.sin((deg * Math.PI) / 180));
    const rotate = initDeg - nx * ny * deg + (isAddDeg ? 180 : 0);
    return {
      top: `${top}px`,
      left: `${left}px`,
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
    };
  }, [circleR, cardDeg, isVertical, centerPoint, isClockwise]);

  return (
    <div
      className={`${classPrefix}-cardWrap`}
      style={cardStyle}
      onClick={() => {
        isClick && onClick?.(index);
      }}
    >
      {children}
    </div>
  );
};
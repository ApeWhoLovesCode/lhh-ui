import React, { useContext, useMemo } from "react";
import { ScrollCircleItemType } from "./type";
import { ScrollCircleCtx } from "./context";

const classPrefix = 'lhhui-scroll-circle';

export const ScrollCircleItem: React.FC<ScrollCircleItemType> = ({ index, onClick, children }) => {
  const { circleR, cardDeg, isVertical, isClockwise, isClick } = useContext(ScrollCircleCtx);

  const cardStyle = useMemo(() => {
    const initDeg = isVertical ? 90 : 0;
    const deg = initDeg + cardDeg * index;
    let n = isClockwise ? -1 : 1;
    n *= isVertical ? -1 : 1;
    const top = circleR * (1 - Math.cos((deg * Math.PI) / 180));
    const left = circleR * (1 - n * Math.sin((deg * Math.PI) / 180));
    const rotate = initDeg - n * deg;
    return {
      top: `${top}px`,
      left: `${left}px`,
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
    };
  }, [circleR, cardDeg, isVertical, isClockwise]);

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
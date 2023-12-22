import React, { useMemo } from "react";
import { ScrollCircleItemCtxProps, ScrollCircleItemType } from "./type";
import { getCardDegXY } from "./utils";
import { withNativeProps } from "../utils";

const classPrefix = 'lhhui-scroll-circle';

const ScrollCircleItem = ({ index, onClick, children, ...props }: ScrollCircleItemType) => {
  const {circleR, cardDeg, isVertical, centerPoint, isFlipDirection, isClick, ...ret} = props as ScrollCircleItemCtxProps

  const cardStyle = useMemo(() => {
    const {initDeg, nx, ny, isAddDeg} = getCardDegXY({centerPoint, isFlipDirection, isVertical})
    const deg = initDeg + cardDeg * index;
    const top = circleR * (1 - ny * Math.cos((deg * Math.PI) / 180));
    const left = circleR * (1 - nx * Math.sin((deg * Math.PI) / 180));
    const rotate = initDeg - nx * ny * deg + (isAddDeg ? 180 : 0);
    return {
      top: `${top}px`,
      left: `${left}px`,
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
    };
  }, [circleR, cardDeg, isVertical, centerPoint, isFlipDirection]);

  return withNativeProps(ret,
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

export default React.memo(ScrollCircleItem)
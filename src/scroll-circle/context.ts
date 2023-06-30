import { createContext } from "react";
import { CenterPointType } from "./type";

export const ScrollCircleCtx = createContext({
  circleR: 0,
  cardDeg: 0,
  isVertical: false,
  isFlipDirection: false,
  isClick: false,
  centerPoint: 'auto' as CenterPointType
});

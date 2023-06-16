import { createContext } from "react";

export const ScrollCircleCtx = createContext({
  circleR: 0,
  cardDeg: 0,
  isVertical: false,
  isClockwise: false,
  isClick: false,
});

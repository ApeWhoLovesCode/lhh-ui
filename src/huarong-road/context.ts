import React from "react";
import { HeroesIndex } from "./type";
import { GridPosition } from "../slider-puzzle/type";

export const HuarongRoadCtx = React.createContext<HuarongRoadCtxType>({
  gap: 2,
  gridArr: [],
  gridSize: 50,
  isReset: false,
  onChangeGrid: (p: GridPosition, preParams: GridPosition) => {}
})

export type HuarongRoadCtxType = {
  gap: number
  gridArr: HeroesIndex[][]
  /** 每个格子的大小 */
  gridSize: number
  isReset: boolean
  onChangeGrid: (p: GridPosition, preParams: GridPosition) => void
}
import React from "react";
import { HeroesIndex } from "./type";
import { GridPosition } from "../slider-puzzle/type";
import { Direction } from "../utils";

export const HuarongRoadCtx = React.createContext<HuarongRoadCtxType>({
  gap: 2,
  locationArr: [],
  gridArr: [],
  gridSize: 50,
  isReset: false,
  onChangeGrid: (p: onChangeGridParams) => {}
})

export type HuarongRoadCtxType = {
  gap: number
  /** 初始的格子信息 */
  locationArr: HeroesIndex[][]
  /** 变化的格子信息 */
  gridArr: HeroesIndex[][]
  /** 每个格子的大小 */
  gridSize: number
  isReset: boolean
  onChangeGrid: (p: onChangeGridParams) => void
}

export type onChangeGridParams = {
  p: GridPosition
  target: GridPosition
  /** 1:上 2:右 3:下 4:左 */
  direction: Direction
  index: number
}
import React from "react";
import { HeroesIndex } from "./type";

export const HuarongRoadCtx = React.createContext<HuarongRoadCtxType>({
  gap: 2,
  locationArr: [],
  gridSize: 50,
})

export type HuarongRoadCtxType = {
  gap: number
  locationArr: HeroesIndex[][]
  /** 每个格子的大小 */
  gridSize: number
}
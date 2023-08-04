import React from "react";

export const HuarongRoadCtx = React.createContext<HuarongRoadCtxType>({
  gap: 2,
})

export type HuarongRoadCtxType = {
  gap: number
}
export type CanvasInfo = {w: number, h: number}

export type DrawStateType = {
  ctx: CanvasRenderingContext2D
  ratio: number
  isHighRefreshScreen: boolean
}

export type UseRTDrawParams = {
  canvasInfo?: CanvasInfo
  onDraw: (p: {ctx: CanvasRenderingContext2D, ratio: number}) => void
}
import { useContext, useEffect, useRef } from "react"
import { classPrefixPuzzleCanvas } from "./config";
import { useSetState } from "ahooks";
import { SliderPuzzleCanvasProps } from "./type";
import { SliderPuzzleCtx } from "./context";
import useMergeProps from "../hooks/useMergeProps";
import { withNativeProps } from "../utils/native-props";
import { classBem } from "../utils/handleDom";
import React from "react";

const defaultProps = {
  globalAlpha: 0.5,
  puzzleColor: '#ddeafb',
  gameModeBackground: '#3e3e3e',
}

export default (comProps: SliderPuzzleCanvasProps) => {
  const props = useMergeProps<SliderPuzzleCanvasProps, keyof typeof defaultProps>(comProps, defaultProps)
  const { index, globalAlpha: _globalAlpha, puzzleColor: _puzzleColor, gameModeBackground: _gameModeBackground, puzzleImg: _puzzleImg, ...ret } = props
  const {puzzleGridArr, isGameMode, letter, initSpaceIndex, size, grid, isReset, ...context} = useContext(SliderPuzzleCtx)
  const globalAlpha = context.globalAlpha ?? _globalAlpha;
  const puzzleColor = context.puzzleColor ?? _puzzleColor;
  const gameModeBackground = context.gameModeBackground ?? _gameModeBackground;
  const puzzleImg = context.puzzleImg ?? _puzzleImg;

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasInfo, setCanvasInfo] = useSetState({
    ctx: null as CanvasRenderingContext2D | null | undefined,
    ratio: 1,
  })
  
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')!
    setCanvasInfo({ctx, ratio: window.devicePixelRatio ?? 1})
  }, [])

  useEffect(() => {
    startDraw()
  }, [canvasInfo, isReset, grid, puzzleGridArr, isGameMode, globalAlpha, puzzleColor, gameModeBackground, puzzleImg])

  function startDraw() {
    const {ctx, ratio} = canvasInfo
    if(!ctx || !puzzleGridArr?.length) return
    const cw = grid.w * ratio, ch = grid.h * ratio
    ctx.clearRect(0, 0, cw, ch)
    if(isGameMode) {
      ctx.save()
      ctx.globalAlpha = 1
      ctx.fillStyle = gameModeBackground
      ctx.fillRect(0, 0, cw, ch)
      ctx.restore()
    }
    if(puzzleImg) { // 画图片
      drawPuzzleImg()
      return
    }
    const w = cw * size, h = ch * size
    let lineW = w / 20
    let fontSize = Math.min(w, h) / 1.3;
    let strokeRect: CanvasInfo, text: CanvasXy;
    if(index !== void 0) { // 拼图块
      const _index = puzzleGridArr[index + (index >= initSpaceIndex ? 1 : 0)] - 1
      const rowNum = Math.floor(_index / size), colNum = _index % size;
      const startX = cw * colNum, startY = ch * rowNum
      strokeRect = {
        x: lineW * 3 / 2 - startX,
        y: lineW * 3 / 2 - startY,
        w: w - 3 * lineW,
        h: h - 3 * lineW,
      }
      text = {
        x: w / 2 - startX,
        y: h / 2 - startY,
      }
    } else { // 拼图全貌
      lineW /= size
      fontSize /= size
      strokeRect = {x: lineW * 3 / 2, y: lineW * 3 / 2, w: cw - 3 * lineW, h: ch - 3 * lineW}
      text = {x: cw / 2, y: ch / 2}
    }
    ctx.globalAlpha = globalAlpha;
    ctx.lineWidth = lineW;
    ctx.strokeStyle = puzzleColor
    ctx.strokeRect(strokeRect.x, strokeRect.y, strokeRect.w, strokeRect.h)
    ctx.fillStyle = puzzleColor
    ctx.font = `${fontSize}px 宋体`
    ctx.textAlign = 'center'
    ctx.textBaseline = "middle";
    ctx.fillText(letter, text.x, text.y)
  }

  function drawPuzzleImg() {
    const {ctx, ratio} = canvasInfo
    if(!ctx || !puzzleGridArr?.length) return
    const cw = grid.w * ratio, ch = grid.h * ratio
    const w = cw * size, h = ch * size
    const image = {x: 0, y: 0, w: cw, h: ch}
    if(index !== void 0) { // 拼图块
      const _index = puzzleGridArr[index + (index >= initSpaceIndex ? 1 : 0)] - 1
      const rowNum = Math.floor(_index / size), colNum = _index % size;
      const startX = cw * colNum, startY = ch * rowNum
      image.x = -startX
      image.y = -startY
      image.w = w
      image.h = h
    }
    const imgDom = new Image()
    imgDom.src = puzzleImg!
    imgDom.onload = () => {
      ctx.globalAlpha = globalAlpha;
      ctx.drawImage(imgDom, image.x, image.y, image.w, image.h)
    }
  }

  return withNativeProps(
    ret,
    <div 
      className={classBem(classPrefixPuzzleCanvas, {full: index === void 0})}
    >
      <canvas
        ref={canvasRef}
        width={grid.w * canvasInfo.ratio}
        height={grid.h * canvasInfo.ratio}
        style={{
          display: 'block',
          width: grid.w + 'px',
          height: grid.h + 'px',
        }}
        onContextMenu={(e) => {
          e.preventDefault()
        }}
      />
    </div>
  )
}

type CanvasInfo = {x: number, y: number, w: number, h: number}
type CanvasXy = {x: number, y: number}
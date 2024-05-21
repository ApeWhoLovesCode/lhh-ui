import { useEffect, useRef, useState } from "react";
import useLatest from "../useLatest";
import { CanvasInfo, DrawStateType, UseRTDrawParams } from "./type";
import sleep from "../../utils/sleep";
import { getScreenFps } from "./utils";

const useRTDraw = ({canvasInfo: pCanvasInfo, onDraw}: UseRTDrawParams) => {
  const timer = useRef<number | NodeJS.Timer>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ratio, setRatio] = useState(1);
  const drawState = useRef({
    ctx: void 0 as CanvasRenderingContext2D | undefined,
    isHighRefreshScreen: void 0 as boolean | undefined,
  })
  const [canvasInfo, setCanvasInfo] = useState<CanvasInfo>(pCanvasInfo ?? {w: 200, h: 200})
  const latest = useLatest({onDraw})

  function getCtx() {
    if(drawState.current.ctx) return
    const ctx = canvasRef.current?.getContext('2d')
    if(ctx) {
      drawState.current.ctx = ctx
    }
  }

  useEffect(() => {
    getCtx()
    setRatio(window.devicePixelRatio)
    getScreenFps().then(fps => {
      drawState.current.isHighRefreshScreen = fps > 65
    })
    return () => {
      cancelAnimation()
    }
  }, [])

  function onDrawFn() {
    latest.current.onDraw({ctx: drawState.current.ctx!, ratio});
  }

  /** 高刷屏锁帧，锁帧会使绘画出现掉帧 */
  function startAnimationLockFrame() {
    const fps = 60;
    let fpsInterval = 1000 / fps;
    let then = Date.now();
    (function go() {
      timer.current = requestAnimationFrame(go);
      const now = Date.now();
      const elapsed = now - then;
      if (elapsed > fpsInterval) {
        onDrawFn()
        then = now - (elapsed % fpsInterval);
      }
    })();
  }

  /** 开启动画绘画 */
  function startAnimation() {
    getCtx()
    if(!canvasRef.current) {
      console.warn('useRTDraw: Please bind the ref of canvas')
      return
    }
    if(!drawState.current.ctx) {
      console.warn('useRTDraw: Canvas context retrieval failed, can call getCtx to retrieve again')
      return
    }
    // 兼容性处理
    if(typeof requestAnimationFrame === 'undefined') {
      clearInterval(timer.current)
      timer.current = setInterval(() => {
        onDrawFn()
      }, 16.6)
      return
    }
    function runDraw() {
      if(timer.current) {
        cancelAnimationFrame(timer.current as number);
      }
      if(drawState.current.isHighRefreshScreen) {
        startAnimationLockFrame()
      } else {
        (function go() {
          timer.current = requestAnimationFrame(go);
          onDrawFn()
        })();
      }
    }
    // 等待是否为高刷屏的判断
    if(drawState.current.isHighRefreshScreen === void 0) {
      sleep(1200).then(() => {
        runDraw()
      })
      return
    }
    runDraw()
  }

  function cancelAnimation() {
    if(typeof cancelAnimationFrame === 'undefined') {
      clearInterval(timer.current)
    } else {
      cancelAnimationFrame(timer.current as number)
    }
  }

  return {
    canvasRef, 
    canvasInfo,
    drawState: {
      ...drawState.current,
      ratio,
    } as DrawStateType, 
    getCtx,
    setCanvasInfo,
    startAnimation, 
    cancelAnimation,
  }
}

export default useRTDraw
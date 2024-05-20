import { useEffect, useRef } from "react";
import useLatest from "../useLatest";

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/** 经过多少次计算后，获取fps */
export const getScreenFps = (total: number = 60): Promise<number> => {
  return new Promise(resolve => {
    const begin = Date.now();
    let count = 0;
    (function run() {
      requestAnimationFrame(() => {
        if (++count >= total) {
          const fps = Math.ceil((count / (Date.now() - begin)) * 1000)
          return resolve(fps)
        }
        run()
      })
    })()
  })
}

const useRTDraw = ({onStartDraw}: {onStartDraw: () => void}) => {
  const timer = useRef<number | NodeJS.Timer>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawState = useRef({
    ctx: null as CanvasRenderingContext2D | null,
    ratio: window.devicePixelRatio ?? 1,
    isHighRefreshScreen: void 0 as undefined | boolean,
  })
  const latest = useLatest({onStartDraw})

  useEffect(() => {
    getScreenFps().then(fps => {
      drawState.current.isHighRefreshScreen = fps > 65
    })
    return () => {
      cancelAnimation()
    }
  }, [])

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
        latest.current.onStartDraw();
        then = now - (elapsed % fpsInterval);
      }
    })();
  }

  /** 开启动画绘画 */
  function startAnimation() {
    // 兼容性处理
    if(typeof requestAnimationFrame === 'undefined') {
      clearInterval(timer.current)
      timer.current = setInterval(() => {
        onStartDraw();
      }, 30)
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
          latest.current.onStartDraw();
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

  return {drawState: drawState.current, canvasRef, startAnimation, cancelAnimation}
}

export { useRTDraw }
export default useRTDraw
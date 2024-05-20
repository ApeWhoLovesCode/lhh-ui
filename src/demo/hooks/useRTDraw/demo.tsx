import React, { useEffect, useState } from "react"
import { useRTDraw } from "lhh-ui";

export default () => {
  const [canvasInfo, setCanvasInfo] = useState({
    w: 200,
    h: 200,
  })
  const [addTime, setAddTime] = useState(0);

  function drawTime() {
    const ctx = drawState.ctx!;
    const ratio = drawState.ratio;
    ctx.font = `${12 * ratio}px 宋体`
    const now = Date.now()
    ctx.fillText(now, 30 * ratio, 30 * ratio);
    ctx.fillText(`+${addTime}`, 30 * ratio, 50 * ratio);
    ctx.fillText(`=${now + addTime}`, 30 * ratio, 70 * ratio);
  }

  const {drawState, canvasRef, startAnimation} = useRTDraw({
    onStartDraw() {
      if(!drawState.ctx) return
      drawState.ctx.clearRect(0, 0, canvasInfo.w * drawState.ratio, canvasInfo.h * drawState.ratio);
      drawTime()
    },
  })

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if(!ctx) return
    drawState.ctx = ctx
    startAnimation()
  }, [])

  return (
    <div>
      <canvas 
        ref={canvasRef}
        width={canvasInfo.w * drawState.ratio}
        height={canvasInfo.h * drawState.ratio}
        style={{
          width: canvasInfo.w + 'px',
          height: canvasInfo.h + 'px',
          border: '1px solid #ccc',
        }}
      />
      <div>
        <button onClick={() => setAddTime(v => v + 10000)}>加10秒</button>
        <button onClick={() => setAddTime(v => v + 10000)}>减10秒</button>
        <button onClick={() => setAddTime(0)}>清空</button>
      </div>
    </div>
  )
}
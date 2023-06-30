import { useRender, useTouch } from "lhh-ui";
import React from "react";

export default () => {
  const touch = useTouch();
  const { renderFn } = useRender();
  function onTouchStart(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    touch.start(e)
  }
  function onTouchMove(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    touch.move(e);
    renderFn();
  }
  return (
    <div
      className="demo-use-touch"
      onMouseDown={onTouchStart}
      onMouseMove={onTouchMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      style={{height: 200, background: '#f1f2f4', userSelect: 'none'}}
    >
      <h4>deltaX: {touch.info.startX}</h4>
      <h4>deltaY: {touch.info.startY}</h4>
      <h4>deltaX: {touch.info.deltaX}</h4>
      <h4>deltaY: {touch.info.deltaY}</h4>
    </div>
  )
}
import React from "react"
import { SliderPuzzle, isMobile } from "lhh-ui"

export default () => {
  return (
    <SliderPuzzle 
      // 数组的长度需要设置
      listLength={0} 
      // 宽高必须设置
      style={{width: '300px', height: '300px'}}
      size={5}
      gap={0}
      globalAlpha={1}
      puzzleImg='http://lhh.codeape.site/img/tom.jpeg'
      onComplete={() => {
        alert('恭喜你完成了拼图')
      }}
    >
      {/* 这里是完整的拼图 */}
      <SliderPuzzle.Canvas 
        style={{
          position: 'absolute',
          top: isMobile ? -100 : 0,
          left: isMobile ? 0 : 320, 
        }} 
      />
    </SliderPuzzle>
  )
}
import React from "react"
import SliderPuzzle from ".."
import TomIcon from "../../assets/tom.jpeg";

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
      puzzleImg={TomIcon}
      onComplete={() => {
        alert('恭喜你完成了拼图')
      }}
    >
    </SliderPuzzle>
  )
}
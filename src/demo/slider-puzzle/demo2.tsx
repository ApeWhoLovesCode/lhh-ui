import React from "react"
import { SliderPuzzle, isMobile } from "lhh-ui"

export default () => {
  const arr = Array.from({length: 15}, (_, i) => ({id: `id-${i}`}))
  return (
    <SliderPuzzle 
      // 数组的长度需要设置
      listLength={arr.length} 
      // 宽高必须设置
      style={{width: '300px', height: '300px'}}
      size={4}
      gap={10}
      puzzleColor='#1677ff'
      onComplete={() => {
        alert('恭喜你完成了拼图')
      }}
    >
      {arr.map((item, index) => (
        <SliderPuzzle.Item key={item.id} index={index} style={{background: '#fff'}}>
          <h4>{item.id}</h4>
          <SliderPuzzle.Canvas index={index} />
        </SliderPuzzle.Item>
      ))}
    </SliderPuzzle>
  )
}
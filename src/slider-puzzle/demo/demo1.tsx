import React from "react"
import SliderPuzzle from ".."

export default () => {
  const arr = Array.from({length: 8}, (_, i) => ({id: `id-${i}`}))
  return (
    <SliderPuzzle 
      // 数组的长度需要设置
      listLength={arr.length} 
      // 宽高必须设置
      style={{width: '300px', height: '300px'}}
      onComplete={() => {
        alert('恭喜你完成了拼图')
      }}
    >
      {arr.map((item, index) => (
        <SliderPuzzle.Item key={item.id} index={index}>
          <h4 style={{color: '#fff'}}>{item.id}</h4>
          <SliderPuzzle.Canvas index={index} />
        </SliderPuzzle.Item>
      ))}
    </SliderPuzzle>
  )
}
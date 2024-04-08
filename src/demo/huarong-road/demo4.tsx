import { HuarongRoad, getRandomHexColor, isMobile } from "lhh-ui"
import React from "react"
import './index.scss';

const list: string[] = []
for(let i = 0; i < 10; i++) {
  list.push(getRandomHexColor())
}

export default () => {
  return (
    <div className="demo1-huarongRoadWrap">
      <HuarongRoad 
        width={isMobile() ? 300 : 400} 
        onComplete={() => {
          setTimeout(() => {
            alert(`${list[0]}跑了`)
          }, 400);
        }}
      >
        {list.map((color, index) => (
          <HuarongRoad.Item key={color + index} index={index}>
            <div style={{background: color, width: '100%', height: '100%'}}></div>
          </HuarongRoad.Item>
        ))}
      </HuarongRoad>
    </div>
  )
}
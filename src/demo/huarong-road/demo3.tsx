import { HuarongRoad, isMobile } from "lhh-ui"
import React from "react"
import './index.less';

const list = ['曹操','关羽','马超','黄忠','张飞','赵云','卒','卒','卒','卒']

export default () => {
  return (
    <div className="demo1-huarongRoadWrap">
      <HuarongRoad 
        width={isMobile ? 300 : 400} 
        gap={20}
        onComplete={() => {
          setTimeout(() => {
            alert('曹操跑了')
          }, 400);
        }}
      >
        {list.map((name, index) => (
          <HuarongRoad.Item key={name + index} index={index}>
            <div className='demo1-huarongRoad-item demo1-huarongRoad-item-demo3'>{name}</div>
          </HuarongRoad.Item>
        ))}
      </HuarongRoad>
    </div>
  )
}
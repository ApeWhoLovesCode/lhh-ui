import { HuarongRoad, isMobile } from "lhh-ui"
import React from "react"
import './index.less';

const list = ['曹操','关羽','马超','黄忠','张飞','赵云','卒','卒','卒','卒']

export default () => {
  return (
    <div className="demo1-huarongRoadWrap">
      <HuarongRoad 
        width={isMobile() ? 300 : 400} 
        locationArr={[
          [31, 21, 21, 32],
          [22, 1, 1, 23],
          [22, 1, 1, 23],
          [33, 24, 24, 34],
          [0, 25, 25, 0],
        ]}
        onComplete={() => {
          setTimeout(() => {
            alert('曹操跑了')
          }, 400);
        }}
      >
        {list.map((name, index) => (
          <HuarongRoad.Item key={name + index} index={index}>
            <div className='demo1-huarongRoad-item'>{name}</div>
          </HuarongRoad.Item>
        ))}
      </HuarongRoad>
    </div>
  )
}
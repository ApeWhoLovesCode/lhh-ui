import { HuarongRoad } from "lhh-ui"
import React from "react"
import './index.less';

const list = ['曹操','张飞','赵云','马超','关羽','黄忠','卒','卒','卒','卒']

export default () => {
  return (
    <HuarongRoad 
      width={400} 
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
  )
}
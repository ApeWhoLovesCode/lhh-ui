import { HuarongRoad, HuarongRoadInstance, isMobile } from "lhh-ui"
import React, { useRef } from "react"
import './index.scss';

const list = ['曹操','张飞','赵云','马超','关羽','黄忠','卒','卒','卒','卒']

export default () => {
  const huarongRoadRef = useRef<HuarongRoadInstance>(null)

  return (
    <>
      <div className="demo1-huarongRoadWrap">
        <HuarongRoad 
          ref={huarongRoadRef}
          width={isMobile() ? 300 : 400} 
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
      <div style={{marginTop: 20}}>
        <button onClick={() => {huarongRoadRef.current?.reset()}}>重新开始</button>
      </div>
    </>
  )
}
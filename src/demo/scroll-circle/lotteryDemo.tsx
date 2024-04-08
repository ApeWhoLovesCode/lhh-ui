import React, { useEffect, useRef, useState } from 'react';
import { ScrollCircle, ScrollCircleInstance, shuffleArray } from 'lhh-ui';
import './lotteryDemo.scss';

type Item = {
  level: number
  text: string
  color: string
}

export default () => {
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)
  const [list, setList] = useState<Item[]>([]);
  const [selectIndex, setSelectIndex] = useState(0);

  const init = () => {
    const arr: Item[] = [
      {text: '特等奖', color: 'orange', level: 0}, 
      {text: '一等奖', color: 'yellow', level: 1}, 
      {text: '一等奖', color: 'yellow', level: 1}
    ]
    for(let i = 3; i < 10; i++) {
      const res = (Math.random() * 10) > 6 ? {
        level: 2,
        text: '二等奖',
        color: 'greenyellow',
      } : {
        level: 3,
        text: '三等奖',
        color: 'green',
      }
      arr.push(res)
    }
    shuffleArray(arr)
    setList(arr)
  }

  const onScrollCicle = () => {
    const itemDeg = 360 / list.length
    const index = Math.floor(Math.random() * 10)
    const deg = index * itemDeg + 360 * 4;
    scrollCircleRef.current?.scrollTo({
      deg: deg,
      duration: 4000,
      onEnd() {
        setSelectIndex(index)
        scrollCircleRef.current?.scrollTo({deg: deg % 360, duration: 0})
      },
    })
  }

  useEffect(() => {
    init()
  }, [])

  const triangleStyle = {
    borderWidth: `${90}px ${30}px`
  }

  return (
    <>
      <div className='lotteryDemo' style={{width: 360, height: 360}}>
        <ScrollCircle
          ref={scrollCircleRef}
          listLength={list.length}
          isPagination={false}
          centerPoint='center'
          cardAddDeg={0}
          radius={140}
          disableTouch
          style={{
            borderRadius: '50%'
          }}
        >
          {list?.map((item, i) => (
            <ScrollCircle.Item
              key={i}
              index={i}
            >
              {/* <div className={`item item-${item.level}`} style={{background: item.color}}> */}
              <div className={`item item-${item.level}`}>
                <div className="triangle triangle-left" style={{
                  ...triangleStyle,
                  borderColor: `${item.color} ${item.color} transparent transparent`,
                }}></div>
                <div className="triangle-center" style={{background: item.color}}></div>
                <div className="triangle triangle-right" style={{
                  ...triangleStyle,
                  borderColor: `${item.color} transparent transparent ${item.color}`,
                }}></div>
                <div className='text'>{item.text}</div>
              </div>
            </ScrollCircle.Item>
          ))}
        </ScrollCircle>
        <div className="pointer">↑</div>
      </div>
      <div>
        <h5>当前选中的奖项是：{list[selectIndex]?.text}</h5>
        <button onClick={() => onScrollCicle()}>抽奖</button>
      </div>
    </>
  );
};

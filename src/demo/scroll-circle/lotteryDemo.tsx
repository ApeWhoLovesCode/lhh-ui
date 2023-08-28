import React, { useEffect, useRef, useState } from 'react';
import { ScrollCircle, ScrollCircleInstance, shuffleArray } from 'lhh-ui';
import './index.less';

type Item = {
  level: number
  text: string
  color: string
}

export default () => {
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)
  const [list, setList] = useState<Item[]>([]);

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
    const deg = 360 * (Math.floor(Math.random() * 50) / 10)
    scrollCircleRef.current?.scrollTo({
      deg: deg,
      duration: 5000
    })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className='lotteryDemo' style={{width: 360, height: 360}}>
        {/* <div className='item' style={{background: ''}}>
          <div className='text'>{'一等奖'}</div>
        </div> */}
        <ScrollCircle
          ref={scrollCircleRef}
          listLength={list.length}
          isPagination={false}
          centerPoint='center'
          cardAddDeg={0}
          radius={120}
          // disableTouch
        >
          {list?.map((item, i) => (
            <ScrollCircle.Item
              key={i}
              index={i}
            >
              {/* <div className={`item item-${item.level}`} style={{background: item.color}}> */}
              <div className={`item item-${item.level}`}>
                <div className="triangle triangle-left"></div>
                <div className="triangle triangle-right"></div>
                <div className='text'>{item.text}</div>
              </div>
            </ScrollCircle.Item>
          ))}
        </ScrollCircle>
        <div className="pointer">↑</div>
      </div>
      <div>
        <h4>当前奖励是:</h4>
        <button onClick={() => onScrollCicle()}>抽奖</button>
      </div>
    </>
  );
};

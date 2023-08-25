import React, { useEffect, useRef, useState } from 'react';
import { ScrollCircle, ScrollCircleInstance } from 'lhh-ui';
import './index.less';

export default () => {
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)
  const [list, setList] = useState<string[]>([]);

  const init = () => {
    const arr: string[] = ['特等奖', '一等奖', '一等奖']
    for(let i = 3; i < 10; i++) {
      let res = Math.random() * 4 > 4 ? '二等奖' : '三等奖'
      arr.push(res)
    }
    setList(arr)
  }

  const onScrollCicle = () => {
    const deg = 360 * (Math.floor(Math.random() * 50) / 10)
    console.log(deg);
    
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
      <div className='lotteryDemo' style={{width: 400, height: 400}}>
        <ScrollCircle
          ref={scrollCircleRef}
          listLength={list.length}
          isPagination={false}
          centerPoint='center'
          disableTouch
        >
          {list?.map((item, i) => (
            <ScrollCircle.Item
              key={i}
              index={i}
            >
              <div className='item'>
                <h4>{item}</h4>
              </div>
            </ScrollCircle.Item>
          ))}
        </ScrollCircle>
      </div>
      <div>
        <h4>当前奖励是:</h4>
        <button onClick={() => onScrollCicle()}>抽奖</button>
      </div>
    </>
  );
};

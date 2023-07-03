import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ScrollCircle, ScrollCircleInstance, isMobile } from 'lhh-ui';
import './index.less';

const list = Array.from({length: isMobile ? 10 : 16}, (_, i) => ({ _id: 'id' + i, title: i }))
export default () => {
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)
  const scrollCircleListRef = useRef<(ScrollCircleInstance | null)[]>([])

  const onScrollCircle = () => {
    scrollCircleRef.current?.scrollTo({index: Math.floor(Math.random() * list.length), duration: 1.5})
    scrollCircleListRef.current.forEach((ref, index) => {
      ref?.scrollTo({index: Math.floor(Math.random() * list.length), duration: 3})
    })
  }

  return (
    <>
      <div style={{width: isMobile ? 300 : 600, height: 400, border: '1px solid #ccc'}}>
        <ScrollCircle
          ref={scrollCircleRef}
          listLength={list.length}
          isPagination={false}
          initCartNum={2}
        >
          {list?.map((item, i) => (
            <ScrollCircle.Item
              key={item._id}
              index={i}
            >
              <div className='circleItem'>
                <CircleItem ref={ref => scrollCircleListRef.current[i] = ref} item={item} />
              </div>
            </ScrollCircle.Item>
          ))}
        </ScrollCircle>
      </div>
      <button onClick={() => {onScrollCircle()}}>开始旋转</button>
    </>
  );
};

const CircleItem = forwardRef<ScrollCircleInstance, any>(({item}, ref) => {
  const list = Array.from({length: 12}, (_, i) => ({ _id: 'id' + i, title: i }))
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)
  const [curIndex, setCurIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    scrollTo: (e) => {
      scrollCircleRef.current?.scrollTo(e)
    }
  }))

  return (
    <div className='com-circle-item'>
      <ScrollCircle
        ref={scrollCircleRef}
        listLength={list.length}
        isPagination={false}
        initCartNum={0}
        centerPoint='center'
        circleSize='inside'
        onScrollEnd={(index) => {
          setCurIndex(index)
        }}
      >
        {list?.map((item, i) => (
          <ScrollCircle.Item
            key={item._id}
            index={i}
          >
            <div className={`item ${curIndex === i ? 'item-active' : ''}`}>
              <div>{item.title}</div>
            </div>
          </ScrollCircle.Item>
        ))}
      </ScrollCircle>
      <div className="centerItem">{item.title}</div>
    </div>
  )
})
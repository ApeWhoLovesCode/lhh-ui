import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ScrollCircle, ScrollCircleInstance, isMobile } from 'lhh-ui';
import './demo6.less';
import { useUpdateEffect } from 'ahooks';

const list = Array.from({length: isMobile ? 10 : 16}, (_, i) => ({ id: 'id' + i, title: i + '' }))
export default () => {
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)
  const scrollCircleListRef = useRef<(CircleItemInstance | null)[]>([])
  const [curIndex, setCurIndex] = useState(0);
  const [curIndex2, setCurIndex2] = useState(0);
  const isGo = useRef(false)

  const onScrollCircle = () => {
    scrollCircleRef.current?.scrollTo({index: Math.floor(Math.random() * list.length), duration: 1500})
    scrollCircleListRef.current.forEach((ref, index) => {
      ref?.scrollTo({index: Math.floor(Math.random() * list.length), duration: 3000})
    })
  }

  const setIndexs = (index: number) => {
    setCurIndex(index)
    if(isGo.current) {
      setTimeout(() => {
        setCurIndex2(scrollCircleListRef.current[index]!.getIndex())
      }, 1600);
    } else {
      setCurIndex2(scrollCircleListRef.current[index]!.getIndex())
    }
  }

  return (
    <>
      <div style={{width: isMobile ? 300 : 650, height: 500, border: '1px solid #ccc'}}>
        <ScrollCircle
          ref={scrollCircleRef}
          listLength={list.length}
          isPagination={false}
          initCartNum={2}
          onScrollEnd={(index) => {
            setIndexs(index)
          }}
        >
          {list?.map((item, i) => (
            <ScrollCircle.Item
              key={item.id}
              index={i}
            >
              <div className={`circleItem ${curIndex === i ? 'circleItem-active' : ''}`}>
                <CircleItem 
                  ref={ref => scrollCircleListRef.current[i] = ref} 
                  title={item.title} 
                  isSelect={curIndex === i}
                  setCurIndex2={setCurIndex2}
                />
              </div>
            </ScrollCircle.Item>
          ))}
        </ScrollCircle>
      </div>
      <h4>当前选中的索引是：<b>{curIndex}</b> 和 <b>{curIndex2}</b></h4>
      <button onClick={() => {onScrollCircle()}}>开始旋转</button>
    </>
  );
};

type CircleItemInstance = ScrollCircleInstance & {getIndex: () => number}
type CircleItemProps = {
  title: string
  isSelect: boolean
  setCurIndex2: (i: number) => void
}
const CircleItem = forwardRef<CircleItemInstance, CircleItemProps>((
  {title, isSelect, setCurIndex2}, ref
) => {
  const list = Array.from({length: 12}, (_, i) => ({ id: 'id' + i, title: i }))
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)
  const [curIndex, setCurIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    scrollTo: (e) => {
      scrollCircleRef.current?.scrollTo(e)
    },
    getIndex: () => curIndex
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
          if(isSelect) {
            setCurIndex2(index)
          }
        }}
      >
        {list?.map((item, i) => (
          <ScrollCircle.Item
            key={item.id}
            index={i}
          >
            <div className={`item ${curIndex === i ? 'item-active' : ''}`}>
              <div>{item.title}</div>
            </div>
          </ScrollCircle.Item>
        ))}
      </ScrollCircle>
      <div className="centerItem">{title}</div>
    </div>
  )
})
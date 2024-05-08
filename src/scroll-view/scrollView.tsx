import React, { useEffect, useRef, useState } from 'react';
import { ScrollViewProps } from './type';

const classPrefix = `lhhui-scroll-view`;

const ScrollView = ({
  height, children, style, lowerThreshold = 30, onScrollToLower, className
}: ScrollViewProps) => {
  const scrollViewRef = useRef<HTMLDivElement>(null)
  const [divInfo, setDivInfo] = useState({
    top: 0,
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const init = () => {
    const rect = scrollViewRef.current?.getBoundingClientRect()
    if(rect) {
      setDivInfo({top: rect.top})
    }
  }

  useEffect(() => {
    if(!height) {
      init()
    }
  }, [height])

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if(timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    const {scrollTop, clientHeight, scrollHeight} = e.currentTarget
    timerRef.current = setTimeout(({scrollTop, clientHeight, scrollHeight}) => {
      if(clientHeight + scrollTop + lowerThreshold >= scrollHeight) {
        onScrollToLower?.()
      }
    }, 100, {scrollTop, clientHeight, scrollHeight});
  }

  return (
    <div 
      ref={scrollViewRef}
      onScroll={onScroll}
      className={`${classPrefix} ${className ?? ''}`} 
      style={{
        height: height ?? `calc(100vh - ${divInfo.top}px)`,
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default ScrollView
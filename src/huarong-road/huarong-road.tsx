import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import './index.less';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { HeroesIndex, HuarongRoadInstance, HuarongRoadProps } from './type';
import { HuarongRoadCtx } from './context';
import { useDebounceFn, useSetState } from 'ahooks';
import { isMobile, randomStr } from '../utils';

const classPrefix = `lhhui-huarongRoad`;

const defaultProps = {
  locationArr: [
    [2, 1, 1, 2],
    [2, 1, 1, 2],
    [2, 2, 2, 2],
    [2, 3, 3, 2],
    [3, 0, 0, 3],
  ] as HeroesIndex[][],
  gap: 2,
  fillItemBackground: '#3e3e3e',
}
type RequireType = keyof typeof defaultProps

const HuarongRoad = forwardRef<HuarongRoadInstance, HuarongRoadProps>((comProps, ref) => {
  const props = useMergeProps<HuarongRoadProps, RequireType>(comProps, defaultProps)
  const { heroes, locationArr, gap, isCustom, background, fillItemBackground, width, children, ...ret } = props
  const idRef = useRef(randomStr(classPrefix));
  const [state, setState] = useSetState({
    height: 100,
    /** 每一个格子的大小 */
    gridSize: 50,
  })

  const {run: getCardInfo} = useDebounceFn(() => {
    const cardWrap = document.querySelector(`.${idRef.current} .${classPrefix}-area`)
    const width = cardWrap?.clientWidth ?? 0
    const height = width * 1.25
    setState({height, gridSize: width / 4})
  }, {wait: 100});

  const initData = () => {
    
  }

  const init = () => {
    getCardInfo()
  }

  useEffect(() => {
    init()
    if(!isMobile) window.addEventListener('resize', getCardInfo)
    return () => {
      if(!isMobile) window.removeEventListener('resize', getCardInfo)
    }
  }, [gap])

  const reset = () => {
    
  }

  useImperativeHandle(ref, () => ({
    reset
  }))

  const renderChildren = () => {
    // const fillArr = []
    return children
  }
  
  return (
    <HuarongRoadCtx.Provider
      value={{
        gap,
      }}
    >
      {(withNativeProps(ret,
      <div 
        className={`${classPrefix} ${idRef.current}`} 
        style={{
          padding: gap + 'px', 
          background,
          width,
        }}
      >
        <div className={`${classPrefix}-area`} style={{height: state.height + 'px',}}>
          {renderChildren()}
        </div>
      </div>
      ))}
    </HuarongRoadCtx.Provider>
  )
  
})

export default HuarongRoad
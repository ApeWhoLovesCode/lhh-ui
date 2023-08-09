import React, { useState, useEffect, useMemo, useContext } from 'react';
import './index.less';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { HuarongRoadItemProps } from './type';
import { useTouchEvent } from '../hooks';
import { HuarongRoadCtx } from './context';
import { useSetState } from 'ahooks';
import { getPositionItem } from './utils';

const classPrefix = `lhhui-huarongRoadItem`;

const defaultProps = {
  
}
type RequireType = keyof typeof defaultProps

const HuarongRoadItem = (comProps: HuarongRoadItemProps) => {
  const props = useMergeProps<HuarongRoadItemProps, RequireType>(comProps, defaultProps)
  const { index, children, ...ret } = props
  const { gap, gridSize, locationArr } = useContext(HuarongRoadCtx)

  const [info, setInfo] = useSetState({
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    duration: 0,
    /** 当前处于的行列数 */
    rowNum: 0,
    colNum: 0,
  })

  const {info: _info, onTouchFn} = useTouchEvent({
    onTouchStart() {

    },
    onTouchMove() {

    },
    onTouchEnd() {

    }
  })

  const cardStyle = useMemo(() => {
    const {row, col, width, height} = getPositionItem({gridSize, index, locationArr, gap})
    const handlegap = (v: number) => 0 < v ? v * gap : 0
    return {
      width,
      height,
      top: gridSize * row + handlegap(row),
      left: gridSize * col + handlegap(col)
    }
  }, [gridSize, index, locationArr, gap, getPositionItem])
  
  return withNativeProps(
    ret,
    <div 
      className={classPrefix}
      style={{
        ...cardStyle,
        transitionDuration: info.duration + 's',
        transform: `translate(${info.x}px, ${info.y}px)`,
      }}
      {...onTouchFn} 
    >
      {children}
    </div>
  )
}

export default HuarongRoadItem
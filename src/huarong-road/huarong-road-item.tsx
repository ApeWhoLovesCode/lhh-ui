import React, { useState, useEffect, useMemo, useContext } from 'react';
import './index.less';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { HuarongRoadItemProps } from './type';
import { useTouchEvent } from '../hooks';
import { HuarongRoadCtx } from './context';
import { useSetState } from 'ahooks';
import { checkRoadDirection, getPositionItem, getRowColItem } from './utils';
import { checkDirectionXY, range } from '../utils';

const classPrefix = `lhhui-huarongRoadItem`;

const defaultProps = {
  
}
type RequireType = keyof typeof defaultProps

const HuarongRoadItem = (comProps: HuarongRoadItemProps) => {
  const props = useMergeProps<HuarongRoadItemProps, RequireType>(comProps, defaultProps)
  const { index, children, ...ret } = props
  const { gap, gridSize, gridArr, isReset, onChangeGrid } = useContext(HuarongRoadCtx)

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

  useEffect(() => {
    const {row, col} = getRowColItem(gridArr, index)
    setInfo({ rowNum: row, colNum: col, x: 0, y: 0 })
  }, [index, gridArr, isReset])

  /** 当前可移动的方向 */
  const moveDirection = useMemo(() => (
    checkRoadDirection(gridArr, info.rowNum, info.colNum)
  ), [gridArr, info.rowNum, info.colNum])

  const {info: _info, onTouchFn} = useTouchEvent({
    onTouchStart() {
      setInfo({startX: info.x, startY: info.y, duration: 0})
    },
    onTouchMove() {
      const {directionX, directionY} = checkDirectionXY(_info.deltaX, _info.deltaY)
      console.log('moveDirection: ', moveDirection);
      if(!moveDirection) return
      if(moveDirection.includes(directionX)) {
        setInfo({x: range(_info.deltaX, -gridSize - gap, gridSize + gap) + info.startX})
      } else if(moveDirection.includes(directionY)) {
        setInfo({y: range(_info.deltaY, -gridSize - gap, gridSize + gap) + info.startY})
      }
    },
    onTouchEnd() {
      let isVertical = false
      let diff = info.x - info.startX
      if(!diff) {
        diff = info.y - info.startY
        isVertical = true
      }
      // 检测当前方向上的移动
      if(!diff) return
      const xy = diff > 0 ? 1 : -1
      let x = info.startX
      let y = info.startY
      let direction = 0
      let {rowNum, colNum} = info
      // 发生改变
      if(Math.abs(diff) >= gridSize / 2) {
        if(isVertical) {
          y += (gridSize + gap) * xy
          direction = diff > 0 ? 4 : 2
        } else {
          x += (gridSize + gap) * xy
          direction = diff > 0 ? 3 : 1
        }
        switch (direction) {
          case 1: colNum--; break;
          case 2: rowNum--; break;
          case 3: colNum++; break;
          case 4: rowNum++; break;
        }
        onChangeGrid(
          {row: rowNum, col: colNum},
          {row: info.rowNum, col: info.colNum}
        )
      }
      setInfo({x, y, duration: 0.4, rowNum, colNum})
    },
    isDisable: {
      all: !moveDirection
    },
    isStopPropagation: true
  })

  const cardStyle = useMemo(() => {
    const {row, col, width, height} = getPositionItem({gridSize, index, gridArr, gap})
    const handlegap = (v: number) => 0 < v ? v * gap : 0
    return {
      width,
      height,
      top: gridSize * row + handlegap(row),
      left: gridSize * col + handlegap(col)
    }
  }, [gridSize, index, gridArr, gap, getPositionItem])
  
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
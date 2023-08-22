import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import './index.less';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { HeroesIndex, HuarongRoadInstance, HuarongRoadProps } from './type';
import { HuarongRoadCtx, onChangeGridParams } from './context';
import { useDebounceFn, useSetState } from 'ahooks';
import { isMobile, randomStr } from '../utils';
import { checkToWin } from './utils';

const classPrefix = `lhhui-huarongRoad`;

const defaultProps = {
  locationArr: [
    // [0, 1, 1, 0],
    // [0, 1, 1, 0],
    // [0, 0, 0, 0],
    // [0, 0, 0, 0],
    // [0, 0, 0, 0],
    [21, 1, 1, 22],
    [21, 1, 1, 22],
    [23, 24, 24, 25],
    [23, 31, 32, 25],
    [33, 0, 0, 34],
  ] as HeroesIndex[][],
  gap: 2,
  fillItemBackground: '#3e3e3e',
}
type RequireType = keyof typeof defaultProps

const HuarongRoad = forwardRef<HuarongRoadInstance, HuarongRoadProps>((comProps, ref) => {
  const props = useMergeProps<HuarongRoadProps, RequireType>(comProps, defaultProps)
  const { heroes, locationArr, gap, isCustom, background, fillItemBackground, width, onComplete, children, ...ret } = props
  const idRef = useRef(randomStr(classPrefix));
  const [state, setState] = useSetState({
    height: 100,
    /** 每一个格子的大小 */
    gridSize: 50,
    /** 英雄的索引对应的是横的还是竖的, true 表示是竖的，false 表示是横的 */
    heroesIndexs: new Array(5) as boolean[]
  })
  const [gridArr, setGridArr] = useState<HeroesIndex[][]>(locationArr);
  const [isReset, setIsReset] = useState(false);

  const {run: getCardInfo} = useDebounceFn(() => {
    const cardWrap = document.querySelector(`.${idRef.current} .${classPrefix}-area`)
    const width = cardWrap?.clientWidth ?? 0
    const height = width * 1.25
    setState({height, gridSize: (width - gap * 3) / 4})
  }, {wait: 100});

  const initData = () => {
    const heroesIndexs = locationArr.reduce((pre, arr) => {
      arr.forEach((v, i2) => {
        if(pre[v - 21] === void 0 && 20 < v && v < 30) { // 英雄
          pre[v - 21] = arr[i2 + 1] !== v
        }
      })
      return pre
    }, new Array(5) as boolean[])
    setState({heroesIndexs})
  }

  const init = () => {
    getCardInfo()
    initData()
  }

  useEffect(() => {
    init()
    if(!isMobile) window.addEventListener('resize', getCardInfo)
    return () => {
      if(!isMobile) window.removeEventListener('resize', getCardInfo)
    }
  }, [gap])

  const onChangeGrid = ({p, target, direction, index, isVertical, xy}: onChangeGridParams) => {
    function exChangeVal(row: number, col: number, row2: number, col2: number) {
      [gridArr[row][col], gridArr[row2][col2]] = [gridArr[row2][col2], gridArr[row][col]];
    }
    // 遍历交换值
    function onExChangeVal(arr: number[][]) {
      arr.forEach(v => {
        exChangeVal(p.row + v[0], p.col + v[1], target.row + v[0], target.col + v[1])
      })
    }
    if(index < 1) { // boss
      const arr = [
        [0, 0],
        isVertical ? [0, 1] : [1, 0],
      ];
      const arrMethod = xy > 0 ? 'unshift' : 'push';
      arr[arrMethod]([1, 1])
      arr[arrMethod](isVertical ? [1, 0] : [0, 1])
      onExChangeVal(arr)
    } else if(index <= 5) { // 五虎将
      const arr = [[0, 0]];
      const arrMethod = xy > 0 ? 'unshift' : 'push';
      arr[arrMethod](state.heroesIndexs[index - 1] ? [1, 0] : [0, 1])
      onExChangeVal(arr)
    } else { // 小兵
      exChangeVal(p.row, p.col, target.row, target.col)
    }
    if(checkToWin(gridArr)) {
      onComplete?.()
    }
    setGridArr([...gridArr])
  }

  const reset = () => {
    setIsReset(v => !v)
  }

  useImperativeHandle(ref, () => ({
    reset
  }))

  const renderChildren = () => {
    const fillNum = 10 - Object.values(children?.valueOf() ?? {}).length
    if(!fillNum) return children
    return children
  }
  
  return (
    <HuarongRoadCtx.Provider
      value={{
        gap,
        gridSize: state.gridSize,
        locationArr,
        gridArr,
        isReset,
        onChangeGrid,
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
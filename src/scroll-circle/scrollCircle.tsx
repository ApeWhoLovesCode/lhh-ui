import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { calcAngle, getCircleTransformXy, getRotateDegAbs, roundingAngle } from './utils';
import { randomStr } from '../utils/random';
import { classBem, isMobile } from '../utils/handleDom';
import useTouchEvent from '../hooks/useTouchEvent';
import { ScrollCirclePageType, ScrollCircleInstance, ScrollCircleProps } from './type';
import { ScrollCircleCtx } from './context';
import { withNativeProps } from '../utils';

const classPrefix = 'lhhui-scroll-circle';

export const ScrollCircle = forwardRef<ScrollCircleInstance, ScrollCircleProps>(({
  listLength = 0,
  cardAddDeg = 1,
  width = '100%',
  height = '100%',
  centerPoint = 'auto',
  circlePadding = 5,
  initCartNum = 0,
  isAverage = true,
  isFlipDirection = false,
  isPagination = true,
  leftArrow,
  rightArrow,
  children,
  disableTouch = false,
  radius,
  onPageChange,
  ...props
}, ref) => {
  const idRef = useRef(randomStr(classPrefix));
  /** 整个滚动盒子的区域 */
  const circleDiv = useRef({
    w: 0,
    h: 0,
    left: 0,
    top: 0,
  });
  /** 圆心的位置 */
  const circleCenter = useRef({
    x: 0,
    y: 0,
  })
  /** 滚动盒子需要的信息 */
  const [info, setInfo] = useState({
    /** 圆的半径 */
    circleR: 0,
    /** 卡片间的度数 */
    cardDeg: 0
  });
  /** 触摸信息 */
  const touchInfo = useRef({
    /** 记录开始时刻的滚动度数 */
    startDeg: 0,
    /** 记录之前滚动的旋转度数 */
    preDeg: 0,
    /** 当前是否是点击 */
    isClick: false,
    /** 前一圈的角度 */
    preRoundDeg: 0
  });
  /** 旋转的度数 */
  const [rotateDeg, setRotateDeg] = useState<number>(-1);
  /** 当前的方向是否是竖着的 */
  const isVertical = useRef((document.querySelector(`.${idRef.current}`)?.clientHeight ?? 0) > (document.querySelector(`.${idRef.current}`)?.clientWidth ?? 0));
  const [pageState, setPageState] = useState({
    /** 当前的页码 */
    pageNum: 1,
    /** 每页条数 */
    pageSize: 10,
  });
  const [duration, setDuration] = useState(600);

  const init = async (isInit = true) => {
    const circleWrap = document.querySelector(`.${idRef.current}`)
    const cInfo = document.querySelector(`.${idRef.current} .${classPrefix}-cardWrap`)
    const cw = circleWrap?.clientWidth ?? 0;
    const ch = circleWrap?.clientHeight ?? 0;
    isVertical.current = ch > cw;
    const cardWH = cInfo?.[isVertical.current ? 'clientHeight' : 'clientWidth'] ?? 0;
    const cWH = cInfo?.[isVertical.current ? 'clientWidth' : 'clientHeight'] ?? 0;
    info.circleR = Math.round(
      centerPoint === 'center' ? (
        radius ?? Math.min(ch, cw) / 2 - circlePadding - cWH / 2
      ) : (
        radius ?? Math.max(ch, cw)
      )
    );
    // 每张卡片所占用的角度
    const _cardDeg = (2 * 180 * Math.atan(cardWH / 2 / (info.circleR - cWH / 2))) / Math.PI + cardAddDeg;
    let { pageNum, pageSize } = pageState;
    // 是否采用均分卡片的方式
    if (isAverage && listLength) {
      const cardNum = Math.floor(360 / _cardDeg);
      const _cardNum = Math.min(cardNum, listLength); // 判断总卡片数是否超过一个圆
      pageSize = _cardNum;
      setPageState((p) => ({ ...p, pageSize }));
      info.cardDeg = 360 / _cardNum;
    } else {
      info.cardDeg = _cardDeg;
    }
    setInfo({...info})
    onPageChange?.({ pageNum, pageSize });
    if(isInit) {
      scrollTo({index: initCartNum})
    }
  };

  const resizeFn = () => {
    init(false)
  }

  useEffect(() => {
    if (listLength) {
      init()
    }
    if (!isMobile) window.addEventListener('resize', resizeFn);
    return () => {
      if (!isMobile) window.removeEventListener('resize', resizeFn);
    };
  }, [listLength, cardAddDeg, centerPoint, radius, circlePadding, initCartNum, isAverage, isFlipDirection]);

  /** 获取整个大圆的信息 */
  const getCircleDivInfo = () => {
    const circleWrap = document.querySelector(`.${idRef.current} .${classPrefix}-area`)!
    circleDiv.current.w = circleWrap.clientWidth
    circleDiv.current.h = circleWrap.clientHeight
    const circleDivRect = circleWrap.getBoundingClientRect()
    circleDiv.current.left = circleDivRect.left
    circleDiv.current.top = circleDivRect.top
    circleCenter.current.x = circleDivRect.left + circleDivRect.width / 2
    circleCenter.current.y = circleDivRect.top + circleDivRect.height / 2
    touchInfo.current.startDeg = calcAngle(
      {x: tInfo.clientX, y: tInfo.clientY},
      {x: circleCenter.current.x, y: circleCenter.current.y},
    )
  }

  const { info: tInfo, onTouchFn } = useTouchEvent({
    onTouchStart() {
      props.onTouchStart?.();
      getCircleDivInfo()
      setDuration(10);
      touchInfo.current.preDeg = rotateDeg
    },
    onTouchMove() {
      let deg = calcAngle(
        {x: tInfo.clientX, y: tInfo.clientY},
        {x: circleCenter.current.x, y: circleCenter.current.y},
      ) - touchInfo.current.startDeg;
      // 越过一圈的边界位置，需要翻转角度，只会在边界的时候触发一次； 
      // 250(不用360): 是为了解决该区域下滚动过快，导致两次move的触发相差很大，无法满足条件
      if(Math.abs(deg - touchInfo.current.preRoundDeg) > 250) { 
        const roundVal = deg > 0 ? -360 : 360
        deg += roundVal
        touchInfo.current.startDeg -= roundVal
      }
      touchInfo.current.preRoundDeg = deg;
      deg += touchInfo.current.preDeg
      setRotateDeg(deg);
      props.onTouchMove?.();
    },
    onTouchEnd() {
      let _duration = 600;
      let deg = rotateDeg;
      const changeDeg = deg - touchInfo.current.preDeg
      // 触摸的角度大于10度，并且触摸时间小于250ms，则触摸距离和时间旋转更多
      if (Math.abs(changeDeg) > 10 && tInfo.time < 250) {
        // const IncreaseVal = Math.sqrt(tInfo.time) / Math.sqrt(300); // 增加角度变化
        const IncreaseVal = tInfo.time / 250; // 增加角度变化
        _duration = 1000;
        deg = touchInfo.current.preDeg + Math.round((changeDeg) / IncreaseVal);
      }
      const _deg = roundingAngle({changeDeg, deg, cardDeg: info.cardDeg})
      // 触摸小于1度且触摸时间小于120ms才算点击
      touchInfo.current.isClick = Math.abs(changeDeg) < 1 && tInfo.time < 120;
      setDuration(_duration);
      setRotateDeg(_deg);
      props.onTouchEnd?.();
      _onScrollEnd(_deg, _duration)
    },
    isStopPropagation: true,
    isDisable: {
      all: disableTouch
    }
  });

  const _onScrollEnd = (deg: number, _duration: number) => {
    if(props.onScrollEnd) {
      setTimeout(() => {
        const absV = getRotateDegAbs(centerPoint, isVertical.current, isFlipDirection)
        let index = Math.floor(deg / info.cardDeg) % listLength * absV
        if(index < 0) {
          index += listLength 
        }
        props.onScrollEnd?.(index, deg)
      }, _duration ?? duration);
    }
  }

  const disableRight = pageState.pageNum * pageState.pageSize >= (listLength);
  const disableLeft = pageState.pageNum <= 1;

  const onPageChangeFn = (isAdd?: boolean) => {
    if (isAdd) {
      if (disableRight) return;
    } else {
      if (disableLeft) return;
    }
    pageState.pageNum += isAdd ? 1 : -1;
    setPageState({...pageState})
    setRotateDeg(0);
    onPageChange?.({ ...pageState });
  };

  const circleStyle = useMemo(() => {
    const {x, y} = getCircleTransformXy(centerPoint, isVertical.current, info.circleR)
    return {
      width: `${info.circleR * 2}px`,
      height: `${info.circleR * 2}px`,
      transitionDuration: duration + 'ms',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotateDeg}deg)`,
    };
  }, [rotateDeg, duration, info, centerPoint]);

  const scrollTo = ({deg, index, duration: _duration}: {deg?: number, index?: number, duration?: number}) => {
    if(typeof index === 'number' || typeof deg === 'number') {
      const _deg = typeof index === 'number' ? info.cardDeg * index : deg!
      const absV = getRotateDegAbs(centerPoint, isVertical.current, isFlipDirection)
      setRotateDeg(_deg * absV);
      if(typeof _duration === 'number') {
        setDuration(_duration)
      }
      _onScrollEnd(_deg * absV, _duration ?? duration)
    }
  }

  const _onPageChange = (page: Partial<ScrollCirclePageType>) => {
    if(!isPagination || (!page.pageNum && !page.pageSize)) return
    if(page.pageNum) {
      pageState.pageNum = page.pageNum
    } 
    if(page.pageSize) {
      pageState.pageSize = page.pageSize
    }
    setPageState({...pageState})
    setRotateDeg(0);
  }

  useImperativeHandle(ref, () => ({
    scrollTo,
    onPageChange: _onPageChange
  }))

  return (
    <ScrollCircleCtx.Provider
      value={{
        circleR: info.circleR,
        cardDeg: info.cardDeg,
        isVertical: isVertical.current,
        isFlipDirection,
        isClick: touchInfo.current.isClick,
        centerPoint,
      }}
    >
      {withNativeProps(props, (
        <div
          className={`${classPrefix} ${idRef.current}`}
          style={{
            width: width,
            height: height,
          }}
          {...onTouchFn}
        >
          <div className={`${classPrefix}-area`} style={circleStyle}>
            {children}
          </div>
          <div
            className={`${classBem(`${classPrefix}-arrow`, { left: true, disable: disableLeft })}`}
            onClick={() => onPageChangeFn()}
          >
            {isPagination ? (
              leftArrow ?? (
                <div className={`${classBem(`${classPrefix}-arrow-area`, { left: true })}`}>
                  {'<'}
                </div>
              )
            ) : null}
          </div>
          <div
            className={`${classBem(`${classPrefix}-arrow`, { right: true, disable: disableRight })}`}
            onClick={() => onPageChangeFn(true)}
          >
            {isPagination ? (
              rightArrow ?? (
                <div className={`${classBem(`${classPrefix}-arrow-area`, { right: true })}`}>
                  {'>'}
                </div>
              )
            ) : null}
          </div>
        </div>
      ))}
    </ScrollCircleCtx.Provider>
  );
});

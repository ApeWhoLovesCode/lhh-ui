import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { calcAngle, getCircleTransformXy, getLineAngle, getRotateDegAbs } from './utils';
import { randomStr } from '../utils/random';
import { classBem, isMobile } from '../utils/handleDom';
import useTouchEvent from '../hooks/useTouchEvent';
import { ScrollCircleInstance, ScrollCircleProps } from './type';
import { ScrollCircleCtx } from './context';
import { withNativeProps } from '../utils';

const classPrefix = 'lhhui-scroll-circle';

export const ScrollCircle = forwardRef<ScrollCircleInstance, ScrollCircleProps>(({
  listLength = 0,
  cardAddDeg = 1,
  width = '100%',
  height = '100%',
  centerPoint = 'auto',
  circleSize = 'outside',
  circlePadding = 5,
  initCartNum = 0,
  isAverage = true,
  isFlipDirection = false,
  isPagination = true,
  leftArrow,
  rightArrow,
  children,
  disableTouch = false,
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
    /** 滚动盒子的宽/高 */
    circleWrapWH: 0,
    /** 卡片宽/高 */
    cardWH: 0,
    /** 圆的半径 */
    circleR: 0,
    /** 可滚动区域高度对应的圆的角度 */
    scrollViewDeg: 0,
  });
  /** 触摸信息 */
  const touchInfo = useRef({
    /** 记录开始时刻的滚动度数 */
    startDeg: 0,
    /** 记录之前滚动的旋转度数 */
    preDeg: 0,
    /** 当前是否是点击 */
    isClick: false,
  });
  /** 卡片间的度数 */
  const cardDeg = useRef(0);
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
    info.circleWrapWH = isVertical.current ? cw : ch
    info.cardWH = cInfo?.[isVertical.current ? 'clientHeight' : 'clientWidth'] ?? 0;
    const cWH = cInfo?.[isVertical.current ? 'clientWidth' : 'clientHeight'] ?? 0;
    info.circleR = Math.round(
      centerPoint === 'center' && circleSize === 'inside' ? (Math.min(ch, cw) / 2 - circlePadding - cWH / 2) : Math.max(ch, cw)
    );
    // 屏幕宽高度对应的圆的角度
    info.scrollViewDeg = centerPoint !== 'center' ? (
      getLineAngle(info.circleWrapWH, info.circleR)
    ) : 90;
    // 每张卡片所占用的角度
    const _cardDeg = (2 * 180 * Math.atan((info.cardWH ?? 0) / 2 / (info.circleR - cWH / 2))) / Math.PI + cardAddDeg;
    setInfo({...info})
    let { pageNum, pageSize } = pageState;
    // 是否采用均分卡片的方式
    if (isAverage && listLength) {
      const cardNum = Math.floor(360 / _cardDeg);
      // 判断总卡片数是否超过一个圆
      const _cardNum = Math.min(cardNum, listLength);
      pageSize = _cardNum;
      setPageState((p) => ({ ...p, pageSize }));
      cardDeg.current = 360 / _cardNum;
    } else {
      cardDeg.current = _cardDeg;
    }
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
      setTimeout(() => {
        init()
      }, 0);
    }
    if (!isMobile) window.addEventListener('resize', resizeFn);
    return () => {
      if (!isMobile) window.removeEventListener('resize', resizeFn);
    };
  }, [listLength, cardAddDeg, centerPoint, circleSize, circlePadding, initCartNum, isAverage, isFlipDirection]);

  const getXy = () => {
    let xy = 0
    if(centerPoint === 'auto') {
      xy = isVertical.current ? tInfo.deltaY : -tInfo.deltaX
    } else if(centerPoint === 'center') {
      const {left, top, w, h} = circleDiv.current
      const vy = left < tInfo.startX && tInfo.startX < left + w / 2 ? 1 : -1
      const vx = top < tInfo.startY && tInfo.startY < top + h / 2 ? 1 : -1
      xy = tInfo.offsetY > tInfo.offsetX ? vy * tInfo.deltaY : vx * -tInfo.deltaX
    } else if(centerPoint === 'left') {
      xy = -tInfo.deltaY
    } else if(centerPoint === 'top') {
      xy = tInfo.deltaX
    } else if(centerPoint === 'right') {
      xy = tInfo.deltaY
    } else if(centerPoint === 'bottom') {
      xy = -tInfo.deltaX
    } 
    return xy
  }

  const { info: tInfo, onTouchFn } = useTouchEvent({
    onTouchStart() {
      setDuration(10);
      touchInfo.current.preDeg = rotateDeg;
      props.onTouchStart?.();
      const circleWrap = document.querySelector(`.${idRef.current} .${classPrefix}-area`)!
      circleDiv.current.w = circleWrap.clientWidth
      circleDiv.current.h = circleWrap.clientHeight
      const circleDivRect = circleWrap.getBoundingClientRect()
      circleDiv.current.left = circleDivRect.left
      circleDiv.current.top = circleDivRect.top
      circleCenter.current.x = circleDivRect.left + circleDivRect.width / 2
      circleCenter.current.y = circleDivRect.top + circleDivRect.height / 2
      const deg = calcAngle(
        {x: tInfo.clientX, y: tInfo.clientY},
        {x: circleCenter.current.x, y: circleCenter.current.y},
      )
      touchInfo.current.startDeg = deg;
    },
    onTouchMove() {
      const deg = calcAngle(
        {x: tInfo.clientX, y: tInfo.clientY},
        {x: circleCenter.current.x, y: circleCenter.current.y},
      ) - touchInfo.current.startDeg + touchInfo.current.preDeg
      // 旋转了一圈，需要归位
      if(Math.abs(deg - rotateDeg) > 300) {
        setDuration(0)
      } else {
        setDuration(10)
      }
      setRotateDeg(deg);
      props.onTouchMove?.();
    },
    onTouchEnd() {
      // 移动的距离
      const xy = getXy();
      let _duration = 600;
      let deg = rotateDeg;
      // 触摸的始末距离大于卡片高度的一半，并且触摸时间小于300ms，则触摸距离和时间旋转更多
      // if (Math.abs(xy) > info.cardWH / 2 && tInfo.time < 300) {
      if (Math.abs(xy) > info.cardWH / 2 && tInfo.time < 300) {
        // 增加角度变化
        const IncreaseVal = Math.sqrt(tInfo.time) / Math.sqrt(300);
        // const changeDeg = (info.scrollViewDeg * (xy / info.circleWrapWH)) / v;
        _duration = 1000;
        // let changeDeg = rotateDeg + touchInfo.current.startDeg - touchInfo.current.preDeg
        // deg = touchInfo.current.preDeg + Math.round((changeDeg) / IncreaseVal);
        deg = Math.round((rotateDeg) / IncreaseVal);
      }
      // 处理转动的角度为：卡片的角度的倍数 (xy > 0 表示向上滑动)
      let mathMethods: 'ceil' | 'floor' = 'ceil';
      if (Math.abs(xy) < info.cardWH / 3) {
        mathMethods = xy > 0 ? 'ceil' : 'floor';
      } else {
        mathMethods = xy > 0 ? 'floor' : 'ceil';
      }
      const _deg = cardDeg.current * Math[mathMethods](deg / cardDeg.current);
      // 触摸距离小于10，并且触摸时间小于120ms才算点击
      touchInfo.current.isClick = Math.abs(xy) < 10 && tInfo.time < 120;
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
        let index = Math.floor(deg / cardDeg.current) % listLength * absV
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
  }, [rotateDeg, duration, info, centerPoint, circleSize]);

  const scrollTo = ({deg, index, duration: _duration}: {deg?: number, index?: number, duration?: number}) => {
    if(typeof index === 'number' || typeof deg === 'number') {
      const _deg = typeof index === 'number' ? cardDeg.current * index : deg!
      const absV = getRotateDegAbs(centerPoint, isVertical.current, isFlipDirection)
      setRotateDeg(_deg * absV);
      if(typeof _duration === 'number') {
        setDuration(_duration)
      }
      _onScrollEnd(_deg * absV, _duration ?? duration)
    }
  }

  useImperativeHandle(ref, () => ({
    scrollTo
  }))

  return (
    <ScrollCircleCtx.Provider
      value={{
        circleR: info.circleR,
        cardDeg: cardDeg.current,
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

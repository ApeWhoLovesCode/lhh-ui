import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getLineAngle } from './utils';
import { randomStr } from '../utils/random';
import { classBem, isMobile } from '../utils/handleDom';
import useTouchEvent from '../hooks/useTouchEvent';
import { CircleInfoType, CircleTouchType, ScrollCircleProps } from './type';
import { ScrollCircleCtx } from './context';

const classPrefix = 'lhhui-scroll-circle';

export const ScrollCircle: React.FC<ScrollCircleProps> = ({
  list,
  cardAddDeg = 1,
  width = '100%',
  height = '100%',
  centerPoint = 'auto',
  circleSize = 'outside',
  circlePadding = 5,
  initCartNum = 0,
  isAverage = true,
  isFlipDirection = true,
  isPagination = true,
  leftArrow,
  rightArrow,
  children,
  onPageChange,
  ...props
}) => {
  const idRef = useRef(randomStr(classPrefix));
  /** 整个滚动盒子的区域 */
  const circleDiv = useRef({
    w: 0,
    h: 0,
    left: 0,
    top: 0,
  });
  /** 滚动盒子需要的信息 */
  const info = useRef<CircleInfoType>({
    circleWrapWH: 0,
    cardWH: 0,
    circleR: 0,
    scrollViewDeg: 0,
  });
  /** 触摸信息 */
  const touchInfo = useRef<CircleTouchType>({
    startDeg: 0,
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
  const [duration, setDuration] = useState(0.6);

  const init = async (isInit = true) => {
    const circleWrap = document.querySelector(`.${idRef.current}`)
    const cInfo = document.querySelector(`.${idRef.current} .${classPrefix}-cardWrap`)
    const cw = circleWrap?.clientWidth ?? 0;
    const ch = circleWrap?.clientHeight ?? 0;
    isVertical.current = ch > cw;
    info.current.circleWrapWH = isVertical.current ? cw : ch
    info.current.cardWH = cInfo?.[isVertical.current ? 'clientHeight' : 'clientWidth'] ?? 0;
    const cWH = cInfo?.[isVertical.current ? 'clientWidth' : 'clientHeight'] ?? 0;
    info.current.circleR = Math.round(
      centerPoint === 'center' && circleSize === 'inside' ? (Math.min(ch, cw) / 2 - circlePadding - cWH / 2) : Math.max(ch, cw)
    );
    // 屏幕宽高度对应的圆的角度
    info.current.scrollViewDeg = centerPoint !== 'center' ? (
      getLineAngle(info.current.circleWrapWH, info.current.circleR)
    ) : 90;
    // 每张卡片所占用的角度
    const _cardDeg = (2 * 180 * Math.atan((info.current.cardWH ?? 0) / 2 / (info.current.circleR - cWH / 2))) / Math.PI + cardAddDeg;
    let { pageNum, pageSize } = pageState;
    if(centerPoint === 'center') {
      circleDiv.current.w = cw
      circleDiv.current.h = ch
      const circleDivRect = circleWrap?.getBoundingClientRect()
      circleDiv.current.left = circleDivRect?.left ?? 0
      circleDiv.current.top = circleDivRect?.top ?? 0
    }
    // 是否采用均分卡片的方式
    if (isAverage && list) {
      const cardNum = Math.floor(360 / _cardDeg);
      // 判断总卡片数是否超过一个圆
      const _cardNum = Math.min(cardNum, list.length);
      pageSize = _cardNum;
      setPageState((p) => ({ ...p, pageSize }));
      cardDeg.current = 360 / _cardNum;
    } else {
      cardDeg.current = _cardDeg;
    }
    onPageChange?.({ pageNum, pageSize });
    if(isInit) {
      setRotateDeg(cardDeg.current * initCartNum * (isVertical.current ? 1 : -1));
    }
  };

  const resizeFn = () => {
    init(false)
  }

  useEffect(() => {
    if (isMobile) window.addEventListener('resize', resizeFn);
    return () => {
      if (isMobile) window.removeEventListener('resize', resizeFn);
    };
  }, []);

  useEffect(() => {
    if (list?.length) {
      setTimeout(() => {
        init()
      }, 0);
    }
  }, [list, cardAddDeg, centerPoint, circleSize, circlePadding, initCartNum, isAverage]);

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
    onTouchStart(e) {
      touchInfo.current.startDeg = rotateDeg;
      setDuration(0.1);
      props.onTouchStart?.();
      if(centerPoint === 'center') {
        const circleWrap = document.querySelector(`.${idRef.current}`)
        circleDiv.current.w = circleWrap?.clientWidth ?? 0
        circleDiv.current.h = circleWrap?.clientHeight ?? 0
        const circleDivRect = circleWrap?.getBoundingClientRect()
        circleDiv.current.left = circleDivRect?.left ?? 0
        circleDiv.current.top = circleDivRect?.top ?? 0
      }
    },
    onTouchMove() {
      const xy = getXy()
      const deg = Math.round(
        touchInfo.current.startDeg - info.current.scrollViewDeg * (xy / info.current.circleWrapWH),
      );
      setRotateDeg(deg);
      props.onTouchMove?.();
    },
    onTouchEnd() {
      const { startDeg } = touchInfo.current;
      // 移动的距离
      const xy = getXy();
      let _duration = 0.6;
      let deg = rotateDeg;
      // 触摸的始末距离大于卡片高度的一半，并且触摸时间小于300ms，则触摸距离和时间旋转更多
      if (Math.abs(xy) > info.current.cardWH / 2 && tInfo.time < 300) {
        // 增加角度变化
        const v = tInfo.time / 300;
        const changeDeg = (info.current.scrollViewDeg * (xy / info.current.circleWrapWH)) / v;
        _duration = 1;
        deg = Math.round(startDeg - changeDeg);
      }
      // 处理转动的角度为：卡片的角度的倍数 (xy > 0 表示向上滑动)
      let mathMethods: 'ceil' | 'floor' = 'ceil';
      if (Math.abs(xy) < info.current.cardWH / 3) {
        mathMethods = xy > 0 ? 'ceil' : 'floor';
      } else {
        mathMethods = xy > 0 ? 'floor' : 'ceil';
      }
      // 触摸距离小于10，并且触摸时间小于120ms才算点击
      touchInfo.current.isClick = Math.abs(xy) < 10 && tInfo.time < 120;
      setDuration(_duration);
      const _deg = cardDeg.current * Math[mathMethods](deg / cardDeg.current);
      setRotateDeg(_deg);
      props.onTouchEnd?.();
    },
  });

  const disableRight = pageState.pageNum * pageState.pageSize >= (list?.length ?? 0);
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
    let x = 0, y = 0;
    if(centerPoint === 'auto') {
      if (isVertical.current) {
        x = info.current.circleR;
      } else {
        y = info.current.circleR;
      }
    } else if(centerPoint === 'left') {
      x = -info.current.circleR
    } else if(centerPoint === 'top') {
      y = -info.current.circleR
    } else if(centerPoint === 'right') {
      x = info.current.circleR
    } else if(centerPoint === 'bottom') {
      y = info.current.circleR
    }
    return {
      width: `${info.current.circleR * 2}px`,
      height: `${info.current.circleR * 2}px`,
      transitionDuration: duration + 's',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotateDeg}deg)`,
    };
  }, [rotateDeg, duration, centerPoint, circleSize]);

  return (
    <ScrollCircleCtx.Provider
      value={{
        circleR: info.current.circleR,
        cardDeg: cardDeg.current,
        isVertical: isVertical.current,
        isFlipDirection,
        isClick: touchInfo.current.isClick,
        centerPoint,
      }}
    >
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
    </ScrollCircleCtx.Provider>
  );
};

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getLineAngle } from './utils';
import { randomStr } from '../utils/random';
import { classBem, isMobile } from '../utils/handleDom';
import useTouchEvent from '../hooks/use-touch-event';
import { CircleInfoType, CircleTouchType, ScrollCircleProps } from './type';
import { ScrollCircleCtx } from './context';

const classPrefix = 'lhhui-scroll-circle';

export const ScrollCircle: React.FC<ScrollCircleProps> = ({
  list,
  cardAddDeg = 1,
  width = '100%',
  height = '100%',
  initCartNum = 0,
  isAverage = true,
  isClockwise = true,
  isPagination = true,
  leftArrow,
  rightArrow,
  children,
  onPageChange,
  ...props
}) => {
  const idRef = useRef(randomStr(classPrefix));
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
  const circleDiv = useRef({
    w: 0,
    h: 0,
  });

  const init = async (isInit = true) => {
    const circleWrap = document.querySelector(`.${idRef.current}`)
    const cInfo = document.querySelector(`.${idRef.current} .${classPrefix}-cardWrap`)
    circleDiv.current.w = circleWrap?.clientWidth ?? 0;
    circleDiv.current.h = circleWrap?.clientHeight ?? 0;
    isVertical.current = circleDiv.current.h > circleDiv.current.w;
    info.current.circleWrapWH = isVertical.current ? circleDiv.current.w : circleDiv.current.h
    info.current.cardWH = cInfo?.[isVertical.current ? 'clientHeight' : 'clientWidth'] ?? 0;
    const cWH = cInfo?.[isVertical.current ? 'clientWidth' : 'clientHeight'] ?? 0;
    info.current.circleR = Math.round(isVertical.current ? circleDiv.current.h : circleDiv.current.w);
    // 屏幕宽高度对应的圆的角度
    info.current.scrollViewDeg = getLineAngle(info.current.circleWrapWH, info.current.circleR);
    // 每张卡片所占用的角度
    const _cardDeg =
      (2 * 180 * Math.atan((info.current.cardWH ?? 0) / 2 / (info.current.circleR - cWH / 2))) /
        Math.PI +
      cardAddDeg;
    let { pageNum, pageSize } = pageState;
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
  }, [list, cardAddDeg]);

  const { info: tInfo, onTouchFn } = useTouchEvent({
    onTouchStart() {
      touchInfo.current.startDeg = rotateDeg;
      setDuration(0.1);
      props.onTouchStart?.();
    },
    onTouchMove() {
      const xy = isVertical.current ? tInfo.deltaY : -tInfo.deltaX;
      const deg = Math.round(
        touchInfo.current.startDeg - info.current.scrollViewDeg * (xy / info.current.circleWrapWH),
      );
      setRotateDeg(deg);
      props.onTouchMove?.();
    },
    onTouchEnd() {
      const { startDeg } = touchInfo.current;
      // 移动的距离
      const xy = isVertical.current ? tInfo.deltaY : -tInfo.deltaX;
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
    let w = 0,
      h = info.current.circleR;
    if (isVertical.current) {
      w = info.current.circleR;
      h = 0;
    }
    return {
      width: `${info.current.circleR * 2}px`,
      height: `${info.current.circleR * 2}px`,
      transitionDuration: duration + 's',
      transform: `translate(calc(-50% + ${w}px), calc(-50% + ${h}px)) rotate(${rotateDeg}deg)`,
    };
  }, [rotateDeg, duration]);

  return (
    <ScrollCircleCtx.Provider
      value={{
        circleR: info.current.circleR,
        cardDeg: cardDeg.current,
        isVertical: isVertical.current,
        isClockwise,
        isClick: touchInfo.current.isClick,
      }}
    >
      <div
        className={`${classPrefix} ${idRef.current}`}
        style={{
          width: width,
          height: height,
        }}
      >
        <div className={`${classPrefix}-area`} style={circleStyle} {...onTouchFn}>
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

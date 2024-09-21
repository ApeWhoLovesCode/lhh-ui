import React, { useEffect, useMemo, useContext, useRef } from "react";
import { withNativeProps } from "../utils/native-props";
import useMergeProps from "../hooks/useMergeProps";
import { HuarongRoadItemProps } from "./type";
import { useTouchEvent } from "../hooks";
import { HuarongRoadCtx } from "./context";
import { useSetState } from "ahooks";
import { checkRoadDirection, getPositionItem, getRowColItem } from "./utils";
import { Direction, checkDirectionXY, classBem, range } from "../utils";

const classPrefix = `lhhui-huarongRoadItem`;

const defaultProps = {
  touchTime: 150,
  touchDistance: 8,
  isHover: true,
};
type RequireType = keyof typeof defaultProps;

const HuarongRoadItem = (comProps: HuarongRoadItemProps) => {
  const props = useMergeProps<HuarongRoadItemProps, RequireType>(
    comProps,
    defaultProps
  );
  const {
    index,
    touchTime,
    touchDistance,
    isHover,
    onClick,
    children,
    ...ret
  } = props;
  const { gap, gridSize, gridArr, locationArr, isReset, onChangeGrid } =
    useContext(HuarongRoadCtx);

  const [info, setInfo] = useSetState({
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    duration: 0,
    /** 当前处于的行列数 */
    rowNum: 0,
    colNum: 0,
  });
  const isVerticalRef = useRef<boolean>();

  useEffect(() => {
    const { row, col } = getRowColItem(locationArr, index);
    setInfo({ rowNum: row, colNum: col, x: 0, y: 0 });
  }, [index, locationArr, isReset]);

  /** 当前可移动的方向 */
  const moveDirection = useMemo(
    () => checkRoadDirection(gridArr, info.rowNum, info.colNum),
    [gridArr, info.rowNum, info.colNum]
  );

  const { info: _info, onTouchFn } = useTouchEvent({
    onTouchStart() {
      isVerticalRef.current = void 0;
      setInfo({ startX: info.x, startY: info.y, duration: 0 });
    },
    onTouchMove() {
      const { directionX, directionY } = checkDirectionXY(
        _info.deltaX,
        _info.deltaY
      );
      if (!moveDirection) return;
      if (
        moveDirection[directionX as Direction] &&
        isVerticalRef.current !== true
      ) {
        if (isVerticalRef.current === void 0) {
          isVerticalRef.current = false;
        }
        const rangeVal =
          (gridSize + gap) * moveDirection[directionX as Direction];
        setInfo({ x: range(_info.deltaX, -rangeVal, rangeVal) + info.startX });
      } else if (
        moveDirection[directionY as Direction] &&
        isVerticalRef.current !== false
      ) {
        if (isVerticalRef.current === void 0) {
          isVerticalRef.current = true;
        }
        const rangeVal =
          (gridSize + gap) * moveDirection[directionY as Direction];
        setInfo({ y: range(_info.deltaY, -rangeVal, rangeVal) + info.startY });
      }
    },
    onTouchEnd() {
      let isVertical = false;
      let diff = info.x - info.startX;
      if (!diff) {
        diff = info.y - info.startY;
        isVertical = true;
      }
      // 检测当前方向上的移动
      if (!diff) return;
      let { startX: x, startY: y, rowNum, colNum } = info;
      const size = gridSize + gap;
      // 发生改变
      if (Math.abs(diff) >= size / 2) {
        const moveTwoSize = Math.abs(diff) >= size * 1.5 ? 2 : 1;
        const xy = (diff > 0 ? 1 : -1) * moveTwoSize;
        let direction: Direction = 1;
        if (isVertical) {
          y += size * xy;
          direction = diff > 0 ? 3 : 1;
        } else {
          x += size * xy;
          direction = diff > 0 ? 2 : 4;
        }
        switch (direction) {
          case 1:
            rowNum -= moveTwoSize;
            break;
          case 2:
            colNum += moveTwoSize;
            break;
          case 3:
            rowNum += moveTwoSize;
            break;
          case 4:
            colNum -= moveTwoSize;
            break;
        }
        onChangeGrid({
          p: { row: info.rowNum, col: info.colNum },
          target: { row: rowNum, col: colNum },
          index,
          direction,
        });
      }
      setInfo({ x, y, duration: 0.4, rowNum, colNum });
    },
    isDisable: {
      all: !moveDirection,
    },
    isStopPropagation: true,
  });

  const cardStyle = useMemo(() => {
    const { row, col, width, height } = getPositionItem({
      gridSize,
      index,
      locationArr,
      gap,
    });
    const handleGap = (v: number) => (0 < v ? v * gap : 0);
    return {
      width,
      height,
      top: gridSize * row + handleGap(row),
      left: gridSize * col + handleGap(col),
    };
  }, [gridSize, index, locationArr, gap, getPositionItem]);

  return withNativeProps(
    ret,
    <div
      className={`${classBem(classPrefix, {
        hover: isHover,
        disableTouch: !moveDirection,
      })}`}
      style={{
        ...cardStyle,
        transitionDuration: info.duration + "s",
        transform: `translate(${info.x}px, ${info.y}px)`,
      }}
      {...onTouchFn}
      onClick={() => {
        if (
          _info.time < touchTime &&
          _info.deltaY < touchDistance &&
          _info.offsetX < touchDistance
        ) {
          onClick?.(index);
        }
      }}
    >
      {children}
    </div>
  );
};

export default HuarongRoadItem;

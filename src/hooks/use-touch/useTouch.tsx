import { useRef } from 'react';
import { MouseTouchE, TouchEventType } from '../../utils/handleDom';
const MIN_DISTANCE = 10;

export type TouchDirection = '' | 'vertical' | 'horizontal';
export type TouchState = {
  /** x的起始的位置 */
  startX: number;
  /** y的起始的位置 */
  startY: number;
  /** x的偏移量 */
  deltaX: number;
  /** y的偏移量 */
  deltaY: number;
  /** x的位移 正数 */
  offsetX: number;
  /** y的位移 正数 */
  offsetY: number;
  /** 当前移动的方向 */
  direction: TouchDirection;
  /** 触摸开始到结束的时间 */
  time: number;
};

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}
const useTouch = () => {
  const state = useRef<TouchState>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    direction: '',
    time: 0,
  });
  /** 触摸开始时间 */
  const startTime = useRef(0);

  const setState = (options: Partial<TouchState>) => {
    Object.keys(options).forEach((_key) => {
      const key = _key as keyof TouchState 
      state.current[key] = options[key] as never;
    });
  };

  const reset = () => {
    setState({
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: '',
    });
  };

  const changeEvent = (event: TouchEventType | MouseTouchE) => {
    // changedTouches 是 touchEnd 的值
    return (
      (event as TouchEventType)?.touches?.[0] ??
      (event as TouchEventType)?.changedTouches?.[0] ??
      (event as MouseTouchE)
    );
  };

  const start = (event: TouchEventType | MouseTouchE) => {
    reset();
    const touch = changeEvent(event);
    setState({
      startX: touch.clientX,
      startY: touch.clientY,
    });
    startTime.current = Date.now();
  };

  const move = (event: TouchEventType | MouseTouchE) => {
    const touch = changeEvent(event);
    // Fix: Safari back will set clientX to negative number
    const { startX, startY, direction } = state.current;
    const deltaX = touch.clientX < 0 ? 0 : touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const offsetX = Math.abs(deltaX);
    const offsetY = Math.abs(deltaY);
    const time = Date.now() - startTime.current;

    setState({
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      time,
      direction: !direction ? getDirection(offsetX, offsetY) : '',
    });
  };

  return {
    info: state.current,
    move,
    start,
    reset,
  };
};

export default useTouch;

import { isMobile, MouseTouchEvent } from '../../utils/handleDom';
import useTouch from '../useTouch';
import useLatest from '../useLatest';
import { IsTouchEvent, UseTouchesOptions, UseTouchEventParams } from './type';

/** 绑定手指触摸或鼠标事件 */
export default function useTouchEvent(options: UseTouchEventParams = {}) {
  const touch = useTouch();
  const optionsRef = useLatest(options);

  const onStopEvent = (e: MouseTouchEvent) => {
    if (options.isStopEvent || options.isStopPropagation) {
      e.stopPropagation();
    }
    if (options.isStopEvent || options.isPreventDefault) {
      e.preventDefault();
    }
  };

  const onTouchStart = (e: MouseTouchEvent) => {
    /** 鼠标左击才触发 */
    if(!isMobile && !options.isAllMouseClick && (e as MouseEvent).button !== 0) {
      return
    }
    if(options.isDisable?.all || options.isDisable?.onTouchStart) return
    onStopEvent(e);
    touch.start(e);
    if (!isMobile) {
      document.addEventListener('mousemove', onTouchMove, true);
      document.addEventListener('mouseup', onTouchEnd, true);
    }
    optionsRef.current.onTouchStart?.(e);
  };
  const onTouchMove = (e: MouseTouchEvent) => {
    if(options.isDisable?.all || options.isDisable?.onTouchMove) return
    onStopEvent(e);
    touch.move(e);
    optionsRef.current.onTouchMove?.(e, touch.info);
  };
  const onTouchEnd = (e: MouseTouchEvent) => {
    if(options.isDisable?.all || options.isDisable?.onTouchEnd) return
    onStopEvent(e);
    touch.move(e);
    if (!isMobile) {
      document.removeEventListener('mousemove', onTouchMove, true);
      document.removeEventListener('mouseup', onTouchEnd, true);
    }
    optionsRef.current.onTouchEnd?.(e);
  };

  return {
    ...touch,
    onTouchFn: onTouchMouse({
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      isOnMouseUp: options.isOnMouseUp,
      isOnTouchCancel: options.isOnTouchCancel,
    }),
  };
}

/** 处理鼠标或手指触摸事件 */
export const onTouchMouse = ({
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  isOnMouseUp,
  isOnTouchCancel,
}: UseTouchesOptions & IsTouchEvent) => {
  if (!isMobile) {
    return {
      onMouseDown: onTouchStart,
      ...(isOnMouseUp ? { onMouseUp: onTouchEnd } : null),
    };
  } else {
    return {
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd,
      ...(isOnTouchCancel ? { onTouchCancel: onTouchEnd } : null),
    };
  }
};

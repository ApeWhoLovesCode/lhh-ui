import { isMobile, MouseTouchEvent } from '../../utils/handleDom';
import useTouch, { TouchState } from '../use-touch';
import useLatest from '../use-latest';

export type UseTouchesOptions = {
  onTouchStart?: (e: MouseTouchEvent) => void;
  onTouchMove?: (e: MouseTouchEvent, touchState?: TouchState) => void;
  onTouchEnd?: (e: MouseTouchEvent) => void;
};

export type UseTouchesParams = {
  /** 是否鼠标所有事件（左键右键中键）都触发 */
  isAllMouseClick?: boolean
  /** 都阻止 */
  isStopEvent?: boolean;
  /** 是否阻止事件冒泡 */
  isStopPropagation?: boolean;
  /** 是否阻止事件默认行为 */
  isPreventDefault?: boolean;
  /** 是否禁用事件 */
  isDisable?: {
    /** 禁用所有事件 */
    all?: boolean
    onTouchStart?: boolean
    onTouchMove?: boolean
    onTouchEnd?: boolean
  }
} & IsTouchEvent;
type IsTouchEvent = {
  /** 是否需要监听 onMouseUp 注意：会导致 onTouchEnd 触发两次 */
  isOnMouseUp?: boolean;
  /** 是否需要监听 OnTouchCancel 注意：会导致 onTouchEnd 触发两次 */
  isOnTouchCancel?: boolean;
};
export type UseTouchEventParams = UseTouchesOptions & UseTouchesParams;

/** 绑定手指触摸或鼠标事件 */
export default function useTouchEvent(options: UseTouchEventParams = {}) {
  const touch = useTouch();
  const optionsRef = useLatest(options);

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
  const onStopEvent = (e: MouseTouchEvent) => {
    if (options.isStopEvent || options.isStopPropagation) {
      e.stopPropagation();
    }
    if (options.isStopEvent || options.isPreventDefault) {
      e.preventDefault();
    }
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

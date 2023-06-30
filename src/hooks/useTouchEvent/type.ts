import { TouchState } from '../useTouch';

/** 鼠标事件 */
// export type MouseEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;
// export type TouchEventType = React.TouchEvent<HTMLDivElement>
export type MouseEventType = React.MouseEvent<HTMLDivElement> | MouseEvent;
export type TouchEventType = React.TouchEvent<HTMLDivElement>;
/** 鼠标或手指事件 */
export type MouseTouchEvent = MouseEventType | TouchEventType;

export type UseTouchesOptions = {
  /** 点击触摸开始 */
  onTouchStart?: (e: MouseTouchEvent) => void;
  /** 触摸移动 */
  onTouchMove?: (e: MouseTouchEvent, touchState?: TouchState) => void;
  /** 触摸结束 */
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
export type IsTouchEvent = {
  /** 是否需要监听 onMouseUp 注意：会导致 onTouchEnd 触发两次 */
  isOnMouseUp?: boolean;
  /** 是否需要监听 OnTouchCancel 注意：会导致 onTouchEnd 触发两次 */
  isOnTouchCancel?: boolean;
};
export type UseTouchEventParams = UseTouchesOptions & UseTouchesParams;
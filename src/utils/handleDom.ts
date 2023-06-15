import type { MouseEvent } from 'react';
import classNames from 'classnames';

/** 处理style的px */
export const handleStylePx = (v: number | string) => {
  return typeof v === 'number' ? v + 'px' : v;
};

/** 处理类名与需要判断的类名 */
export const classBem = (classnames: string, obj?: { [key in string]?: boolean }) => {
  let str = classnames;
  if (obj) {
    Object.keys(obj).forEach((key) => {
      str += ' ' + (obj[key] ? classnames + '-' + key : '');
    });
  }
  return str;
};

/** 处理style的需要判断的类名 */
export const classBemStyle = (
  classname: string,
  styles: any,
  obj?: { [key in string]?: boolean },
) => {
  const arr: string[] = [styles[classname]];
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        arr.push(styles[classname + '-' + key]);
      }
    });
  }
  return classNames(arr);
};

/** 处理并合并类名 */
export const classMergeBem = (classnames: string, arr?: string[]) => {
  let str = classnames;
  arr?.forEach((key) => {
    str += ' ' + classnames + '-' + key;
  });
  return str;
};

/** 判断是移动端还是pc端 */
export const isMobile = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
)

/** 鼠标事件 */
// export type MouseEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;
// export type TouchEventType = React.TouchEvent<HTMLDivElement>
export type MouseEventType = MouseEvent | globalThis.MouseEvent;
export type TouchEventType = React.TouchEvent<HTMLDivElement>;
/** 鼠标或手指事件 */
export type MouseTouchEvent = MouseEventType | TouchEventType;
/** 处理鼠标或手指的事件 */
export const handleMouseOfTouch = (e: MouseTouchEvent) => {
  const target = !isMobile
    ? (e as MouseEventType)
    : (e as TouchEventType).touches[0] || (e as TouchEventType).changedTouches[0];
  return {
    pageX: target.pageX,
    pageY: target.pageY,
    clientX: target.clientX,
    clientY: target.clientY,
    screenX: target.screenX,
    screenY: target.screenY,
  };
};
/** 返回的类型 */
export type MouseTouchE = {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
  screenX: number;
  screenY: number;
};

export const changeEvent = (event: MouseEvent | TouchEvent) => {
  // changedTouches 是 touchEnd 的值
  return (
    (event as TouchEvent)?.touches?.[0] ??
    (event as TouchEvent)?.changedTouches?.[0] ??
    (event as MouseEvent)
  );
};
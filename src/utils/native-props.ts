import React from 'react';
import type { CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';

export type NativeProps<S extends string = never> = {
  /** 类名 */
  className?: string;
  /** style样式 */
  style?: CSSProperties & Partial<Record<S, string>>;
  /** children节点 */
  children?: React.ReactNode
}

export function withNativeProps<P extends NativeProps>(props: P, element: ReactElement) {
  const p = {
    ...element.props,
  };
  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }
  return React.cloneElement(element, p);
}
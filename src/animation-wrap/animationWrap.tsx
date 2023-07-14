import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import './index.less';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { AnimationWrapInstance, AnimationWrapName, AnimationWrapPosition, AnimationWrapProps } from './type';
import { classBem, replaceLineToSpace } from '../utils';
import { getTransformCurtaion, handleLinearGradient } from './utils';

const classPrefix = `lhhui-animation-wrap`;

const defaultProps = {
  name: 'curtain' as AnimationWrapName,
  position: 'right' as AnimationWrapPosition,
  duration: 4000,
  background: '#fff',
  isInitTrigger: true,
}
type RequireType = keyof typeof defaultProps

const AnimationWrap = forwardRef<AnimationWrapInstance, AnimationWrapProps>((comProps, ref) => {
  const props = useMergeProps<AnimationWrapProps, RequireType>(comProps, defaultProps)
  const { name, position, duration: p_duration, background, isInitTrigger, children, ...ret } = props
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(p_duration);

  const init = () => {
    if(isInitTrigger) {
      setDistance(100)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      init()
    }, 100);
  }, [isInitTrigger])

  const run = () => {
    setDistance(0)
    setDuration(0)
    setTimeout(() => {
      setDistance(100)
      setDuration(p_duration)
    }, 100);
  }

  useImperativeHandle(ref, () => ({
    run
  }))

  const renderAnimation = () => {
    if(name === 'curtain') {
      return (
        <div 
          className={classBem(`${classPrefix}-curtaion`, {[position]: true})}
          style={{
            transitionDuration: `${duration}ms`,
            transform: getTransformCurtaion({distance, position}),
            background: `linear-gradient(to ${replaceLineToSpace(position)}, ${
              `${handleLinearGradient(background)} 10%, ${background} 50%, ${background})`
            }`,
          }}
        ></div>
      )
    }
  }

  return withNativeProps(
    ret,
    <div className={classPrefix}>
      {children}
      {renderAnimation()}
    </div>
  )
})

export default AnimationWrap
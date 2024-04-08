import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { withNativeProps } from '../utils/native-props';
import { AnimationWrapInstance, AnimationWrapName, AnimationWrapPosition, AnimationWrapProps } from './type';
import { classBem, replaceLineToSpace } from '../utils';
import { getTransformCurtaion, handleLinearGradient } from './utils';
import { useMergeProps, usePropsState } from '../hooks';

const classPrefix = `lhhui-animation-wrap`;

const defaultProps = {
  name: 'curtain' as AnimationWrapName,
  position: 'right' as AnimationWrapPosition,
  duration: 4000,
  background: '#fff',
  isInitTrigger: true,
  delayTime: 100,
}
type RequireType = keyof typeof defaultProps

const AnimationWrap = forwardRef<AnimationWrapInstance, AnimationWrapProps>((comProps, ref) => {
  const props = useMergeProps<AnimationWrapProps, RequireType>(comProps, defaultProps)
  const { name, position, duration: p_duration, background, isInitTrigger, delayTime, children, ...ret } = props
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = usePropsState(p_duration);
  const delayTimer = useRef<NodeJS.Timeout>()

  const init = () => {
    setDistance(100)
  }

  useEffect(() => {
    if(isInitTrigger) {
      delayTimer.current = setTimeout(() => {
        init()
      }, delayTime);
    }
    return () => {
      if(isInitTrigger) {
        clearTimeout(delayTimer.current)
        delayTimer.current = undefined
      }
    }
  }, [isInitTrigger, delayTime])

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
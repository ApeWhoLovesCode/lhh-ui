import React from 'react';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { SkusProps } from './type'

const classPrefix = `lhhui-skus`;

const defaultProps = {
  
}
type RequireType = keyof typeof defaultProps

const Skus = (comProps: SkusProps) => {
  const props = useMergeProps<SkusProps, RequireType>(comProps, defaultProps)
  const { ...ret } = props
  
  return withNativeProps(
    ret,
    <div className={classPrefix}>
      
    </div>
  )
}

export default Skus
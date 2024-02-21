import React from 'react';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { TreeProps } from './type'

const classPrefix = `lhhui-tree`;

const defaultProps = {
  
}
type RequireType = keyof typeof defaultProps

const Tree = (comProps: TreeProps) => {
  const props = useMergeProps<TreeProps, RequireType>(comProps, defaultProps)
  const { ...ret } = props
  
  return withNativeProps(
    ret,
    <div className={classPrefix}>
      
    </div>
  )
}

export default Tree
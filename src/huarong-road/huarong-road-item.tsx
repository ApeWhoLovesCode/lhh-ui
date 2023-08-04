import React, { useState, useEffect } from 'react';
import './index.less';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { HuarongRoadItemProps } from './type';

const classPrefix = `lhhui-huarong-road-item`;

const defaultProps = {
  
}
type RequireType = keyof typeof defaultProps

const HuarongRoadItem = (comProps: HuarongRoadItemProps) => {
  const props = useMergeProps<HuarongRoadItemProps, RequireType>(comProps, defaultProps)
  const { ...ret } = props
  
  return withNativeProps(
    ret,
    <div className={classPrefix}>
      
    </div>
  )
}

export default HuarongRoadItem
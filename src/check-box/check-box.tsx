import React from 'react';
import { withNativeProps } from '../utils/native-props';
import { CheckBoxProps } from './type'
// import RcCheckbox from 'rc-checkbox';

const classPrefix = `lhhui-check-box`;

const CheckBox = (props: CheckBoxProps) => {
  const { checked, defaultChecked, disabled, onChange, children, ...ret } = props
  
  return withNativeProps(
    ret,
    <div className={classPrefix}>
      <input 
        type={'checkbox'} 
        className={`${classPrefix}-input`}
        checked={checked}
        disabled={disabled}
        onChange={() => {
          onChange?.(!checked)
        }} 
      ></input>
      {children}
    </div>
  )
}

export default CheckBox
import React from 'react';
import { withNativeProps } from '../utils/native-props';
import { CheckBoxProps } from './type'
import { classBem } from '../utils';
// import RcCheckbox from 'rc-checkbox';

const classPrefix = `lhhui-check-box`;

const CheckBox = (props: CheckBoxProps) => {
  const { checked, defaultChecked, disabled, indeterminate, onChange, children, ...ret } = props
  
  return withNativeProps(
    ret,
    <div className={classPrefix}>
      <input 
        type={'checkbox'} 
        className={classBem(`${classPrefix}-input`, {indeterminate: !checked && indeterminate})}
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
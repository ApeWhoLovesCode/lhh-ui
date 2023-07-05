import React from 'react';
import './index.less';
import { useSearchSetState } from 'lhh-ui';

type StateType = {
  name: string
  persons: {
    length: number
  }
  china: {
    guangdong: {
      shenzhen: string
    }
  }
}

export default () => {
  const [state, setState] = useSearchSetState<StateType>(
    ['name', 'persons.length', 'china.guangdong.shenzhen'], 
    {name: 'lhh', persons: {length: 10}, china: {guangdong: {shenzhen: 'baoan'}}}
  )

  return (
    <div className='demo-useSearchSetState'>
      <div>
        <span>输入昵称: (name) </span>
        <input value={state.name} type="text" onChange={(e) => {setState(v => ({...v, name: e.target.value}))}} />
      </div>
      <br />
      <div>
        <span>输入人数: (persons.len) </span>
        <input value={state.persons.length} type="number" onChange={(e) => {setState(v => ({...v, persons: {length: +e.target.value}}))}} />
      </div>
      <br />
      <div>
        <span>深圳地区: (china.guangdong.shenzhen) </span>
        <input value={state.china.guangdong.shenzhen} type="text" onChange={(e) => {
          setState(obj => {
            obj.china.guangdong.shenzhen = e.target.value
            return {...obj}
          })
        }} />
      </div>
    </div>
  )
}
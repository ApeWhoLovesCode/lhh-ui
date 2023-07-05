import { useSearchState } from "lhh-ui";
import React from "react"

export default () => {
  const [num, setNum] = useSearchState<number>('number', 10, {isNotString: true});
  const [arr, setArr] = useSearchState<number[]>('arr', [1,2,3], {isNotString: true});
  const [person, setPerson] = useSearchState<Object>('person', {name: 'lhh'}, {isNotString: true});

  return (
    <div>
      <h2>----- Number -----</h2>
      <h4>typeof: {typeof num}, num: {num}</h4>
      <div>
        <button onClick={() => {setNum(num + 1)}}>num++</button>
      </div>
      <h2>----- Array -----</h2>
      <h4>arr: {JSON.stringify(arr)}</h4>
      <div>
        <button 
          onClick={() => {
            setArr([...arr, Math.floor(Math.random() * 10)])
          }} 
          style={{marginRight: 10}}
        >添加数据</button>
        <button 
          onClick={() => {
            arr.splice(0, 1)
            setArr([...arr])
          }} 
        >减少数据</button>
      </div>
      <h2>----- Object -----</h2>
      <h4>person: {JSON.stringify(person)}</h4>
      <div>
        <button 
          onClick={() => {
            setPerson(p => {
              const key = Math.ceil(Math.random() * 1000).toString(36)
              const value = Math.floor((Math.random() * 1000))
              return {
                ...p,
                [key]: value > 500 ? String(value) : value
              }
            })
          }}
          style={{marginRight: 10}}
        >添加数据</button>
        <button onClick={() => {
          setPerson({})
        }}>清空对象</button>
      </div>
    </div>
  )
}
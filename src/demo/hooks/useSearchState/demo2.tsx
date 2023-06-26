import { useSearchState } from "lhh-ui";
import React from "react"

const pageSizeArr = [5, 10, 20, 30, 50]
export default () => {
  const [pageSize, setPageSize] = useSearchState('pageSize', '10');
  const [pageSize2, setPageSize2] = useSearchState('pageSize2', '10');

  return (
    <div>
      <h4>当前页码1: {pageSize}</h4>
      <h4>当前页码2: {pageSize2}</h4>
      <div>
        <span>设置页码: （❌）</span>
        {pageSizeArr.map(v => (
          <button 
            key={v} 
            onClick={() => {
              setPageSize(v + '')
              // pageSize2的地址栏参数会覆盖pageSize
              setPageSize2(v + '')
            }} 
            style={{marginLeft: 10}}
          >{v}</button>
        ))}
      </div>
    </div>
  )
}
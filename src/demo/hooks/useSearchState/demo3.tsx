import { useSearchParamsFilter } from "lhh-ui";
import React, { useState } from "react"

const pageSizeArr = [5, 10, 20, 30, 50]
export default () => {
  const { setParam, getParam } = useSearchParamsFilter<'pageSize' | 'pageSize2'>();
  const [pageSize, setPageSize] = useState(getParam('pageSize') ?? '10');
  const [pageSize2, setPageSize2] = useState(getParam('pageSize2') ?? '10');

  return (
    <div>
      <h4>当前页码1: {pageSize}</h4>
      <h4>当前页码2: {pageSize2}</h4>
      <div>
        <span>设置页码: （✅）</span>
        {pageSizeArr.map(v => (
          <button 
            key={v} 
            onClick={() => {
              setPageSize(v + '')
              setPageSize2(v + '')
              setParam('pageSize', v)
              setParam('pageSize2', v)
            }} 
            style={{marginLeft: 10}}
          >{v}</button>
        ))}
      </div>
    </div>
  )
}
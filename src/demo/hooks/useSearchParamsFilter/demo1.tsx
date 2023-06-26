import { useSearchParamsFilter } from "lhh-ui";
import React, { useState } from "react"

const pageSizeArr = [5, 10, 20, 30, 50]
export default () => {
  const { setParam, getParam } = useSearchParamsFilter<'pageSize'>();
  const [pageSize, setPageSize] = useState(getParam('pageSize') ?? '0');

  return (
    <div>
      <div>
        <span>设置页码: </span>
        {pageSizeArr.map(v => (
          <button 
            key={v} 
            onClick={() => {
              setPageSize(v + '')
              setParam('pageSize', v)
            }} 
            style={{marginLeft: 10}}
          >{v}</button>
        ))}
      </div>
      <h4>当前页码: {pageSize}</h4>
    </div>
  )
}
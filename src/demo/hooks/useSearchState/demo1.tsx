import { useSearchState } from "lhh-ui";
import React from "react"

const pageSizeArr = [5, 10, 20, 30, 50]
export default () => {
  const [pageSize, setPageSize] = useSearchState('pageSize', '10');
  const [searchVal, setSearchVal] = useSearchState('searchVal');

  return (
    <div>
      <h4>当前页码: {pageSize}</h4>
      <div>
        <span>设置页码: </span>
        {pageSizeArr.map(v => (
          <button key={v} onClick={() => setPageSize(v + '')} style={{marginLeft: 10}}>{v}</button>
        ))}
      </div>
      <div style={{marginTop: 16}}>
        搜索: <input type="text" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
      </div>
    </div>
  )
}
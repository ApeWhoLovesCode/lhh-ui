import { ScrollView } from "lhh-ui"
import React, { useRef, useState } from "react"

export default () => {
  const [list, setList] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null)

  function onScrollToLower() {
    clearTimeout(timer.current)
    setLoading(true);
    timer.current = setTimeout(() => {
      setList(arr => arr.concat(Array.from({length: 10}, (_, i) => arr.length + i + 1)))
      setLoading(false)
    }, 300);
  }

  return (
    <ScrollView 
      onScrollToLower={onScrollToLower} 
      style={{width: 200, height: 300, border: '1px solid #ccc'}}
    >
      {list.map((item) => (
        <h4 key={item}>{item}</h4>
      ))}
      {loading && <div>加载中...</div>}
    </ScrollView>
  )
}
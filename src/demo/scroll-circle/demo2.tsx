import React, { useState, useEffect, useRef } from 'react';
import { ScrollCircle, ScrollCircleInstance, isMobile } from 'lhh-ui';
import { ScrollCirclePageType } from 'lhh-ui/scroll-circle/type';

export default () => {
  const [list, setList] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)

  useEffect(() => {
    setTimeout(() => {
      const newList = new Array(30).fill('Hello').map((v, i) => ({ _id: 'id' + i, title: v + i }));
      const preIndex = (pageNum - 1) * pageSize;
      const newItems = newList.slice(preIndex, preIndex + pageSize);
      setItems(newItems);
      setList(newList);
    }, 50);
  }, []);
  const onPageChange = ({ pageNum, pageSize }: ScrollCirclePageType) => {
    const preIndex = (pageNum - 1) * pageSize;
    const newItems = list.slice(preIndex, preIndex + pageSize);
    // 填充空数据
    const length = newItems.length;
    for (let i = 0; i < pageSize - length; i++) {
      newItems.push({ _id: 'id-i-' + i, title: 'World-' + i });
    }
    setItems(newItems);
    setPageNum(pageNum);
    setPageSize(pageSize);
  };
  const disabledPre = pageNum <= 1
  const disabledNext = pageNum * pageSize >= list.length
  const onReducePage = () => {
    if(disabledPre) return
    scrollCircleRef.current?.onPageChange({pageNum: pageNum - 1})
    onPageChange({pageNum: pageNum - 1, pageSize})
  }
  const onAddPage = () => {
    if(disabledNext) return
    scrollCircleRef.current?.onPageChange({pageNum: pageNum + 1})
    onPageChange({pageNum: pageNum + 1, pageSize})
  }

  return (
    <>
      <div style={{width: isMobile ? 300 : 400, height: 200}}>
        <ScrollCircle
          ref={scrollCircleRef}
          listLength={list.length}
          onPageChange={onPageChange}
        >
          {items?.map((item, i) => (
            <ScrollCircle.Item
              key={item._id}
              index={i}
            >
              <div style={{width: 100, height: 50, border: '2px solid #aaa', userSelect: 'none'}}>
                <h4>{item.title}</h4>
              </div>
            </ScrollCircle.Item>
          ))}
        </ScrollCircle>
      </div>
      <button disabled={disabledPre} onClick={() => {onReducePage()}} style={{margin: 12}}>上一页</button>
      <button disabled={disabledNext} onClick={() => {onAddPage()}}>下一页</button>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { ScrollCircle } from 'lhh-ui';

export default () => {
  const [list, setList] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setTimeout(() => {
      const newList = new Array(30).fill('Hello').map((v, i) => ({ _id: 'id' + i, title: v + i }));
      const preIndex = (pageNum - 1) * pageSize;
      const newItems = newList.slice(preIndex, preIndex + pageSize);
      setItems(newItems);
      setList(newList);
    }, 50);
  }, []);
  const onPageChange = ({ pageNum, pageSize }: { pageNum: number; pageSize: number }) => {
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

  return (
    <div style={{position: 'relative', width: 400, height: 200}}>
      <ScrollCircle
        list={list}
        onPageChange={onPageChange}
      >
        {items?.map((item, i) => (
          <ScrollCircle.Item
            key={item._id}
            index={i}
            onClick={() => {
              console.log('点击了卡片的回调');
            }}
          >
            <div style={{width: 100, height: 50, border: '2px solid #aaa', userSelect: 'none'}}>
              <h4>{item.title}</h4>
            </div>
          </ScrollCircle.Item>
        ))}
      </ScrollCircle>
    </div>
  );
};

import { View } from '@tarojs/components';
import { useState, useEffect, useRef } from 'react';
import './index.less';
import ScrollRotate from '../index';
import React from 'react';
import Taro from '@tarojs/taro';

export default () => {
  const [list, setList] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    init();
  }, []);
  /** 初始化获取数据 */
  const init = () => {
    setTimeout(() => {
      const newList = new Array(30).fill('Tops').map((a, i) => ({ _id: 'id' + i, title: a + i }));
      const preIndex = (pageNum - 1) * pageSize;
      const newItems = newList.slice(preIndex, preIndex + pageSize);
      setItems(newItems);
      setList(newList);
    }, 300);
  };
  const onPageChange = ({ pageNum, pageSize }: { pageNum: number; pageSize: number }) => {
    const preIndex = (pageNum - 1) * pageSize;
    const newItems = list.slice(preIndex, preIndex + pageSize);
    // 填充空数据
    const length = newItems.length;
    for (let i = 0; i < pageSize - length; i++) {
      newItems.push({ _id: 'id-i-' + i, title: 'Null-' + i });
    }
    setItems(newItems);
    setPageNum(pageNum);
    setPageSize(pageSize);
  };

  /** --- 需要点击卡片中的内容，触发回调时建议这样做 start ---  */
  const touchInfo = useRef({
    isLock: false,
    touchTime: 0,
  });
  const onTouchStart = () => {
    touchInfo.current.touchTime = Date.now();
    touchInfo.current.isLock = false;
  };
  const onTouchMove = () => {
    if (touchInfo.current.isLock) return;
    if (Date.now() - touchInfo.current.touchTime > 150) {
      touchInfo.current.isLock = true;
    }
  };
  const onTitleClick = (title: string) => {
    if (!touchInfo.current.isLock) {
      console.log(`点击了${title}`);
    }
  };
  /** --- end --- */

  return (
    <View className="demo-scroll-circle">
      <View className="top" style={{ height: '50px', background: '#458cfe' }}></View>
      <ScrollRotate
        list={list}
        height={`calc(100vh - 100px)`}
        onPageChange={onPageChange}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {items?.map((item, i) => (
          <ScrollRotate.Item
            key={item._id}
            index={i}
            onClick={() => {
              Taro.showToast({ title: `点击了卡片的回调`, icon: 'none', duration: 1000 });
            }}
          >
            <View className={`card`}>
              <View
                className="cardTitle"
                onClick={() => {
                  onTitleClick(item.title);
                }}
              >
                {item.title}
              </View>
            </View>
          </ScrollRotate.Item>
        ))}
      </ScrollRotate>
      <View className="navWrap">
        <View className="navItem">T</View>
        <View className="navItem">C</View>
        <View className="navItem">B</View>
      </View>
      <View className="bottom" style={{ height: '50px', background: '#458cfe' }}></View>
    </View>
  );
};

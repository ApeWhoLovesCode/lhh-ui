import React, { useState, useEffect, useRef } from 'react';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { MobileFolderItem, MobileFolderProps } from './type';
import { classBem, classMergeBem, isMobile, randomStr } from '../utils';
import { useDebounceFn } from 'ahooks';

const classPrefix = `lhhui-mobile-folder`;

const defaultProps = {
  
}
type RequireType = keyof typeof defaultProps

const MobileFolder = (comProps: MobileFolderProps) => {
  const props = useMergeProps<MobileFolderProps, RequireType>(comProps, defaultProps)
  const { list, ...ret } = props
  const colNum = 2;
  const idRef = useRef(randomStr(classPrefix));
  const [size, setSize] = useState(50);
  /** 展示更多 */
  const [isShowMore, setIsShowMore] = useState(false);
  const [isMoreOverflowHidden, setIsMoreOverflowHidden] = useState(true);
  const [moreItems, setMoreItems] = useState<{x: number, y: number}[]>([]);

  const {run: getInfo} = useDebounceFn(() => {
    const wrapInfo = document.querySelector(`.${idRef.current}`)
    // item 宽度是 gap 宽度的 4 倍，所以当 n 为 2 时，gap 就是 width / 11;
    const gap = wrapInfo!.clientWidth / ((colNum + 1) + colNum * 4)
    setSize(gap * 4)
  }, {wait: 100});

  const init = () => {
    getInfo()
  }

  useEffect(() => {
    init()
    if(!isMobile) window.addEventListener('resize', getInfo)
    return () => {
      if(!isMobile) window.removeEventListener('resize', getInfo)
    }
  }, [list])

  const moreNum = Math.pow(colNum, 2) - 1;

  const onClickItem = (item: MobileFolderItem, i: number) => {
    item.onClick?.(item, i)
  }

  const onShowMore = () => {
    if(isShowMore) return
    document.body.style.overflow = 'hidden';
    setIsShowMore(true)
    setIsMoreOverflowHidden(false)
    setTimeout(() => {
      const arr = []
      for(let i = 0; i < list?.length; i++) {
        const itemInfo = document.querySelector(`.${idRef.current} .${classPrefix}-item-${i}`)?.getBoundingClientRect()
        const popItemInfo = document.querySelector(`.${idRef.current} .${classPrefix}-pop-item-${i}`)?.getBoundingClientRect()
        if(!itemInfo || !popItemInfo) continue;
        arr.push({
          x: popItemInfo.left - itemInfo.left,
          y: popItemInfo.top - itemInfo.top, 
        })
      }
      setMoreItems(arr)
    }, 10);
  }

  const onHideMore = () => {
    setMoreItems([])
    setIsShowMore(false)
    // 200ms 后溢出项的 opacity 就为 0 了，300ms 后开启溢出隐藏。
    setTimeout(() => {
      setIsMoreOverflowHidden(true)
      document.body.style.overflow = 'auto'
    }, 300);
  }

  return withNativeProps(
    ret,
    <div className={`${classPrefix} ${idRef.current}`} style={{['--size' as any]: size + 'px'}}>
      <div className={`${classPrefix}-area`}>
        {/* 前几个较大项 */}
        {list?.slice(0, moreNum)?.map((item, i) => {
          const moreItem = moreItems[i]
          return (
            <div 
              key={i + (item.icon ?? '') + (item.title ?? '')} 
              className={classBem(`${classPrefix}-item`, {
                [String(i)]: true,
                more: isShowMore,
              })}
              onClick={() => onClickItem(item, i)}
              style={{
                transform: moreItem ? `translate(${moreItem.x}px, ${moreItem.y}px)` : '',
              }}
            >
              {item.icon ? (
                <img className={`${classPrefix}-icon`} src={item.icon} />
              ) : item.children}
              {isShowMore && (
                <div className={`${classPrefix}-item-title`}>{ item.title ?? 'pop' }</div>
              )}
            </div>
          )
        })}
        {/* 更多的缩小项 */}
        <div 
          className={classBem(`${classPrefix}-item`, {
            last: true,
            more: isShowMore,
            overflowHide: isMoreOverflowHidden,
          })}
          onClick={onShowMore}
        >
          {list?.slice(moreNum)?.map((item, i) => {
            const moreItem = moreItems[moreNum + i]
            return (
              <div 
                key={i + (item.icon ?? '') + (item.title ?? '')}
                className={`${classPrefix}-item-sub ${classPrefix}-item-${moreNum + i}`} 
                style={{
                  transform: moreItem ? `translate(${moreItem.x}px, ${moreItem.y}px)` : '',
                  opacity: i >= 4 ?( moreItem ? 1 : 0) : '',
                }}
                onClick={() => onClickItem(item, moreNum + i)}
              >
                {item.icon ? (
                  <img className={`${classPrefix}-icon`} src={item.icon} />
                ) : item.children}
                {isShowMore && Boolean(item.title) && (
                  <div className={`${classPrefix}-item-title`}>{ item.title }</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {/* 全部内容弹出层 */}
      <div className={classBem(`${classPrefix}-pop`, {show: isShowMore})} onClick={onHideMore}>
        <div className={`${classPrefix}-pop-content`}>
          {list?.map(((item, i) => (
            <div 
              key={i + (item.icon ?? '') + (item.title ?? '')}
              className={classMergeBem(`${classPrefix}-pop-item`, [String(i)])}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
            </div>
          )))}
        </div>
      </div>
    </div>
  )
}

export default MobileFolder
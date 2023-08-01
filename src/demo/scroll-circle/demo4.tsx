import React from 'react';
import { ScrollCircle, classBem, isMobile } from 'lhh-ui';
import './index.less';
import { CenterPointType } from 'lhh-ui/scroll-circle/type';

const arrCenter: CenterPointType[] = ['center', 'center']
const arr: CenterPointType[] = ['left','left', 'right','right', 'top','top', 'bottom','bottom']
const arrAuto: CenterPointType[] = ['auto', 'auto', 'auto', 'auto']
const listFew = Array.from({length: 10}, (_, i) => ({ id: 'id' + i, title: i }))
const list = Array.from({length: 16}, (_, i) => ({ id: 'id' + i, title: i }))
export default () => {

  const item = (v: CenterPointType, i: number, isCenter?: boolean) => (
    <ScrollCircle
      listLength={isCenter ? listFew.length : list.length}
      isPagination={false}
      initCartNum={2}
      centerPoint={v}
      isFlipDirection={i % 2 === 1}
    >
      {(isCenter ? listFew : list)?.map((item, i) => (
        <ScrollCircle.Item
          key={item.id}
          index={i}
        >
          <div className='card'>
            {item.title}
          </div>
        </ScrollCircle.Item>
      ))}
    </ScrollCircle>
  )

  return (
    <div className={classBem('demo-scrollcircle', {isMobile})}>
      <div className='wrap'>
        {arrCenter.map((v, i) => (
          <div key={i}>
            <div className='title'>{v}{i % 2 === 1 ? ' + 翻转方向' : null}</div>
            <div className='item'>
              {item(v, i, true)}
            </div>
          </div>
        ))}
      </div>
      <div className='wrap'>
        {arr.map((v, i) => (
          <div key={i}>
            <div className='title'>{v}{i % 2 === 1 ? ' + 翻转方向' : null}</div>
            <div className='item'>
              {item(v, i)}
            </div>
          </div>
        ))}
      </div>
      <h3 style={{maxWidth: 400, textAlign: 'center'}}>------- auto -------</h3>
      <div className='wrap'>
        {arrAuto.map((v, i) => (
          <div key={i}>
            <div className='title'>{i < 2 ? '横向' : '纵向'}{i % 2 === 1 ? ' + 翻转方向' : null}</div>
            <div className={classBem('item', {col: i >= 2})}>
              {item(v, i)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

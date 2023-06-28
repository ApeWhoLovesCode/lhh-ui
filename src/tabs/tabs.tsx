import React, { forwardRef, useImperativeHandle, FC, useState, useEffect, useRef, ReactElement, ComponentProps } from 'react';
import classNames from 'classnames';
import { useDebounceFn } from 'ahooks';
import { traverseReactNode } from './traverse-react-node';
import { useRender } from '../hooks';
import { TabProps, TabsInstance, TabsProps } from './type';
import { withNativeProps } from '../utils/native-props';
import { randomStr } from '../utils/random';
import { isMobile } from '../utils/handleDom';

const classPrefix = `lhhui-tabs`;

type TabItemType = {
  width: number;
  left: number;
};

export const Tab: FC<TabProps> = () => {
  return null;
};

export const Tabs = forwardRef<TabsInstance, TabsProps>(
  (
    {
      list,
      activeIndex = 0,
      activeTextClass,
      activeLine,
      isAnimate = true,
      onChange,
      children,
      ...ret
    },
    ref,
  ) => {
    const idRef = useRef(randomStr(classPrefix));
    const scrollViewRef = useRef<HTMLDivElement>(null)
    const [curI, setCurI] = useState<number>(activeIndex);
    /** tabs 的总宽度 除以2 */
    const [tabsWidth, setTabsWidth] = useState(0)
    /** 每个 tab 的宽度和左边距离的数组 */
    const [tabList, setTabList] = useState<TabItemType[]>([])
    const [isLineShow, setIsLineShow] = useState(false);
    const { renderFn } = useRender();

    const panes: ReactElement<ComponentProps<typeof Tab>>[] = [];

    traverseReactNode(children, (child) => {
      if (!React.isValidElement(child)) return;
      const key = child.key;
      if (typeof key !== 'string') return;
      panes.push(child as unknown as ReactElement<ComponentProps<typeof Tab>>);
    });

    const toLeft = useRef({
      left: 0,
      preLeft: 0,
    });
    /** 向右滚动屏幕的宽度 */
    const scrollTo = (newLeft = 9999) => {
      const preLeft = toLeft.current.preLeft;
      toLeft.current.left = newLeft === preLeft ? newLeft + 1 : newLeft;
      toLeft.current.preLeft = toLeft.current.left;
      renderFn();
    };
    useImperativeHandle(ref, () => ({
      scrollTo,
    }));

    const {run: getInfo} = useDebounceFn(() => {
      const tabs: HTMLElement = document.querySelector(`.${idRef.current}`)!
      const tabWrapEles: NodeListOf<HTMLElement> = document.querySelectorAll(`.${idRef.current} .${classPrefix}-tabWrap`)
      const tabsInfo: HTMLElement = document.querySelector(`.${idRef.current} .${classPrefix}-scrollView`)!
      if (!tabs || !tabWrapEles || !tabsInfo) return;
      const arr: TabItemType[] = []
      tabWrapEles.forEach((e) => {
        const _l = e.offsetLeft + e.offsetWidth / 2 - tabsInfo.offsetLeft;
        arr.push({ width: e.offsetWidth, left: _l });
      });
      setTabsWidth((ret?.isMiddleScreen ? window.innerWidth : tabs.offsetWidth) / 2)
      setTabList(arr)
      setIsLineShow(true);
    }, {wait: 100});

    useEffect(() => {
      setTimeout(() => {
        getInfo();
      }, 10);
      if(!isMobile) window.addEventListener('resize', getInfo)
      return () => {
        if(!isMobile) window.removeEventListener('resize', getInfo)
      }
    }, [list]);

    useEffect(() => {
      setCurI(activeIndex);
    }, [activeIndex]);

    useEffect(() => {
      if(scrollViewRef.current) {
        scrollViewRef.current.scrollLeft = toLeft.current.left + (tabList[curI]?.left ?? 0) - tabsWidth
      }
    }, [curI, tabList, tabsWidth])

    return withNativeProps(
      ret,
      <div className={`${classPrefix} ${idRef.current}`}>
        <div className={`${classPrefix}-header ${classPrefix}-header-left`}>
          <div className={`${classPrefix}-mask ${classPrefix}-mask-left`}></div>
        </div>
        <div className={`${classPrefix}-header ${classPrefix}-header-right`}>
          <div className={`${classPrefix}-mask ${classPrefix}-mask-right`}></div>
        </div>
        <div
          ref={scrollViewRef}
          className={`${classPrefix}-scrollView`}
          onMouseEnter={() => (toLeft.current.left = 0)}
          onTouchEnd={() => (toLeft.current.left = 0)}
        >
          <div className={`${classPrefix}-content`}>
            <div
              className={`${classPrefix}-left-placeholder ${classNames(ret.placeholderBoxClass)}`}
            ></div>
            {panes.map((pane, i) =>
              withNativeProps(
                pane.props,
                <div
                  className={`${classPrefix}-tabWrap ${classNames(ret.tabClassName)}`}
                  key={pane.key ?? i}
                  onClick={() => {
                    toLeft.current.left = 0;
                    setCurI(i);
                    onChange?.(i);
                  }}
                >
                  <div
                    className={`${classPrefix}-tab ${
                      i === curI ? `${classPrefix}-tab-active ${classNames(activeTextClass)}` : ''
                    }`}
                  >
                    {pane.props.children ?? pane.props.title}
                  </div>
                </div>,
              ),
            )}
            <div
              className={`${classPrefix}-right-placeholder ${classNames(ret.placeholderBoxClass)}`}
            ></div>
            {/* 底部选中的横线样式 */}
            {
              <div
                className={`
                  ${classPrefix}-line 
                  ${isAnimate ? classPrefix + '-line-animate' : ''}
                  ${isLineShow ? `${classPrefix}-line-show` : `${classPrefix}-line-hide`}
                `}
                style={{
                  transform: `translateX(calc(${tabList[curI]?.left}px - 50%))`,
                }}
              >
                {activeLine ?? <div className={`${classPrefix}-line-line`}></div>}
              </div>
            }
          </div>
        </div>
      </div>,
    );
  },
);

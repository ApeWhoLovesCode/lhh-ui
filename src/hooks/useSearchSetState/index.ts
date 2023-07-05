import { useState } from 'react';
import useSearchParamsFilter from '../useSearchParamsFilter';
import { forEachObject, getUrlParamsToObject, getInitialState } from './utils';

/**
 * 设置一个与地址栏参数相绑定对象
 * @param keys: 以 字符串.字符串 的形式代表嵌套对象的key；例: ['name','a.b'] => {name: '', a: {b: ''}}
 */
function useSearchSetState<S extends Record<string, unknown>>(
  keys?: string[],
  initialState?: S | (() => S),
) {
  const { setParam, getParam } = useSearchParamsFilter();
  const [state, setState] = useState<S>(() => {
    const initState = getInitialState(initialState);
    let numberKeys: string[] = [];
    if (initState) {
      forEachObject(initState, (itemObj, key, allKey) => {
        // @ts-ignore
        if (typeof itemObj[key] === 'number') {
          numberKeys.push(allKey);
        }
      });
    }
    const urlValue = getUrlParamsToObject(keys, getParam, numberKeys);
    return { ...initState, ...urlValue };
  });

  const setSearchSetState = (patch: S | ((v: S) => S)) => {
    const newState = typeof patch === 'function' ? patch(state) : patch;
    setState(newState);
    if (keys) {
      forEachObject({ ...state, ...newState }, (itemObj, key, allKey, i) => {
        if (keys.includes(allKey)) {
          // @ts-ignore
          const val = !i ? newState[key] : itemObj[key];
          setParam(allKey, val ? String(val) : '');
        }
      });
    }
  };

  return [state, setSearchSetState] as const;
}

export default useSearchSetState
export { useSearchSetState, getUrlParamsToObject };

import { useState } from 'react';
import useSearchParamsFilter from '../useSearchParamsFilter';

/**
 * 注意：使用该钩子时，不要在一个函数内 setParam 多次，否则会有闭包问题，导致url参数前值被后值覆盖
 */
function useSearchState<S = string>(
  key: string,
  initialState?: S | (() => S),
  p?: UseSearchStateParams
) {
  const { setParam, getParam } = useSearchParamsFilter();
  const [state, setState] = useState<S>(() => {
    let param = getParam(key)
    if(param && p?.isNotString) {
      param = JSON.parse(param)
    }
    return (param ?? initialState ?? '') as S
  });

  const setSearchState = (patch: S | ((v: S) => S)) => {
    const v = patch instanceof Function ? patch(state) : patch;
    setState(v);
    let params = ''
    if(p?.isNotString) {
      params = JSON.stringify(v)
    } else {
      params = v ? String(v) : ''
    }
    setParam(key, params);
    p?.clearKeys?.forEach((key) => {
      setParam(key, '');
    });
  };

  return [state, setSearchState] as const;
}

export default useSearchState
export { useSearchState }

export type UseSearchStateParams = {
  /** 设置key的同时清除其他的key */
  clearKeys?: string[]
  /** 是否不是string类型 */
  isNotString?: boolean
}
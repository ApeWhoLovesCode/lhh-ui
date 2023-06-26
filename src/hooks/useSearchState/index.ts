import { useState } from 'react';
import useSearchParamsFilter from '../useSearchParamsFilter';

/**
 * 注意：使用该钩子时，不要在一个函数内 setParam 多次，否则会有闭包问题，导致url参数前值被后值覆盖
 */
function useSearchState<S = string>(
  key: string,
  initialState?: S | (() => S),
  /** 设置key的同时清除其他的key */
  clearKeys?: string[],
) {
  const { setParam, getParam } = useSearchParamsFilter();
  const [state, setState] = useState<S>(
    (getParam(key) ?? initialState ?? '') as S,
  );

  const setSearchState = (v: S) => {
    setState(v);
    setParam(key, v ? String(v) : '');
    clearKeys?.forEach((key) => {
      setParam(key, '');
    });
  };

  return [state, setSearchState] as const;
}

export default useSearchState
export { useSearchState }
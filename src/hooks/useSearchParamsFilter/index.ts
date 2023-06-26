import { useSearchParams } from 'react-router-dom';

function useSearchParamsFilter<T extends string>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = (name: T, value?: string | number) => {
    if (value) {
      searchParams.set(name, encodeURIComponent(String(value)));
    } else {
      if (!searchParams.get(name)) {
        return;
      }
      searchParams.delete(name);
    }
    const objParams: {[key in string]: string} = {};
    searchParams.forEach((value, key) => {
      if (key && value) {
        objParams[key] = value;
      }
    });
    setSearchParams(objParams);
  };

  const getParam = (name: T) => {
    return searchParams.get(name)
      ? decodeURIComponent(searchParams.get(name) ?? '')
      : void 0;
  };

  return {
    searchParams,
    setParam,
    getParam,
  } as const;
}

export default useSearchParamsFilter
export { useSearchParamsFilter }
function useSearchParamsFilter<T extends string>() {
  const searchParams = new URLSearchParams(window.location.search);

  const setParam = (name: T, value?: string | number) => {
    if (value) {
      searchParams.set(name, encodeURIComponent(String(value)));
      // 更新地址栏
      window.history.replaceState({}, '', '?' + searchParams.toString());
    } else {
      if (!searchParams.get(name)) {
        return;
      }
      searchParams.delete(name);
    }
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
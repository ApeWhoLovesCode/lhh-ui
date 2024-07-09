function useSearchParamsFilter<T extends string>() {
  const searchParams = new URLSearchParams(window.location.search);

  const setParam = (name: T, value?: string | number) => {
    if (value) {
      searchParams.set(name, encodeURIComponent(String(value)));
    } else {
      if (!searchParams.get(name)) {
        return;
      }
      searchParams.delete(name);
    }
    // 更新地址栏
    window.history.replaceState({}, "", "?" + searchParams.toString());
  };

  const getParam = (name: T) => {
    const value = searchParams.get(name);
    return value ? decodeURIComponent(value ?? "") : void 0;
  };

  return {
    searchParams,
    setParam,
    getParam,
  } as const;
}

export default useSearchParamsFilter;
export { useSearchParamsFilter };

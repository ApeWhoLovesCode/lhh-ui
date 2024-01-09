import { isObj } from "../../utils";

/**
 * 获取url参数并将其转化为一个对象
 * @param keys: 以 字符串.字符串 的形式代表嵌套对象的key；例: ['name','a.b'] => {name: '', a: {b: ''}}
 * @param getParam: 获取地址参数的方法: const {getParam} = useSearchParamsFilter();
 * @param numberKeys?: 需要将字符串转化为number的key
 */
export function getUrlParamsToObject(
  keys?: string[],
  getParam?: (v: string) => string | undefined,
  numberKeys?: string[],
) {
  const urlVal: any = {};
  keys?.forEach((key) => {
    const paramsVal = getParam?.(key) ?? '';
    if (paramsVal) {
      const keysArr = key.split('.');
      let tempObj = urlVal;
      keysArr.forEach((k, index) => {
        if (index === keysArr.length - 1) {
          tempObj[k] = numberKeys?.includes(key) ? +paramsVal : paramsVal;
        } else {
          if (!tempObj[k]) {
            tempObj[k] = {};
          }
        }
        tempObj = tempObj[k];
      });
    }
  });
  return urlVal;
}

/** 遍历一个多层嵌套的对象 */
export function forEachObject(
  obj: object,
  fn: (itemObj: object, key: string, allKey: string, i: number) => void,
) {
  if (!obj) return;
  function forEachObjectFn(itemObj: object, prefixKey?: string, i = 0) {
    Object.keys(itemObj).forEach((key) => {
      const allKey = !prefixKey ? key : `${prefixKey}.${key}`;
      // @ts-ignore
      if (isObj(itemObj[key])) {
        // @ts-ignore
        forEachObjectFn(itemObj[key], allKey, i + 1);
      } else {
        fn?.(itemObj, key, allKey, i);
      }
    });
  }
  forEachObjectFn(obj);
}

export const getInitialState = <T>(initialState: T | (() => T)): T => (
  initialState instanceof Function ? initialState() : initialState
)
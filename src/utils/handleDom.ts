import classNames from 'classnames';

/** 处理类名与需要判断的类名 */
export const classBem = (
  className: string,
  obj?: { [key in string]?: boolean },
) => {
  let str = className;
  if (obj) {
    Object.keys(obj).forEach((key) => {
      str += ' ' + (obj[key] ? className + '-' + key : '');
    });
  }
  return str;
};

/** 处理style的需要判断的类名 */
export const classBemStyle = (
  className: string,
  styles: any,
  obj?: { [key in string]?: boolean },
) => {
  const arr: string[] = [styles[className]];
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        arr.push(styles[className + '-' + key]);
      }
    });
  }
  return classNames(arr);
};

/** 处理并合并类名 */
export const classMergeBem = (classnames: string, arr?: string[]) => {
  let str = classnames;
  arr?.forEach((key) => {
    str += ' ' + classnames + '-' + key;
  });
  return str;
};

/** 判断是移动端还是pc端 */
export const isMobile = () => {
  // 为了兼容服务端对客户端组件的预渲染
  if(typeof window === 'undefined' || typeof navigator === 'undefined') return false
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  )
}

import classNames from 'classnames';

/** 处理style的px */
export const handleStylePx = (v: number | string) => {
  return typeof v === 'number' ? v + 'px' : v;
};

/** 处理类名与需要判断的类名 */
export const classBem = (
  classnames: string,
  obj?: { [key in string]?: boolean },
) => {
  let str = classnames;
  if (obj) {
    Object.keys(obj).forEach((key) => {
      str += ' ' + (obj[key] ? classnames + '-' + key : '');
    });
  }
  return str;
};

/** 处理style的需要判断的类名 */
export const classBemStyle = (
  classname: string,
  styles: any,
  obj?: { [key in string]?: boolean },
) => {
  const arr: string[] = [styles[classname]];
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        arr.push(styles[classname + '-' + key]);
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
export const isMobile = !!navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
);

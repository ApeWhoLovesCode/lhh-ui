type OptKey = 'y+' | 'm+' | 'd+' | 'H+' | 'M+' | 'S+';
/** 格式化日期 yy-mm-dd HH:MM:SS */
export function dateFormat(_date?: Date | number, _fmt = 'yy-mm-dd HH:MM:SS') {
  let date = _date;
  if (!(date instanceof Date)) {
    date = new Date(date ?? Date.now());
  }
  let ret;
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  let fmt = _fmt;
  Object.keys(opt).forEach((k) => {
    const _k = k as OptKey;
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[_k] : opt[_k].padStart(ret[1].length, '0'),
      );
    }
  });
  return fmt;
}

/** 加0 */
export const addZero = (v: number | string) => (+v >= 10 ? '' : '0') + v;

/** 格式化剩余时间 */
export function formatRemainTime(time?: number, format = 'D天HH时mm分ss秒') {
  // 当初始化时间为 undefined 时返回
  if (time === void 0) return '0';
  // 处理 中括号[] 中的替换文本
  let _format = format;
  let keyObj = format.match(/\[(.+?)\]/g)?.reduce((pre: any, cur, i) => {
    const key = `$${i + 1}$`;
    pre[key] = cur.match(/\[(.*)\]/)?.[1] ?? cur;
    _format = _format.replace(cur, key);
    return pre;
  }, {});
  const opt = {
    D: 86400,
    H: 3600,
    m: 60,
    s: 1,
  };
  let _time = Math.ceil(time / 1000);
  const arr = Object.keys(opt) as ('D' | 'H' | 'm' | 's')[];
  arr.forEach((k, i) => {
    let time = '';
    if (_time >= opt[k]) {
      time = String(~~(_time / opt[k]));
      _time %= opt[k];
    }
    if (!time && i < arr.length - 1) {
      // 删除为0的时间
      _format = _format.slice(_format.indexOf(arr[i + 1]));
    } else {
      const ret = new RegExp(`${k}+`).exec(_format);
      if (ret) {
        _format = _format.replace(
          ret[0],
          ret[0].length === 1 ? time : time.padStart(ret[0].length, '0'),
        );
      }
    }
  });
  Object.keys(keyObj).forEach((k) => {
    _format = _format.replace(k, keyObj[k]);
  });
  return _format;
}

/** 字母大写转-加小写 (helloWorld => hello-world) */
export function letterUpperTolower(v: string) {
  return v.replace(/([A-Z])/g, (_: string, $1: string) => {
    return '-' + $1?.toLowerCase();
  });
}

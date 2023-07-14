/** 将横线替换成空格 */
export function replaceLineToSpace(str: string) {
  return str.replace(/\-/, ' ')
}

/** 转化颜色 例:将 #fff 转化为 rgb(255, 255, 255) */
export const replaceHexToRgb = (hex: string) => {
  if(!hex.includes('#')) return hex
  const rgb: number[] = [];
  //去除前缀 # 号
  hex = hex.substring(1);
  if (hex.length === 3) {
    // 处理 '#abc' 成 '#aabbcc'
    hex = hex.replace(/(.)/g, '$1$1');
  }
  hex.replace(/../g, (color: string) => {
    // 按16进制将字符串转换为数字
    rgb.push(parseInt(color, 0x10));
    return color;
  });
  return 'rgb(' + rgb.join(',') + ')';
};
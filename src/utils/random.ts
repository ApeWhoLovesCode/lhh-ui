/** 生成随机字符串 */
export const randomStr = (v?: string) =>
  `${v ? v + '-' : ''}${Math.ceil(Math.random() * 10e5).toString(36)}-${Date.now().toString(36)}`;

/** 打乱数组 Fisher Yates shuffle算法 */
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/** 生成随机字母 isUppercase 是否大写 */
export function randomLetter(isUppercase = true) {
  return String.fromCharCode(Math.floor(Math.random() * 26) + (isUppercase ? 65 : 97));
}
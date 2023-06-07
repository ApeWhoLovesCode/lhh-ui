import { shuffleArray } from "../utils/random";

/** 根据反转次数和空瓦片的位置来检查打乱的数组是否可解 */
function isSolvable(arr: any[], size: number) {
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] !== size * size && arr[j] !== size * size && arr[i] > arr[j]) {
        inversions++;
      }
    }
  }
  if (size % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    const emptyTileRow = Math.ceil(arr.indexOf(size * size) / size);
    return (inversions + emptyTileRow) % 2 === 1;
  }
}

/** 创建一个打乱的不重复数字的数组 */
export function randomNumberArray(size: number) {
  const arr = Array.from({length: size * size}, (_, i) => i + 1); 
  do {
    shuffleArray(arr);
  } while (!isSolvable(arr, size));
  return arr
}

/** 判断是否完成拼图 */
export function isPuzzleSolved(arr: number[][]) {
  const length = arr.length
  for (let i1 = 0; i1 < length; i1++) {
    const len = length - (i1 === length - 1 ? 1 : 0 )
    for (let i2 = 0; i2 < len; i2++) {
      if (arr[i1][i2] !== i1 * length + i2 + 1) {
        return false;
      }
    }
  }
  return arr.at(-1)?.at(-1) === 0
}

/** 获取行列的位置 */
export function getRowColItem(index: number, spaceIndex: number, size: number) {
  index += index >= spaceIndex ? 1 : 0 
  return {
    rowNum: Math.floor(index / size),
    colNum: index % size,
  }
}


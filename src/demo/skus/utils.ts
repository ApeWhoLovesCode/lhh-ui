import { SkusItem } from 'lhh-ui';

export const skuData: Record<string, string[]> = {
  '颜色': ['红','绿','蓝','黑','白','黄'],
  '大小': ['S','M','L','XL','XXL','MAX'],
  '款式': ['圆领','V领','条纹','渐变','轻薄','休闲'],
  '面料': ['纯棉','涤纶','丝绸','蚕丝','麻','鹅绒'],
  '群体': ['男','女','中性','童装','老年','青少年'],
  '价位': ['<30','<50','<100','<300','<800','<1500'],
}

export const skuNames = Object.keys(skuData)

export function getSkusData(
  skuCategories: number[],
  noStockSkus?: string[][],
  /** 是否采用新的key */
  isNewKey?: boolean
) {
  const skusList: SkusItem[] = []
  // 对应 skuState 中各 sku ，主要用于下面遍历时，对 product 中 skus 的索引操作
  const indexArr = Array.from({length: skuCategories.length}, () => 0);
  // 需要遍历的总次数
  const total = skuCategories.reduce((pre, cur) => pre * (cur || 1), 1)
  for(let i = 1; i <= total; i++) {
    const sku: SkusItem = {
      // 库存：60%的几率为0-50，40%几率为0
      [!isNewKey ? 'stock' : 'newStock']: Math.floor(Math.random() * 10) >= 4 ? Math.floor(Math.random() * 50) : 0,
      params: [],
    }
    // 生成每个 sku 对应的 params
    let skuI = 0;
    skuNames.forEach((name, j) => {
      if(skuCategories[j]) {
        const value = skuData[name][indexArr[skuI]]
        sku.params.push({
          name,
          value,
        })
        skuI++;
      }
    })
    skusList.push(sku)

    indexArr[indexArr.length - 1]++;
    for(let j = indexArr.length - 1; j >= 0; j--) {
      if(indexArr[j] >= skuCategories[j] && j !== 0) {
        indexArr[j - 1]++
        indexArr[j] = 0
      }
    }

    if(noStockSkus) {
      if(!sku[!isNewKey ? 'stock' : ('newStock' as keyof SkusItem)]) {
        noStockSkus.at(-1)?.push(sku.params.map(p => p.value).join(' / '))
      }
      if(indexArr[0] === noStockSkus.length && noStockSkus.length < skuCategories[0]) {
        noStockSkus.push([])
      }
    }
  }
  return skusList
}
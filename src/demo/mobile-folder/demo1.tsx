import { MobileFolder, MobileFolderItem } from "lhh-ui"
import React, { useEffect } from "react"
import LTDIcon from "../../assets/tom.jpeg"
// const LTDIcon = 'https://lhh.codeape.site/img/legend-td-icon.png';

export default () => {

  const list: MobileFolderItem[] = [
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
    {icon: LTDIcon},
  ]

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.scrollbarWidth = 'none'; // 隐藏滚动条在Firefox中
    document.body.style.msOverflowStyle = 'none'; // 隐藏滚动条在IE和Edge中
    document.body.style.WebkitScrollbar = 'none'; // 隐藏滚动条在Chrome和Safari中
  }, [])

  return (
    <div style={{background: 'skyblue'}}>
      <MobileFolder list={list} style={{width: 300}} />
    </div>
  )
}
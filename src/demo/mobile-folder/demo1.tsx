import { MobileFolder, MobileFolderItem } from "lhh-ui"
import React, { useEffect } from "react"
import GitHubIcon from "../../assets/github.svg"
const LTDIcon = 'https://lhh.codeape.site/img/legend-td-icon.png';
const BlogIcon = 'https://lhh.codeape.site/img/blog.svg';

export default () => {

  const toGitHub = () => {
    window.open('https://github.com/ApeWhoLovesCode/lhh-ui')
  }

  const list: MobileFolderItem[] = [
    {icon: GitHubIcon, title: 'Lhh-ui', onClick: toGitHub},
    {icon: LTDIcon, title: 'LegendTD', onClick: () => {window.open('http://game.codeape.site/')}},
    {icon: BlogIcon, title: '我的博客', onClick: () => {window.open('https://codeape.site/')}},
    {icon: GitHubIcon, title: 'Github', onClick: (item, i) => {console.log(item, i)}},
    {icon: GitHubIcon},
    {icon: GitHubIcon},
    {icon: GitHubIcon},
    {icon: GitHubIcon},
    {icon: GitHubIcon},
    {icon: GitHubIcon},
    {icon: GitHubIcon},
  ]

  // 不显示滚动条的样式
  useEffect(() => {
    const styleEle = document.createElement('style');
    styleEle.innerText = 'body::-webkit-scrollbar { display: none; }'
    document.body.appendChild(styleEle)
  }, [])

  return (
    <div style={{background: 'skyblue', padding: 10}}>
      <MobileFolder list={list} style={{width: 300}} />
    </div>
  )
}
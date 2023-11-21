import { MobileFolder, MobileFolderItem } from "lhh-ui"
import React from "react"
import GitHubIcon from "../../assets/github.svg"

const ChildBox = ({index}: {index: number}) => {
  return (
    <div style={{width: '100%', height: '100%', background: 'skyblue', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      child {index}
    </div>
  )
}

export default () => {

  const list: MobileFolderItem[] = [
    {icon: GitHubIcon, title: 'Github', onClick: () => {window.open('https://github.com/ApeWhoLovesCode/lhh-ui')}},
  ]

  for(let i = 0; i < 10; i++) {
    list.push({
      children: <ChildBox index={i} />, 
      title: `child ${i}`
    })
  }

  return (
    <div style={{background: '#e1e1e1', padding: 10}}>
      <MobileFolder list={list} style={{width: 300}} />
    </div>
  )
}
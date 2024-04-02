import React, { useRef, useState } from "react"
import { Tree, TreeInstance } from "lhh-ui";
import { treeData } from "./data";

export default () => {
  const treeRef = useRef<TreeInstance>(null)
  const [searchVal, setSearchVal] = useState('0-0-0-1');
  const [keyList, setKeyList] = useState<string[] | undefined>([]);

  return (
    <div>
      <input value={searchVal} onChange={e => setSearchVal(e.target.value)} />
      <div style={{marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10}}>
        <button onClick={() => setKeyList(treeRef.current?.getParentKeys(searchVal))}>
          获取父节点
        </button>
        <button onClick={() => setKeyList(treeRef.current?.getSiblingKeys(searchVal))}>
          获取兄弟节点
        </button>
        <button onClick={() => setKeyList(treeRef.current?.getChildKeys(searchVal))}>
          获取子节点
        </button>
        <button onClick={() => setKeyList(treeRef.current?.getCheckKeys())}>
          获取当前 check 到的所有节点
        </button>
        <button onClick={() => {treeRef.current?.onAllCheck()}}>全选节点</button>
        <button onClick={() => {treeRef.current?.onAllCheck(false)}}>全不选节点</button>
      </div>
      <h4>
        获取到的节点信息：{JSON.stringify(keyList)}
      </h4>
      <Tree 
        ref={treeRef}
        treeData={treeData} 
        defaultExpandAll 
        selectable={false}
        checkable
      />
    </div>
  )
}
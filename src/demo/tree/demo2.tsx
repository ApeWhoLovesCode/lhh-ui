import React, { useState } from "react"
import { Tree } from "lhh-ui";
import { treeData } from "./data";

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  return (
    <div>
      <Tree 
        checkedKeys={checkedKeys} 
        treeData={treeData} 
        defaultExpandAll 
        checkable
        singleSelected
        onCheck={(keys, p) => {
          console.log('p: ', p);
          setCheckedKeys(keys)
        }}
      />
    </div>
  )
}
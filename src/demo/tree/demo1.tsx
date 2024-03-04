import React, { useState } from "react"
import { Tree } from "lhh-ui";
import { TreeNode } from "lhh-ui/tree/type";

const treeData: TreeNode[] = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { 
            title: '0-0-1-0', 
            key: '0-0-1-0',
            children: [
              { title: '0-0-1-0-0', key: '0-0-1-0-0', disabled: true },
              { title: '0-0-1-0-1', key: '0-0-1-0-1', disableCheckbox: true },
              { title: '0-0-1-0-2', key: '0-0-1-0-2' },
            ],
          },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0', key: '0-1-0' },
      { title: '0-1-1', key: '0-1-1' },
      { title: '0-1-2', key: '0-1-2' },
    ],
  },
  {
    title: <div style={{color: "blue"}}>~~hello~~</div>,
    key: '0-2',
  },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState(['0-1', '0-0-2']);
  return (
    <div>
      <Tree 
        checkedKeys={checkedKeys} 
        treeData={treeData} 
        defaultExpandAll 
        checkable
        onCheck={(keys) => {
          setCheckedKeys(keys)
        }}
        onSelect={(keys, p) => {
          console.log('keys, p: ', keys, p.treeDataItem);
        }}
      />
    </div>
  )
}
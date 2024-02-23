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
            disabled: true,
            children: [
              { title: '0-0-1-0-0', key: '0-0-1-0-0', disableCheckbox: true },
              { title: '0-0-1-0-1', key: '0-0-1-0-1' },
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
  console.log('checkedKeys: ', checkedKeys);
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
      />
    </div>
  )
}
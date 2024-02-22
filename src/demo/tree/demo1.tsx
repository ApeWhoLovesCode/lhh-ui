import React, { useState } from "react"
import { Tree } from "lhh-ui";
import { TreeDataItem } from "lhh-ui/tree/type";

const treeData: TreeDataItem[] = [
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
              { title: '0-0-1-0-0', key: '0-0-1-0-0' },
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
    title: '0-2',
    key: '0-2',
  },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState(['0-1']);
  console.log('checkedKeys: ', checkedKeys);
  return (
    <div>
      <Tree 
        checkedKeys={checkedKeys} 
        treeData={treeData} 
        defaultExpandAll 
        onCheck={(keys) => {
          setCheckedKeys(keys)
        }}
      />
    </div>
  )
}
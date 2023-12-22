import { Tabs } from "lhh-ui";
import React from "react";

const tabsList = ['鸡肉', '牛肉', '烤羊排', '火腿', '菲力', '小龙虾', '火鸡', '鱿鱼', '螃蟹', '小笼包', '汉堡包', '寿司'];
export default () => {
  return (
    <div style={{maxWidth: 500}}>
      <Tabs
        list={tabsList}
        activeLine={
          <img
            src="http://lhh.codeape.site/img/tom.jpeg"
            style={{width: 40, height: 10, objectFit: 'cover'}}
          />
        }
      >
        {tabsList.map((item, i) => (
          <Tabs.Tab key={item + i} title={item} />
        ))}
      </Tabs>
    </div>
  )
}
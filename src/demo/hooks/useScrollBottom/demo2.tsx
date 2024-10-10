import { useScrollBottom } from "lhh-ui";
import React from "react";
import "./demo.scss";

const listId = "useScrollBottomTest";

export default () => {
  const [list, setList] = React.useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );

  useScrollBottom({
    querySelector: `#${listId}`,
    bottom: 30,
    onScrollToLower() {
      console.log("----- 触底啦 -----");
      setList((arr) =>
        arr.concat(Array.from({ length: 10 }, (_, i) => arr.length + i + 1))
      );
    },
  });

  return (
    <div id={listId} className="use-scroll-bottom-list">
      {list.map((item) => (
        <div key={item} className="use-scroll-bottom-list-item">
          {item}
        </div>
      ))}
    </div>
  );
};

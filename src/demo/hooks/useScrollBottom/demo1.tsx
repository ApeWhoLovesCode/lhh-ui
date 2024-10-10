import { useScrollBottom } from "lhh-ui";
import React from "react";
import "./demo.scss";

export default () => {
  const [list, setList] = React.useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const listRef = React.useRef<HTMLDivElement>(null);

  useScrollBottom({
    ref: listRef,
    bottom: 30,
    onScrollToLower() {
      console.log("----- 触底啦 -----");
      setList((arr) =>
        arr.concat(Array.from({ length: 10 }, (_, i) => arr.length + i + 1))
      );
    },
  });

  return (
    <div ref={listRef} className="use-scroll-bottom-list">
      {list.map((item) => (
        <div key={item} className="use-scroll-bottom-list-item">
          {item}
        </div>
      ))}
    </div>
  );
};

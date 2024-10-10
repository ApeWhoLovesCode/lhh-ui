import { useScrollBottom } from "lhh-ui";
import React from "react";
import "./demo.scss";

export default () => {
  useScrollBottom({
    bottom: 50,
    onScrollToLower() {
      alert("----- 页面触底啦 -----");
    },
  });

  return <></>;
};

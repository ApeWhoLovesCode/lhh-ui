import React, { useState } from "react"
import { CheckBox } from "lhh-ui";

export default () => {
  const [check, setCheck] = useState(false);
  return (
    <div>
      <CheckBox indeterminate checked={check} onChange={setCheck}>
        hello
      </CheckBox>
    </div>
  )
}
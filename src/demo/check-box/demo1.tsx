import React, { useState } from "react"
import { CheckBox } from "lhh-ui";

export default () => {
  const [check, setCheck] = useState(true);
  return (
    <div>
      <CheckBox checked={check} onChange={setCheck}>
        hello
      </CheckBox>
    </div>
  )
}
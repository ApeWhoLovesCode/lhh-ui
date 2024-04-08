import { AnimationWrap, AnimationWrapInstance, AnimationWrapPosition } from "lhh-ui";
import React, { useRef } from "react";
import './index.scss';

const positionList: AnimationWrapPosition[] = [
  'right', 'bottom', 'left', 'top'
]
const positionList2: AnimationWrapPosition[] = [
  'right-bottom', 'right-top', 'left-bottom', 'left-top'
]

export default () => {
  const animationWrapRef = useRef<(AnimationWrapInstance | null)[]>([])
  const animationWrapRef2 = useRef<(AnimationWrapInstance | null)[]>([])

  return (
    <div className="demo-animationwrap">
      <div className="wrap">
        {positionList.map((p, i) => (
          <AnimationWrap 
            ref={ref => animationWrapRef.current[i] = ref} 
            position={p}
            key={p}
            background="#333"
          >
            <div className="text">
              你好 世界<br/>
              hello world<br/>
              HEllO WORLD<br/>
            </div>
          </AnimationWrap>
        ))}
      </div>
      <div className="divider">
        <button onClick={() => {animationWrapRef.current.forEach(ref => ref?.run())}}>run</button>
      </div>
      <div className="wrap wrap2">
        {positionList2.map((p, i) => (
          <AnimationWrap 
            ref={ref => animationWrapRef2.current[i] = ref}  
            position={p}
            key={p}
          >
            <div className="text">
              你好 世界<br/>
              hello world<br/>
              HEllO WORLD<br/>
            </div>
          </AnimationWrap>
        ))}
      </div>
      <div className="divider">
        <button onClick={() => {animationWrapRef2.current.forEach(ref => ref?.run())}}>run</button>
      </div>
    </div>
  )
}
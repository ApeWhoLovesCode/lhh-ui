import { useEffect, useRef, useState } from "react";

function usePropsState<S>(value: S) {
  const [state, setState] = useState<S>(value);
  const isMounted = useRef(false)

  useEffect(() => {
    if(isMounted.current) {
      setState(value)
    } else {
      isMounted.current = true
    }
  }, [value])

  return [state, setState] as const
}

export default usePropsState
export { usePropsState }
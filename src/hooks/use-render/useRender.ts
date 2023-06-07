import { useCallback, useState } from 'react';

const useRender = () => {
  const [isRender, setIsRender] = useState(false);
  return {
    isRender,
    /** 手动render页面 */
    renderFn: useCallback(() => {
      setIsRender((v) => !v);
    }, []),
  };
};

export default useRender;

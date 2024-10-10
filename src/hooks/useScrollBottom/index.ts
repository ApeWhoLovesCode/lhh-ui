import { useEffect, useRef, useState } from "react";

export type UseScrollBottomParams = {
  /** 绑定的滚动元素 */
  ref?: React.RefObject<HTMLElement>;
  /** 监听其他元素 */
  querySelector?: string;
  /**
   * 距离底部触发的距离
   * @default 30
   */
  bottom?: number;
  /** 滚动到底部触发的事件 */
  onScrollToLower?: () => void;
};

function useScrollBottom(p?: UseScrollBottomParams) {
  const { bottom = 30, ...oth } = p || {};
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isScrollToBottom, setIsScrollToBottom] = useState(false);
  const option = useRef({ ...oth });
  option.current = { ...oth };

  useEffect(() => {
    let dom: HTMLElement | null = document.documentElement;
    const handleScroll = () => {
      if (!dom) return;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } = dom!;
        const isB = scrollTop + clientHeight + bottom >= scrollHeight;
        setIsScrollToBottom(isB);
        if (isB) {
          option.current.onScrollToLower?.();
        }
      }, 30);
    };

    if (option.current.ref) {
      option.current.ref.current?.addEventListener("scroll", handleScroll);
      dom = option.current.ref.current;
    } else if (option.current.querySelector) {
      const el = document.querySelector(
        option.current.querySelector
      ) as HTMLElement;
      el?.addEventListener("scroll", handleScroll);
      dom = el;
    } else {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (option.current.ref || option.current.querySelector) {
        dom?.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [bottom]);

  return { isScrollToBottom };
}

export { useScrollBottom };
export default useScrollBottom;

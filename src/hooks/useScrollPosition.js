import { useCallback, useRef } from "react";
import useWindowScroll from "./useWindowScroll";

const isBrowser = !!global.window;

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

const useScrollPosition = (effect, { element, useWindow, ...restOptions } = {}) => {
  const position = useRef(getScrollPosition({ useWindow }));

  const scrollHandle = useCallback(() => {
    const current = getScrollPosition({ element, useWindow });
    effect({ previous: position.current, current });
    position.current = current;
  }, [position, effect, element, useWindow]);

  useWindowScroll(scrollHandle, restOptions);
};

export default useScrollPosition;

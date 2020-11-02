import { useEffect } from "react";

const nextTick = global.requestAnimationFrame || process.nextTick;

const useWindowScroll = (handleScroll, { wait, passive = true } = {}) => {
  useEffect(() => {
    if (global.addEventListener) {
      let destroyed = false;
      const handler = (evt) => {
        let then = Date.now();
        const tick = () => {
          if (destroyed) return;
          let now = Date.now();
          let elapsed = now - then;
          if (elapsed > wait) {
            handleScroll(evt);
          } else {
            nextTick(tick);
          }
        };
        if (wait) {
          tick();
        } else {
          handleScroll(evt);
        }
      };
      global.addEventListener("scroll", handler, passive);

      return () => {
        destroyed = true;
        global.removeEventListener("scroll", handler);
      };
    }
  }, [handleScroll, wait, passive]);
};

export default useWindowScroll;

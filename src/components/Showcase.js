import { useEffect, useMemo, useRef } from "react";
import createShowcase from "@rubeniskov/showcase";
import styled from "styled-components";
import BasicLayout from "../layouts/Basic";

const Showcase = ({ className, ...restProps }) => {
  const canvasRef = useRef(null);
  const showcaseRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const showcase = createShowcase(canvasRef.current);
      showcaseRef.current = showcase;
      return showcase.detach;
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => restProps, Object.values(restProps));

  useEffect(() => {
    if (showcaseRef.current) {
      showcaseRef.current.setOptions(options);
    }
  }, [showcaseRef, options]);

  return (
    <BasicLayout>
      <div className={className}>
        <canvas ref={canvasRef} />
      </div>
    </BasicLayout>
  );
};

export default styled(Showcase)`
  width: 100vw;
  height: 100vh;
  & canvas {
    position: fixed !important;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
`;

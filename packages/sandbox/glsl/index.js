import { useRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { vertex } from "./defaults";
import setup from "./setup";

const GlslSandbox = ({ className, value, onError }) => {
  const [error, setError] = useState();
  const canvasRef = useRef(null);
  const drawRef = useRef(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      drawRef.current = setup(canvasRef.current, {
        onError: (err) => {
          if (onError) {
            onError(onError);
          }
          setError(err);
        },
      });
    }
  }, [canvasRef, onError]);

  useLayoutEffect(() => {
    if (drawRef.current) {
      return drawRef.current(value);
    }
  }, [drawRef, value]);

  useLayoutEffect(() => {
    if (error) {
      setError(null);
    }
  }, [value]);

  return (
    <div className={className}>
      {error && (
        <div className="error-overlay">
          <pre>
            <code>{error.message}</code>
          </pre>
        </div>
      )}
      <canvas ref={canvasRef} />
    </div>
  );
};

GlslSandbox.defaultValue = vertex;

export default styled(GlslSandbox)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  & .error-overlay {
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;

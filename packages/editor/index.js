import styled from "styled-components";
import clsx from "clsx";
import { Suspense, useState, useRef } from "react";
import debounce from "lodash.debounce";
import SandboxEditor from "./Editor";

const Editor = ({ sandboxes = {}, language, className, children }) => {
  const Sandbox = sandboxes[language];
  const readOnly = !Sandbox;
  const defaultValue = Sandbox && Sandbox.defaultValue;
  const childrenValue = Array.isArray(children) ? children[0] : children;

  const [value, setValue] = useState(childrenValue || defaultValue);

  const onChangeCallback = useRef(
    debounce((_, value) => {
      setValue(value);
    }, 600),
    []
  ).current;

  return (
    <div className={clsx(className, { sandbox: !!Sandbox })}>
      <div>
        <div className="editor-content">
          <SandboxEditor
            onChange={onChangeCallback}
            value={value}
            language={language}
            readOnly={readOnly}
          />
        </div>
        {Sandbox && (
          <div className="sandbox-content">
            <Suspense fallback={<div>Loading...</div>}>
              <Sandbox value={value} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default styled(Editor)`
  padding-top: ${({ width = 50 }) => `${parseInt(width)}%`};
  display: flex;
  flex-flow: row;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: row;
    & > div {
      height: 100%;
    }
  }
  & .editor-content {
    width: 100%;
  }
  &.sandbox .editor-content {
    width: ${({ width = 50 }) => `${100 - parseInt(width)}%`};
  }
  &.sandbox .sandbox-content {
    width: ${({ width = 50 }) => `${parseInt(width)}%`};
  }
`;

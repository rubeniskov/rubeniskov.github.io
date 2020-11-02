import styled from "styled-components";
import { useState, useCallback } from "react";
import ResumeViewer from "./ResumeViewer";
import BasicLayout from "../layouts/Basic";

const formats = ["html", "json" /*, "yml" , "xlsx", "md"*/];

export const AboutMe = ({ className }) => {
  const [format, setFormat] = useState("html");

  const handleChangeFormat = useCallback((evt) => {
    setFormat(evt.target.id);
  }, []);

  return (
    <BasicLayout>
      <div className={className}>
        <div>
          {formats.map((format) => (
            <button key={format} id={format} onClick={handleChangeFormat}>
              {format}
            </button>
          ))}
        </div>
        <ResumeViewer format={format} />
      </div>
    </BasicLayout>
  );
};

export default styled(AboutMe)`
  font-weight: bold;
  margin: 0 64px;
`;

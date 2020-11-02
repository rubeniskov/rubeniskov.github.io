/** @typedef {import("@rubeniskov/resume-parser").ResumeOutputFormat} ResumeOutputFormat*/
import styled from "styled-components";
import useResume from "../../hooks/useResume";
import ResumeViewerHtml from "./ResumeViewerHtml";

/**
 * @typedef ResumeViewerProps
 * @prop {string} resume static resource path from public directory, ei: /<filename>.(yml,json)
 * @prop {ResumeOutputFormat} [format]
 */

/**
 * Renders resume into react component
 * @param {ResumeViewerProps} props
 */
export const ResumeViewer = ({ resume = "/resume.yml", format = "json" }) => {
  const { loading, data, error } = useResume(resume /*, format*/);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  }

  let parsedData = data;
  if (format === "json" || format === "html") {
    parsedData = JSON.parse(data);
  }

  if (format === "html") {
    return <ResumeViewerHtml data={parsedData} />;
  }

  if (format === "json") {
    parsedData = JSON.stringify(parsedData, null, 4);
  }

  return (
    <pre>
      <code>{parsedData}</code>
    </pre>
  );
};

export default styled(ResumeViewer)`
  font-weight: bold;
  margin: 0 64px;
`;

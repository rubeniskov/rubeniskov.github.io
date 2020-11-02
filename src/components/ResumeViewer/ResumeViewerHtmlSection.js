import useResumeHtmlInputFilter from "./useResumeHtmlInputFilter";
import { v4 } from "uuid";

const ResumeViewerHtmlSection = ({ data, title, render = () => "" }) => {
  const [filteredData, filterOnChange] = useResumeHtmlInputFilter(data);

  if (!data || !data.length) {
    return;
  }

  return (
    <div>
      <h2>{title}</h2>
      <input type="text" onChange={filterOnChange}></input>
      <div>{filteredData.map((item) => render({ ...item, key: v4() }))}</div>
    </div>
  );
};

export default ResumeViewerHtmlSection;

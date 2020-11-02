import ResumeViewerHtmlSection from "./ResumeViewerHtmlSection";

const ResumeViewerHtmlAwards = (props) => (
  <ResumeViewerHtmlSection
    {...props}
    title="awards"
    render={({ date, name, website, description, key }) => (
      <div key={key}>
        <div>{date}</div>
        <div>{name}</div>
        <div>{website}</div>
        <div>{description}</div>
      </div>
    )}
  />
);

export default ResumeViewerHtmlAwards;

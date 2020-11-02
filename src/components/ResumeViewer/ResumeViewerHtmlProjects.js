import ResumeViewerHtmlSection from "./ResumeViewerHtmlSection";

const ResumeViewerHtmlProjects = (props) => (
  <ResumeViewerHtmlSection
    {...props}
    title="projects"
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

export default ResumeViewerHtmlProjects;

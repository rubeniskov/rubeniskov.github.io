import ResumeViewerHtmlSection from "./ResumeViewerHtmlSection";

const ResumeViewerHtmlAcademicExperience = (props) => (
  <ResumeViewerHtmlSection
    {...props}
    title="academic experience"
    render={({ dates, institution, location, type, website, key }) => (
      <div key={key}>
        <div>{dates.join(" - ")}</div>
        <div>{location}</div>
        <div>{institution}</div>
        <div>{type}</div>
        <div>{website}</div>
      </div>
    )}
  />
);

export default ResumeViewerHtmlAcademicExperience;

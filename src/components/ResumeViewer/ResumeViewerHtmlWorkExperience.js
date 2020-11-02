import ResumeViewerHtmlSection from "./ResumeViewerHtmlSection";

const ResumeViewerHtmlWorkExperience = (props) => (
  <ResumeViewerHtmlSection
    {...props}
    title="work experience"
    render={({ dates, company, location, sector, occupation, website, description, key }) => (
      <div key={key}>
        <div>{dates.join(" - ")}</div>
        <div>{company}</div>
        <div>{website}</div>
        <div>{sector}</div>
        <div>{location}</div>
        <div>{occupation}</div>
        <div>{description}</div>
      </div>
    )}
  />
);

export default ResumeViewerHtmlWorkExperience;

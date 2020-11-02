import ResumeViewerHtmlSection from "./ResumeViewerHtmlSection";

const ResumeViewerHtmlRecomendations = (props) => (
  <ResumeViewerHtmlSection
    {...props}
    title="recomendations"
    render={({ date, writer, avatar, occupation, recomendation, contact, key }) => (
      <div key={key}>
        <div>{date}</div>
        <img src={avatar} alt={`avatar - ${writer}`} />
        <div>{writer}</div>
        <div>{occupation}</div>
        <div>{contact.join(",")}</div>
        <div>{recomendation}</div>
      </div>
    )}
  />
);

export default ResumeViewerHtmlRecomendations;

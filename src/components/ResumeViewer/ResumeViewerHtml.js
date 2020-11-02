import ResumeViewerHtmlAcademicExperience from "./ResumeViewerHtmlAcademicExperience";
import ResumeViewerHtmlWorkExperience from "./ResumeViewerHtmlWorkExperience";
import ResumeViewerHtmlProjects from "./ResumeViewerHtmlProjects";
import ResumeViewerHtmlAwards from "./ResumeViewerHtmlAwards";
import ResumeViewerHtmlRecomendations from "./ResumeViewerHtmlRecomendations";
import ResumeViewerHtmlPersonalInfo from "./ResumeViewerHtmlPersonalInfo";

const ResumeViewerHtml = ({ data }) => {
  const {
    version,
    personal_info,
    academic_experience,
    work_experience,
    projects,
    awards,
    recomendations,
  } = data;

  return (
    <div>
      <small>{version}</small>
      <ResumeViewerHtmlPersonalInfo data={personal_info} />
      <ResumeViewerHtmlAcademicExperience data={academic_experience} />
      <ResumeViewerHtmlWorkExperience data={work_experience} />
      <ResumeViewerHtmlProjects data={projects} />
      <ResumeViewerHtmlAwards data={awards} />
      <ResumeViewerHtmlRecomendations data={recomendations} />
    </div>
  );
};

export default ResumeViewerHtml;

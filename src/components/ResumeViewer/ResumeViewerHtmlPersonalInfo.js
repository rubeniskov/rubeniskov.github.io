const ResumeViewerHtmlPersonalInfo = ({ data }) => {
  const {
    bio,
    nickname,
    contact,
    first_name,
    last_name,
    languages,
    nationality,
    social_network,
    website,
  } = data;

  return (
    <dl>
      <dt>{nickname}</dt>
      <dt>{nationality}</dt>
      <dt>{website}</dt>
      <dt>
        {Object.entries(contact).map(([name, value]) => (
          <span key={name}>
            {name}
            <small>{value}</small>
          </span>
        ))}
      </dt>
      <dt>
        {first_name} {last_name}
      </dt>
      <dt>{languages.join(", ")}</dt>
      <dt>
        {Object.entries(social_network).map(([name, { url }]) => (
          <span key={name}>
            {name}
            <small>{url}</small>
          </span>
        ))}
      </dt>
      <dd>{bio}</dd>
    </dl>
  );
};

export default ResumeViewerHtmlPersonalInfo;

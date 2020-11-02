import styled from "styled-components";

const BasicLayout = ({ className, children }) => {
  return (
    <article className={className}>
      <div>
        <section>{children}</section>
      </div>
    </article>
  );
};
export default styled(BasicLayout)`
  min-height: 100vh;
  margin: ${({ theme }) => `${theme.navbar.height} 0 80px 0`};
  padding-top: 40px;
  & > div {
    display: flex;
    justify-content: center;
    & > section {
      max-width: 50rem;
      width: 100%;
      padding: 0 1rem;
    }
  }
`;

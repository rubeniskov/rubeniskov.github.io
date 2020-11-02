import BasicLayout from "../layouts/Basic";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import Link from "./Link";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme || {};
};

const ThemeTable = styled(({ children, className }) => {
  return (
    <div className={className}>
      {children.map(([desc, children], idx) => (
        <div key={idx} className="row">
          <div className="cell cell_label">
            <span className="label">{desc}</span>
          </div>
          <div className="cell cell_children">{children}</div>
        </div>
      ))}
    </div>
  );
})`
  display: table;
  width: 100%;

  & .row {
    display: table-row;
  }
  & .cell {
    width: 1px;
    white-space: nowrap;
    display: table-cell;
    &.cell_label {
      text-align: right;
      padding: 0.3em 1.231em 0.3em 0;
      & .label {
        font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
        color: #7987a0;
        font-size: 0.85rem;
      }
    }
    &.cell_value {
      padding-right: 0;
    }
  }
`;

const ThemePreview = ({ className }) => {
  const theme = useTheme();
  const total = 6;
  return (
    <BasicLayout>
      <div className={className}>
        <div>
          <header>Headers</header>
          <div className="table">
            <ThemeTable>
              {new Array(total).fill().map((_, idx) => {
                const baseline = theme.font.baseline;
                const header = idx + 1;
                const props = theme.mixins.headerProps(header);
                const size = parseFloat(props["font-size"]);
                const spacing = parseFloat(props["letter-spacing"]);
                const lineHeight = parseFloat(props["line-height"]);
                const C = `h${header}`;
                return [
                  `${header} header/${props["font-size"]}/${size * baseline}px/${
                    lineHeight * size * baseline
                  }lh/${spacing * 100}%`,
                  <C key={C}>A Visual Type Scale</C>,
                ];
              })}
            </ThemeTable>
          </div>
        </div>
        <div>
          <header>Links</header>
          <ThemeTable>
            {["small", "medium", "large"].map((size) => {
              return [size, <Link key={size} size={size} to="/theme">{`Lorem ipsum link`}</Link>];
            })}
          </ThemeTable>
        </div>
        <div>
          <header>Text</header>
          <p>{lorem}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: lorem
                .split(/\s/)
                .map((v) => (Math.random() < 0.1 ? `<b>${v}</b>` : v))
                .join(" "),
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: lorem
                .split(/\s/)
                .map((v) => (Math.random() < 0.1 ? `<i>${v}</i>` : v))
                .join(" "),
            }}
          ></p>
          <blockquote>{lorem}</blockquote>
        </div>
      </div>
    </BasicLayout>
  );
};

export default styled(ThemePreview)`
  & header {
    display: block;
    ${({ theme }) => theme.mixins.headerProps(2)}
  }
`;

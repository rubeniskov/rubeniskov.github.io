import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Link = ({ className, children, component: Component = RouterLink, ...restProps }) => (
  <Component className={className} {...restProps}>
    {children}
  </Component>
);

export default styled(Link)`
  ${({ size, theme }) => theme.mixins.fontProps(size, true)}
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  &:hover {
    opacity: 0.5;
  }
  &:visited {
    color: initial;
  }
`;

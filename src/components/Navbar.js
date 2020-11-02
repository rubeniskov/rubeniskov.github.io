import { useState, useCallback } from "react";
import styled from "styled-components";
import clsx from "clsx";
import Link from "./Link";
import useScrollPosition from "../hooks/useScrollPosition";
import useTheme from "../hooks/useTheme";

const Navbar = ({ className, logo, children }) => {
  const [hover, setHover] = useState(false);
  const [compact, setCompact] = useState(false);
  const [tracker, setTracker] = useState(0);
  const { navbar: { height } = {} } = useTheme();

  const handleScroll = useCallback(
    ({ previous, current }) => {
      if (previous.y !== current.y) {
        setCompact(previous.y > current.y);
        setHover(current.y < -parseInt(height));
      }

      setTracker(
        Math.ceil(
          100 * Math.abs(previous.y / (window.document.body.scrollHeight - window.innerHeight))
        )
      );
    },
    [height]
  );

  useScrollPosition(handleScroll, {
    wait: 600,
  });

  return (
    <header
      className={clsx(className, {
        compact,
        hover,
      })}
    >
      <div className="inner">
        <div className="logo">
          <Link to="/">{logo}</Link>
        </div>
        <div className="navbar">{children}</div>
      </div>
      <div className="tracker" style={{ width: `${tracker}%` }} />
    </header>
  );
};

export default styled(Navbar)`
  top: 0;
  z-index: 1;
  position: fixed;
  width: 100%;
  & .tracker {
    height: 2px;
    background-color: #efefef;
    transition: ${({ theme }) => theme.mixins.transition("width")};
    position: absolute;
    z-index: 1;
    bottom: 0;
  }
  & .inner {
    transition: ${({ theme }) => theme.mixins.transition("height")};
    align-items: center;
    margin: 0 64px;
    height: ${({ theme }) => theme.navbar.height};
    overflow: hidden;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    & .logo {
      /* fle */
    }
    & .navbar {
      & > * {
        margin: 10px;
      }
    }
  }

  & {
    background-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    transition: ${({ theme }) =>
      theme.mixins.transition(["background-color", "border-color"], "600ms")};
    &.hover {
      background-color: rgb(255, 255, 255);
      border-bottom-color: rgba(0, 0, 0, 0.08);
    }
  }

  &.compact {
    & .inner {
      height: ${({ theme }) => `${parseInt(theme.navbar.height) * 0.5}px`};
    }
  }
`;

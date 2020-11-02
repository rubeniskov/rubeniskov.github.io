import { ThemeProvider } from "styled-components";

// https://en.wikipedia.org/wiki/Golden_ratio
const PHI = 1.618033988749895;
// https://type-scale.com/
const fontSizes = (scaleRatio, top = 5, down = 1) => {
  let a, b, r, i;
  let s = [];

  for (i = 0, r = a = 1, b = scaleRatio; i <= down; i++) {
    s.unshift(Math.round(r * 1000) / 1000);
    r = a / b;
    a = r;
  }

  for (i = 0, r = a = 1, b = scaleRatio; i < top; i++) {
    s.push(Math.round(r * 1000) / 1000);
    r = a * b;
    a = r;
  }
  return s.filter((value, index, self) => self.indexOf(value) === index);
};

const baseline = 16;

const mapSize = (map, size) => `${map[size || "medium"]}`;
const getSize = (map, sizes, size) =>
  `${sizes[typeof size === "number" ? size : mapSize(map, size)]}`;

const createFormatProps = (fn) => (...args) => {
  const props = fn(...args);
  return args[args.length - 1] === true
    ? Object.entries(props)
        .map((v) => v.join(":"))
        .map((v) => `${v};`)
        .join("")
    : props;
};

const theme = {
  mode: "light",
  navbar: {
    height: "80px",
  },
  font: {
    baseline,
    family: "'Merriweather', Georgia, Cambria, 'Times New Roman', Times, serif",
    sizes: [14, 16, 18, 24, 32, 48, 72].map((size) => size / baseline),
    spacings: [2, 2, 4, 0, 0, -1, -2].map((factor) => factor / 100),
    lineHeight: 1.5,
    maps: {
      small: 0,
      medium: 1,
      large: 2,
    },
  },
  mixins: {
    fontSize: (size, unit = "rem") => `${getSize(theme.font.maps, theme.font.sizes, size)}${unit}`,
    letterSpacing: (size, unit = "rem") =>
      `${getSize(theme.font.maps, theme.font.spacings, size)}${unit}`,
    fontProps: createFormatProps((size, unit) => {
      unit = typeof unit === "boolean" ? undefined : unit;
      return {
        "font-family": "'Montserrat', sans-serif",
        "font-size": theme.mixins.fontSize(size, unit),
        "letter-spacing": theme.mixins.letterSpacing(size, unit),
        "line-height": "1.5",
      };
    }),
    transition: (props, time = "300ms", ease = "ease-in-out") =>
      (Array.isArray(props) ? props : [props]).map((prop) => `${prop} ${time} ${ease}`).join(",") +
      ";",
    headerProps: (n, unit, format) =>
      theme.mixins.fontProps(theme.font.sizes.length - n, unit, format),
    headers: (unit) =>
      theme.font.sizes.slice(theme.font.sizes.length - 6).map(
        (_, idx) => `h${idx + 1} {
          ${theme.mixins.headerProps(idx + 1, unit, true)}
        }`
      ),
  },
};

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;

// import theme from 'styled-theming'

// import logo from './logo.svg';
// import "./App.css";

// const boxBackgroundColor = theme('mode', {
//   light: '#fff',
//   dark: '#000',
// })

// const Box = styled.div`
//   background-color: ${boxBackgroundColor};
// `

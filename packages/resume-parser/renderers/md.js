import through from "through2";

const mdRenderer = () => {
  return through.obj();
};

export default mdRenderer;

// https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/barycentric-coordinates

/**
 * @typedef Geometry
 * @prop {Number[][3]} positions
 * @prop {Number[][3]} cells
 */

/**
 * @typedef Options
 * @prop {boolean} [edge] Shows diagonal edge - *incompatible with compact*
 * @prop {boolean} [compact] Uses a vec2 instead of vec3 array for barycentric representation
 */

/**
 * Appends the barycenric coordinates of a given geometry
 * @param {Geometry} geometry
 * @param {Options} options
 */
const glBarycentric = (geometry, options) => {
  const { edge, compact } = { ...options };
  const attrsKeys = Object.keys(geometry).filter((ak) => !/(cells|positions)/.test(ak));
  const attrs = attrsKeys.reduce((prev, key) => ({ ...prev, [key]: [] }), {
    positions: [],
    barycentric: [],
    cells: [],
  });

  const pts = geometry.positions;

  for (let c = 0, i = 0; i < geometry.cells.length; i++) {
    const cell = geometry.cells[i];
    if (cell.length === 3) {
      attrs.positions.push(pts[cell[0]], pts[cell[1]], pts[cell[2]]);
      if (compact) {
        attrs.barycentric.push([0, 0], [1, 0], [0, 1]);
      } else {
        attrs.barycentric.push([1 - edge, 0, 1], [0, 1, 0], [1, 0, 0]);
      }

      attrs.cells.push([c++, c++, c++]);
      for (let j = 0; j < attrsKeys.length; j++) {
        const name = attrsKeys[j];
        attrs[name].push(geometry[name][cell[0]], geometry[name][cell[1]], geometry[name][cell[2]]);
      }
    }
  }

  return attrs;
};
export default glBarycentric;

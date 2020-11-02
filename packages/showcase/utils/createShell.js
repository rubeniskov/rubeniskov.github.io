// @ts-check
import raf from "raf-component";

/**
 * Executed each time the render is called
 * @typedef {(time: Number) => void} RenderCallback
 */

/**
 * Executed once at initialization stage
 * @typedef {(gl: WebGLRenderingContext) => RenderCallback} SetupCallback
 */

/**
 * @typedef {Object} ShellOptions
 * @prop {boolean} [init] Attach the renderer by default
 */

/**
 * @typedef {Object} Shell
 * @prop {Function} attach
 * @prop {Function} detach
 * @prop {Function} dispose
 * @prop {(renderable: Renderable) => Function} add
 */

/**
 * Executed once at initialization stage
 * @typedef {(gl: WebGLRenderingContext) => Shell} ShellSetupCallback
 */

/**
 * @typedef {Object} Renderable
 * @prop {RenderCallback} draw
 * @prop {Function} [dispose]
 */

/**
 * Creates a webgl shell for managin gl-objects
 *
 * @param {ShellOptions} options
 * @returns {ShellSetupCallback}
 */
const createShell = ({ init = true } = {}) => {
  // const maxEpochTime = (Math.pow(2, 31) - 1) * 1000;
  const startTime = new Date().getTime();
  /** @type {Renderable[]} */
  const renders = [];

  const getTime = () => new Date().getTime() - startTime;
  /** @type {RenderCallback} */
  const render = (time) => {
    const len = renders.length;
    for (let i = 0; i < len; i += 1) {
      renders[i].draw(time);
    }
  };

  const dispose = () => {
    const len = renders.length;
    for (let i = 0; i < len; i += 1) {
      if (renders[i].dispose) renders[i].dispose();
    }
  };

  /**
   * Initialize shell passing webgl context
   * @returns {Shell}
   */
  const setup = () => {
    /** @type {Number} */
    let rafTick;

    /**
     * Request animation frame recursive loop
     */
    const tick = () => {
      render(getTime());
      rafTick = raf(tick);
    };

    /**
     * Enable the render cycle
     */
    const attach = () => {
      tick();
    };

    /**
     * Disable the render cycle
     */
    const detach = () => {
      raf.cancel(rafTick);
    };

    /**
     * Adds renderable object to shell
     * @param {Renderable} renderable
     */
    const add = (renderable) => {
      const index = renders.push(renderable);
      return () => {
        renders.splice(index, 1);
      };
    };

    if (init) {
      attach();
    }

    return {
      attach,
      detach,
      add,
      dispose,
    };
  };

  return setup;
};

export default createShell;

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import shim from "rollup-plugin-shim";
import nodeGlobals from "rollup-plugin-node-globals";

export default {
  input: "lib/jasmine.js",
  output: {
    file: "bundle.js",
    format: "umd",
    name: "Jasmine"
  },
  plugins: [
    resolve(),
    commonjs(),
    nodeGlobals(),
    shim({
      fs: `
        export function readdirSync() { return []; }
      `,
      path: `
        export function join() { return [].slice.call(arguments).join("/") }
      `
    })
  ]
};

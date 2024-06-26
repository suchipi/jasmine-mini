/* eslint-disable import/namespace, import/default, import/no-named-as-default */
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "bundle.js",
    format: "umd",
    name: "Jasmine",
  },
  plugins: [resolve(), commonjs()],
};

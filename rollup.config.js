import { terser } from "rollup-plugin-terser";
import settings from "./package.json";

export default [{
  input: 'lib/main.js',
  output: {
    file: `dist/${settings.name}.js`,
    format: 'iife'
  },
  plugins: []
}, {
  input: 'lib/main.js',
  output: {
    file: `dist/${settings.name}.min.js`,
    format: 'iife'
  },
  plugins: [terser()]
}];

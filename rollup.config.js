const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const { uglify } = require('rollup-plugin-uglify');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  input: 'src/index.js',
  output: {
    file: './build/bundle.js',
    format: 'cjs'
  },
  external: ['react'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    resolve({
      module: true,
      main: true,
      browser: true,
      jsnext: true,
      preferBuiltins: true
    }),
    commonjs({
      include: "node_modules/**"
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};

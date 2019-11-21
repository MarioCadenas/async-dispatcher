const path = require('path');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const { terser } = require('rollup-plugin-terser');
const pkg = require('./package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      name: 'async-dispatcher',
      file: pkg.browser,
      format: 'umd'
    }
  ],
  external: ['react'],
  plugins: [
    alias({
      '@': path.join(process.cwd(), './src'),
      resolve: ['.js', '/index.ts']
    }),
    typescript({ lib: ['es5', 'es6', 'dom'], target: 'es5' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel(),
    terser()
  ]
};

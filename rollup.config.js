import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { uglify } from "rollup-plugin-uglify"

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'pro-event-bus/index.js',
      format: 'umd',
      name: 'ProEventBus'
    },
    {
      file: 'pro-event-bus/index-web.js',
      format: 'iife',
      name: 'ProEventBus'
    },
    {
      file: 'pro-event-bus/index-cjs.js',
      format: 'cjs'
    },
    {
      file: 'pro-event-bus/index.js',
      format: 'amd'
    },
    {
      file: 'pro-event-bus/index-es.js',
      format: 'esm'
    },
  ],
  plugins: [
    resolve(),
    babel(
      {
        exclude: '**/node_modules/**',
        babelHelpers: 'bundled'
      }
    ),
    uglify()
  ]
}

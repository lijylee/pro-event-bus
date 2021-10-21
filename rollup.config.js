import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'pro-event-bus/index.js',
    format: 'umd',
    name: 'ProEventBus'
  },
  plugins: [
    resolve(),
    babel(
      {
        exclude: '**/node_modules/**',
        babelHelpers: 'bundled'
      }
    )
  ]
}

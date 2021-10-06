import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/pro-event-bus.js',
    format: 'umd',
    name: 'proEventBus'
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

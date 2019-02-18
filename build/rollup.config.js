import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import commonjs from 'rollup-plugin-commonjs'

const config = {
  input: 'src/vue-observer-directive.js',
  plugins: [
    babel({
      ...babelrc({
        addExternalHelpersPlugin: false
      }),
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}

export default [
  {
    ...config,
    output: {
      format: 'cjs',  // CommonJS
      file: 'dist/vue-observer-directive.cjs.js'
    }
  },
  {
    ...config,
    output: {
      format: 'esm',  // ES6 module
      file: 'dist/vue-observer-directive.esm.js'
    }
  },
  {
    ...config,
    output: {
      format: 'iife', // <script>引用
      file: 'dist/vue-observer-directive.iife.js',
      name: 'vueObserverDirective'
    }
  }
]
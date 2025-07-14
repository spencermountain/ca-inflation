import commonjs from 'rollup-plugin-commonjs'
import terser from '@rollup/plugin-terser';
import resolve from 'rollup-plugin-node-resolve'
import fs from 'fs'

let pkg = JSON.parse(fs.readFileSync('./package.json').toString())
let version = pkg.version
console.log('\n 📦  - running rollup..\n')

const banner = '/* spencermountain/ca-inflation ' + version + ' MIT */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/ca-inflation.mjs', format: 'esm' }],
    plugins: [resolve(), terser()]
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner: banner,
        file: 'builds/ca-inflation.cjs',
        format: 'umd',
        sourcemap: false,
        name: 'ca-inflation'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
    ]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/ca-inflation.min.js', format: 'umd', name: 'ca-inflation' }],
    plugins: [
      resolve(),
      commonjs(),
      terser(),
    ]
  }
]

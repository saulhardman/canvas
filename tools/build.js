/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');
const camelCase = require('camel-case');

const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel
[
  { format: 'es' },
  { format: 'cjs' },
  { format: 'umd' },
  { format: 'umd', minify: true },
].forEach(({ format, minify = false }) => {
  promise = promise.then(() => rollup.rollup({
    entry: 'src/index.js',
    external: Object.keys(pkg.dependencies),
    plugins: [
      replace({
        ENV: JSON.stringify('production'),
      }),
      babel(Object.assign(pkg.babel, {
        babelrc: false,
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        presets: pkg.babel.presets.map((x) => {
          if (x === 'latest') {
            return ['latest', { es2015: { modules: false } }];
          }

          return x;
        }),
      })),
      (minify && uglify()),
      (minify && resolve()),
    ],
  }).then((bundle) => bundle.write({
    dest: `dist/${format === 'cjs' ? 'index' : `index.${format}`}${minify ? '.min' : ''}.js`,
    format,
    sourceMap: true,
    moduleName: format === 'umd' ? camelCase(pkg.name) : undefined,
  })));
});

// Copy package.json
promise = promise.then(() => {
  delete pkg.babel;
  delete pkg.devDependencies;
  delete pkg.private;
  delete pkg.scripts;

  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
});

promise.catch((err) => console.error(err.stack)); // eslint-disable-line no-console

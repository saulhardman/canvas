const fs = require('fs');
const del = require('del');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const json = require('rollup-plugin-json');
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
  promise = promise.then(() => rollup({
    entry: 'src/index.js',
    external: (minify) ? [] : Object.keys(pkg.dependencies),
    plugins: [
      json({
        exclude: 'node_modules/**',
        preferConst: true,
      }),
      replace({
        ENV: JSON.stringify('production'),
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
      (minify && resolve()),
      (minify && uglify()),
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
  delete pkg.devDependencies;
  delete pkg.private;
  delete pkg.scripts;

  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
});

promise.catch((err) => console.error(err.stack)); // eslint-disable-line no-console

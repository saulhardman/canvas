if (ENV === 'development') {
  require('./index.html'); // eslint-disable-line global-require
}

export { default as canvas } from './canvas';
export { default as events } from './events';
export { default as vector } from './vector';
export { default as pointer } from './pointer';

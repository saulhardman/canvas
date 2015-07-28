export default {
  resize: {
    handler: 'onResize',
    element: window,
  },
  visibilitychange: {
    handler: 'onVisibilityChange',
    element: document,
  },
  keydown: {
    handler: 'onKeyDown',
    element: document,
  },
  keyup: {
    handler: 'onKeyUp',
    element: document,
  },
  mouseover: {
    handler: 'onMouseOver',
  },
  mousemove: {
    handler: 'onMouseMove',
  },
  mouseout: {
    handler: 'onMouseOut',
  },
  mousedown: {
    handler: 'onMouseDown',
  },
  mouseup: {
    handler: 'onMouseUp',
  },
  // TODO: support touch events
  // touchstart: {
  //   handler: 'onTouchStart',
  // },
  // touchmove: {
  //   handler: 'onTouchStart',
  // },
  // touchend: {
  //   handler: 'onTouchEnd',
  // },
};

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash-es/assign'), require('lodash-es/isFunction'), require('lodash-es/isNumber')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash-es/assign', 'lodash-es/isFunction', 'lodash-es/isNumber'], factory) :
  (factory((global.canvas = global.canvas || {}),global.assign,global.isFunction,global.isNumber));
}(this, (function (exports,assign,isFunction,isNumber) { 'use strict';

assign = 'default' in assign ? assign['default'] : assign;
isFunction = 'default' in isFunction ? isFunction['default'] : isFunction;
isNumber = 'default' in isNumber ? isNumber['default'] : isNumber;

var events = {
  resize: {
    handler: 'onResize',
    element: window
  },
  visibilitychange: {
    handler: 'onVisibilityChange',
    element: document
  },
  keydown: {
    handler: 'onKeyDown',
    element: document
  },
  keyup: {
    handler: 'onKeyUp',
    element: document
  },
  mouseover: {
    handler: 'onMouseOver'
  },
  mousemove: {
    handler: 'onMouseMove'
  },
  mouseout: {
    handler: 'onMouseOut'
  },
  mousedown: {
    handler: 'onMouseDown'
  },
  mouseup: {
    handler: 'onMouseUp'
  }
};

var vector = {
  set: function set(x, y) {
    this.x = x;
    this.y = y;

    return this;
  },
  get: function get() {
    return Object.create(vector).set(this.x, this.y);
  },
  clear: function clear() {
    delete this.x;
    delete this.y;

    return this;
  },
  add: function add(_ref) {
    var x = _ref.x,
        y = _ref.y;

    this.x += x;

    this.y += y;

    this.checkLimitation();

    return this;
  },
  subtract: function subtract(_ref2) {
    var x = _ref2.x,
        y = _ref2.y;

    this.x -= x;

    this.y -= y;

    this.checkLimitation();

    return this;
  },
  multiply: function multiply(multiplier, check) {
    if (isNumber(multiplier)) {
      this.x *= multiplier;

      this.y *= multiplier;
    }

    // TODO: handle case of multiplier being a vector

    if (check !== false) {
      this.checkLimitation();
    }

    return this;
  },
  divide: function divide(divisor, check) {
    if (isNumber(divisor)) {
      this.x /= divisor;

      this.y /= divisor;
    }

    // TODO: handle case of divisor being a vector

    if (check !== false) {
      this.checkLimitation();
    }

    return this;
  },
  magnitude: function magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  limit: function limit(limitation) {
    this.limitation = limitation;

    this.checkLimitation();

    return this;
  },
  checkLimitation: function checkLimitation() {
    if (isNumber(this.limitation)) {
      var magnitude = this.magnitude();

      if (magnitude > this.limitation) {
        this.divide(magnitude, false).multiply(this.limitation, false);
      }
    }

    return this;
  },
  normalize: function normalize() {
    var magnitude = this.magnitude();

    if (magnitude !== 0) {
      return this.divide(this.magnitude());
    }

    return this;
  },
  toJSON: function toJSON() {
    return {
      x: this.x,
      y: this.y
    };
  }
};

var pointer = assign(Object.create(vector), {
  isDragging: false,
  origin: Object.create(vector),
  delta: Object.create(vector),
  startDragging: function startDragging(x, y) {
    this.isDragging = true;

    this.origin.set(x, y);
    this.delta.set(0, 0);

    return this;
  },
  stopDragging: function stopDragging() {
    this.isDragging = false;

    this.origin.clear();
    this.delta.clear();

    return this;
  },
  set: function set(x, y) {
    vector.set.call(this, x, y);

    if (this.isDragging) {
      var delta = this.get().subtract(this.origin);

      this.delta.set(delta.x, delta.y);
    }

    return this;
  }
});

var DEFAULT_OPTIONS = {
  autoStart: true,
  autoClear: true,
  autoPause: true,
  requestAnimationFrame: true,
  allowFullscreen: true,
  fillScreen: true,
  supportRetina: true,
  backgroundColor: 'rgb(20, 20, 20)',
  addClasses: true
};
var PLAYING_STATE_CLASS = 'is-playing';
var PAUSED_STATE_CLASS = 'is-paused';

var canvas = {
  init: function init(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = element.width,
        height = element.height;


    this.element = element;
    this.settings = assign({}, DEFAULT_OPTIONS, options);
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.isRetina = this.devicePixelRatio > 1;
    this.isPlaying = false;
    this.isPaused = false;
    this.context = element.getContext('2d', this.settings.contextAttributes);
    this.pointer = Object.create(pointer);

    this.setSize({ width: width, height: height });

    if (this.settings.fillScreen) {
      this.fillScreen();
    }

    this.setup();

    if (this.settings.autoStart) {
      this.start();
    }

    return this;
  },
  setup: function setup() {
    return this;
  },
  start: function start() {
    this.isPlaying = true;

    this.startTime = Date.now();

    this.time = 0;

    this.element.classList.add(PLAYING_STATE_CLASS);

    this.bindEvents();

    if (this.isPaused) {
      return this;
    }

    return this.loop();
  },
  pause: function pause() {
    this.isPaused = true;

    this.element.classList.add(PAUSED_STATE_CLASS);

    this.clearAnimationFrame();

    return this;
  },
  play: function play() {
    this.isPaused = false;

    this.element.classList.remove(PAUSED_STATE_CLASS);

    return this.loop();
  },
  stop: function stop() {
    this.isPlaying = false;
    this.isPaused = false;

    var classList = this.element.classList;

    classList.remove(PLAYING_STATE_CLASS);
    classList.remove(PAUSED_STATE_CLASS);

    this.clearAnimationFrame();

    return this.unBindEvents();
  },
  destroy: function destroy() {
    if (this.isPlaying) {
      this.stop();
    }

    this.remove();

    delete this.element;

    return this;
  },
  remove: function remove() {
    this.element.parentNode.removeChild(this.element);

    return this;
  },
  bindEvents: function bindEvents() {
    var _this = this;

    Object.keys(events).forEach(function (name) {
      var element = events[name].element;


      (element || _this.element).addEventListener(name, _this, false);
    });

    return this;
  },
  unBindEvents: function unBindEvents() {
    var _this2 = this;

    Object.keys(events).forEach(function (name) {
      var element = events[name].element;


      (element || _this2.element).removeEventListener(name, _this2, false);
    });

    return this;
  },
  loop: function loop() {
    var now = Date.now();

    this.time = now - this.startTime;

    if (this.settings.requestAnimationFrame) {
      this.animationFrame = requestAnimationFrame(this.loop.bind(this));
    }

    // NOTE: frameRate === 0, false, undefined, null
    if (!this.settings.frameRate) {
      return this.run();
    }

    if (!this.previousNow || now - this.previousNow >= 1000 / this.settings.frameRate) {
      this.previousNow = now;

      return this.run();
    }

    return this;
  },
  run: function run() {
    this.update();

    if (this.settings.supportRetina && this.isRetina) {
      this.context.save();

      this.context.scale(this.devicePixelRatio, this.devicePixelRatio);
    }

    if (this.settings.autoClear) {
      this.clear();
    }

    this.draw();

    if (this.settings.supportRetina && this.isRetina) {
      this.context.restore();
    }

    return this;
  },
  clearAnimationFrame: function clearAnimationFrame() {
    cancelAnimationFrame(this.animationFrame);

    this.previousNow = null;

    return this;
  },
  update: function update() {
    return this;
  },
  draw: function draw() {
    return this;
  },
  clear: function clear() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.fillStyle = this.settings.backgroundColor;

    this.context.fillRect(0, 0, this.width, this.height);

    return this;
  },
  handleEvent: function handleEvent(event) {
    var type = event.type;

    // NOTE: only allow visibilitychange and resize events whilst paused

    if (this.isPaused && type !== 'visibilitychange' && type !== 'resize') {
      return this;
    }

    if (isFunction(this[type])) {
      this[type](event);
    }

    var handler = events[type].handler;

    if (isFunction(this[handler])) {
      this[handler](event);
    }

    return this;
  },
  mousedown: function mousedown(_ref) {
    var pageX = _ref.pageX,
        pageY = _ref.pageY;

    this.pointer.startDragging(pageX, pageY);

    return this;
  },
  mousemove: function mousemove(_ref2) {
    var pageX = _ref2.pageX,
        pageY = _ref2.pageY;

    this.pointer.set(pageX, pageY);

    return this;
  },
  mouseup: function mouseup(_ref3) {
    var pageX = _ref3.pageX,
        pageY = _ref3.pageY;

    this.pointer.stopDragging(pageX, pageY);

    return this;
  },
  visibilitychange: function visibilitychange() {
    if (!this.settings.autoPause) {
      return this;
    }

    if (document.visibilityState === 'visible') {
      return this.play();
    }

    return this.pause();
  },
  resize: function resize() {
    if (this.settings.fillScreen) {
      this.fillScreen().setElementSize();
    }

    return this;
  },
  setSize: function setSize(_ref4) {
    var _ref4$width = _ref4.width,
        width = _ref4$width === undefined ? this.width : _ref4$width,
        _ref4$height = _ref4.height,
        height = _ref4$height === undefined ? this.height : _ref4$height;

    this.width = this.element.width = width;
    this.height = this.element.height = height;

    return this.setElementSize();
  },
  setElementSize: function setElementSize() {
    if (!this.isRetina || !this.settings.supportRetina) {
      return this;
    }

    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';

    this.element.width = this.width * this.devicePixelRatio;
    this.element.height = this.height * this.devicePixelRatio;

    return this;
  },
  fillScreen: function fillScreen() {
    this.setWidth(window.innerWidth).setHeight(window.innerHeight);

    return this;
  }
};

exports.canvas = canvas;
exports.events = events;
exports.vector = vector;
exports.pointer = pointer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map

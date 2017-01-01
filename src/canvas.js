import assign from 'lodash/object/assign';
import create from 'lodash/object/create';
import forEach from 'lodash/collection/forEach';
import isFunction from 'lodash/lang/isFunction';

import events from './events';
import pointer from './pointer';

var canvas = {
  defaults: {
    autoStart: true,
    autoClear: true,
    autoPause: true,
    requestAnimationFrame: true,
    allowFullscreen: true,
    fillScreen: true,
    supportRetina: true,
    backgroundColor: 'rgb(20, 20, 20)',
    addClasses: true,
  },
  init(element, options = {}) {
    this.element = element;
    this.settings = assign(this.defaults, options);
    this.ratio = window.devicePixelRatio || 1;
    this.isRetina = this.ratio > 1;
    this.isPaused = false;
    this.isRunning = false;
    this.context = this.element.getContext('2d', this.settings.contextAttributes);
    this.pointer = create(pointer);
    this.width = this.element.width;
    this.height = this.element.height;

    this.setElementDimensions();

    this.element.classList.add('canvas');

    if (this.settings.fillScreen) {
      this.fillScreen();
    }

    if (this.settings.supportRetina) {
      this.retinafy();
    }

    this.setup();

    if (this.settings.autoStart) {
      this.start();
    }

    return this;
  },
  setup() {
    return this;
  },
  start() {
    this.isRunning = true;

    this.startTime = Date.now();

    this.time = 0;

    this.element.classList.add('canvas--is-running');

    this.bindEvents();

    if (this.isPaused) {
      return this;
    }

    return this.loop();
  },
  pause() {
    this.isPaused = true;

    this.element.classList.add('canvas--is-paused');

    this.clearAnimationFrame();

    return this;
  },
  unPause() {
    this.isPaused = false;

    this.element.classList.remove('canvas--is-paused');

    this.loop();

    return this;
  },
  stop() {
    var classList;

    this.isRunning = false;
    this.isPaused = false;

    classList = this.element.classList;

    classList.remove('canvas--is-running');
    classList.remove('canvas--is-paused');

    this.clearAnimationFrame();

    return this.unBindEvents();
  },
  destroy() {
    if (this.isRunning) {
      this.stop();
    }

    this.remove();

    delete this.element;

    return this;
  },
  remove() {
    this.element.parentNode.removeChild(this.element);

    return this;
  },
  setElementDimensions() {
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    return this;
  },
  bindEvents() {
    // NOTE: pass all events to handleEvent (special) function
    forEach(events, ({ element }, name) => {
      (element || this.element).addEventListener(name, this, false);
    });

    return this;
  },
  unBindEvents() {
    forEach(events, ({ element }, name) => {
      (element || this.element).removeEventListener(name, this, false);
    });

    return this;
  },
  loop() {
    var now = Date.now();

    this.time = now - this.startTime;

    if (this.settings.requestAnimationFrame) {
      this.animationFrame = requestAnimationFrame(this.loop.bind(this));
    }

    // NOTE: frameRate === 0, false, undefined
    if (!this.settings.frameRate) {
      return this.run();
    }

    if (!this.previousNow || now - this.previousNow >= 1000 / this.settings.frameRate) {
      this.previousNow = now;

      return this.run();
    }

    return this;
  },
  run() {
    this.update();

    if (this.settings.supportRetina && this.isRetina) {
      this.context.save();

      this.context.scale(this.ratio, this.ratio);
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
  clearAnimationFrame() {
    cancelAnimationFrame(this.animationFrame);

    this.previousNow = null;

    return this;
  },
  update() {
    return this;
  },
  draw() {
    return this;
  },
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.fillStyle = this.settings.backgroundColor;

    this.context.fillRect(0, 0, this.width, this.height);

    return this;
  },
  handleEvent(event) {
    var type = event.type;
    var handler;

    // NOTE: only allow visibilitychange and resize events whilst paused
    if (this.isPaused &&
        type !== 'visibilitychange' &&
        type !== 'resize') {
      return this;
    }

    if (isFunction(this[type])) {
      this[type](event);
    }

    handler = events[event.type].handler;

    if (isFunction(this[handler])) {
      this[handler](event);
    }

    return this;
  },
  mousedown({ pageX, pageY }) {
    this.pointer.startDragging(pageX, pageY);

    return this;
  },
  mousemove({ pageX, pageY }) {
    this.pointer.set(pageX, pageY);

    return this;
  },
  mouseup({ pageX, pageY }) {
    this.pointer.stopDragging(pageX, pageY);

    return this;
  },
  visibilitychange() {
    if (!this.settings.autoPause) {
      return this;
    }

    if (document.visibilityState === 'visible') {
      return this.unPause();
    }

    return this.pause();
  },
  resize() {
    if (this.settings.fillScreen) {
      this.fillScreen();

      if (this.settings.supportRetina) {
        this.retinafy();
      }
    }

    return this;
  },
  fillScreen() {
    this.width = this.element.width = window.innerWidth;
    this.height = this.element.height = window.innerHeight;

    this.setElementDimensions();

    return this;
  },
  retinafy() {
    if (!this.isRetina) {
      return this;
    }

    this.element.width *= this.ratio;
    this.element.height *= this.ratio;

    return this;
  },
};


export default canvas;

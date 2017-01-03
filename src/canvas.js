import assign from 'lodash-es/assign';
import isFunction from 'lodash-es/isFunction';

import events from './events';
import pointer from './pointer';

const DEFAULT_OPTIONS = {
  autoStart: true,
  autoClear: true,
  autoPause: true,
  requestAnimationFrame: true,
  allowFullscreen: true,
  fillScreen: true,
  supportRetina: true,
  backgroundColor: 'rgb(20, 20, 20)',
  addClasses: true,
};
const PLAYING_STATE_CLASS = 'is-playing';
const PAUSED_STATE_CLASS = 'is-paused';

const canvas = {
  init(element, options = {}) {
    const { width, height } = element;

    this.element = element;
    this.settings = assign({}, DEFAULT_OPTIONS, options);
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.isRetina = this.devicePixelRatio > 1;
    this.isPlaying = false;
    this.isPaused = false;
    this.context = element.getContext('2d', this.settings.contextAttributes);
    this.pointer = Object.create(pointer);

    this.setSize({ width, height });

    if (this.settings.fillScreen) {
      this.fillScreen();
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
  pause() {
    this.isPaused = true;

    this.element.classList.add(PAUSED_STATE_CLASS);

    this.clearAnimationFrame();

    return this;
  },
  play() {
    this.isPaused = false;

    this.element.classList.remove(PAUSED_STATE_CLASS);

    return this.loop();
  },
  stop() {
    this.isPlaying = false;
    this.isPaused = false;

    const classList = this.element.classList;

    classList.remove(PLAYING_STATE_CLASS);
    classList.remove(PAUSED_STATE_CLASS);

    this.clearAnimationFrame();

    return this.unBindEvents();
  },
  destroy() {
    if (this.isPlaying) {
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
  bindEvents() {
    Object.keys(events).forEach((name) => {
      const { element } = events[name];

      (element || this.element).addEventListener(name, this, false);
    });

    return this;
  },
  unBindEvents() {
    Object.keys(events).forEach((name) => {
      const { element } = events[name];

      (element || this.element).removeEventListener(name, this, false);
    });

    return this;
  },
  loop() {
    const now = Date.now();

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
  run() {
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
    const { type } = event;

    // NOTE: only allow visibilitychange and resize events whilst paused
    if (this.isPaused &&
        type !== 'visibilitychange' &&
        type !== 'resize') {
      return this;
    }

    if (isFunction(this[type])) {
      this[type](event);
    }

    const handler = events[type].handler;

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
      return this.play();
    }

    return this.pause();
  },
  resize() {
    if (this.settings.fillScreen) {
      this.fillScreen()
          .setElementSize();
    }

    return this;
  },
  setSize({ width = this.width, height = this.height }) {
    this.width = this.element.width = width;
    this.height = this.element.height = height;

    return this.setElementSize();
  },
  setElementSize() {
    if (!this.isRetina || !this.settings.supportRetina) {
      return this;
    }

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.element.width = this.width * this.devicePixelRatio;
    this.element.height = this.height * this.devicePixelRatio;

    return this;
  },
  fillScreen() {
    this.setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return this;
  },
};

export default canvas;

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashObjectAssign = __webpack_require__(2);

	var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

	var _lodashObjectCreate = __webpack_require__(26);

	var _lodashObjectCreate2 = _interopRequireDefault(_lodashObjectCreate);

	var _lodashCollectionForEach = __webpack_require__(28);

	var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

	var _lodashLangIsFunction = __webpack_require__(7);

	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

	var _events = __webpack_require__(37);

	var _events2 = _interopRequireDefault(_events);

	var _pointer = __webpack_require__(38);

	var _pointer2 = _interopRequireDefault(_pointer);

	var _vector = __webpack_require__(39);

	var _vector2 = _interopRequireDefault(_vector);

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
	    addClasses: true
	  },
	  init: function init(element) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    this.element = element;
	    this.settings = (0, _lodashObjectAssign2['default'])(this.defaults, options);
	    this.ratio = window.devicePixelRatio || 1;
	    this.isRetina = this.ratio > 1;
	    this.isPaused = false;
	    this.isRunning = false;
	    this.context = this.element.getContext('2d', this.settings.contextAttributes);
	    this.pointer = (0, _lodashObjectCreate2['default'])(_pointer2['default']);
	    this.width = this.element.width;
	    this.height = this.element.height;

	    this.element.classList.add('canvas');

	    this.resize();

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
	  pause: function pause() {
	    this.isPaused = true;

	    this.element.classList.add('canvas--is-paused');

	    this.clearAnimationFrame();

	    return this;
	  },
	  unPause: function unPause() {
	    this.isPaused = false;

	    this.element.classList.remove('canvas--is-paused');

	    this.loop();

	    return this;
	  },
	  stop: function stop() {
	    var classList;

	    this.isRunning = false;
	    this.isPaused = false;

	    classList = this.element.classList;

	    classList.remove('canvas--is-running');
	    classList.remove('canvas--is-paused');

	    this.clearAnimationFrame();

	    return this.unBindEvents();
	  },
	  destroy: function destroy() {
	    if (this.isRunning) {
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

	    // NOTE: pass all events to handleEvent (special) function
	    (0, _lodashCollectionForEach2['default'])(_events2['default'], function (_ref, name) {
	      var element = _ref.element;

	      (element || _this.element).addEventListener(name, _this, false);
	    });

	    return this;
	  },
	  unBindEvents: function unBindEvents() {
	    var _this2 = this;

	    (0, _lodashCollectionForEach2['default'])(_events2['default'], function (_ref2, name) {
	      var element = _ref2.element;

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
	  run: function run() {
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
	    var handler;

	    // NOTE: only allow visibilitychange and resize events whilst paused
	    if (this.isPaused && type !== 'visibilitychange' && type !== 'resize') {
	      return this;
	    }

	    if ((0, _lodashLangIsFunction2['default'])(this[type])) {
	      this[type](event);
	    }

	    handler = _events2['default'][event.type].handler;

	    if ((0, _lodashLangIsFunction2['default'])(this[handler])) {
	      this[handler](event);
	    }

	    return this;
	  },
	  mousedown: function mousedown(_ref3) {
	    var pageX = _ref3.pageX;
	    var pageY = _ref3.pageY;

	    this.pointer.startDragging(pageX, pageY);

	    return this;
	  },
	  mousemove: function mousemove(_ref4) {
	    var pageX = _ref4.pageX;
	    var pageY = _ref4.pageY;

	    this.pointer.set(pageX, pageY);

	    return this;
	  },
	  mouseup: function mouseup(_ref5) {
	    var pageX = _ref5.pageX;
	    var pageY = _ref5.pageY;

	    this.pointer.stopDragging(pageX, pageY);

	    return this;
	  },
	  visibilitychange: function visibilitychange() {
	    if (!this.settings.autoPause) {
	      return this;
	    }

	    if (document.visibilityState === 'visible') {
	      return this.unPause();
	    }

	    return this.pause();
	  },
	  resize: function resize() {
	    this.fillScreen().retinafy();

	    return this;
	  },
	  fillScreen: function fillScreen() {
	    if (!this.settings.fillScreen) {
	      return this;
	    }

	    this.width = this.element.width = window.innerWidth;
	    this.height = this.element.height = window.innerHeight;

	    return this;
	  },
	  retinafy: function retinafy() {
	    if (!this.settings.supportRetina || !this.isRetina) {
	      return this;
	    }

	    this.element.width *= this.ratio;
	    this.element.height *= this.ratio;

	    return this;
	  }
	};

	exports.canvas = canvas;
	exports.events = _events2['default'];
	exports.pointer = _pointer2['default'];
	exports.vector = _vector2['default'];
	exports['default'] = canvas;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(19), __webpack_require__(21)], __WEBPACK_AMD_DEFINE_RESULT__ = function(assignWith, baseAssign, createAssigner) {

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object. Subsequent sources overwrite property assignments of previous sources.
	   * If `customizer` is provided it is invoked to produce the assigned values.
	   * The `customizer` is bound to `thisArg` and invoked with five arguments:
	   * (objectValue, sourceValue, key, object, source).
	   *
	   * **Note:** This method mutates `object` and is based on
	   * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	   *
	   * @static
	   * @memberOf _
	   * @alias extend
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @param {Function} [customizer] The function to customize assigned values.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	   * // => { 'user': 'fred', 'age': 40 }
	   *
	   * // using a customizer callback
	   * var defaults = _.partialRight(_.assign, function(value, other) {
	   *   return _.isUndefined(value) ? other : value;
	   * });
	   *
	   * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  var assign = createAssigner(function(object, source, customizer) {
	    return customizer
	      ? assignWith(object, source, customizer)
	      : baseAssign(object, source);
	  });

	  return assign;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(keys) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * A specialized version of `_.assign` for customizing assigned values without
	   * support for argument juggling, multiple sources, and `this` binding `customizer`
	   * functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {Function} customizer The function to customize assigned values.
	   * @returns {Object} Returns `object`.
	   */
	  function assignWith(object, source, customizer) {
	    var index = -1,
	        props = keys(source),
	        length = props.length;

	    while (++index < length) {
	      var key = props[index],
	          value = object[key],
	          result = customizer(value, source[key], key, object, source);

	      if ((result === result ? (result !== value) : (value === value)) ||
	          (value === undefined && !(key in object))) {
	        object[key] = result;
	      }
	    }
	    return object;
	  }

	  return assignWith;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(10), __webpack_require__(8), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(getNative, isArrayLike, isObject, shimKeys) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeKeys = getNative(Object, 'keys');

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  var keys = !nativeKeys ? shimKeys : function(object) {
	    var Ctor = object == null ? undefined : object.constructor;
	    if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	        (typeof object != 'function' && isArrayLike(object))) {
	      return shimKeys(object);
	    }
	    return isObject(object) ? nativeKeys(object) : [];
	  };

	  return keys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isNative) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * Gets the native function at `key` of `object`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {string} key The key of the method to get.
	   * @returns {*} Returns the function if it's native, else `undefined`.
	   */
	  function getNative(object, key) {
	    var value = object == null ? undefined : object[key];
	    return isNative(value) ? value : undefined;
	  }

	  return getNative;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isFunction, isObjectLike) {

	  /** Used to detect host constructors (Safari > 5). */
	  var reIsHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to resolve the decompiled source of functions. */
	  var fnToString = Function.prototype.toString;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /** Used to detect if a method is native. */
	  var reIsNative = RegExp('^' +
	    fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	  );

	  /**
	   * Checks if `value` is a native function.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	   * @example
	   *
	   * _.isNative(Array.prototype.push);
	   * // => true
	   *
	   * _.isNative(_);
	   * // => false
	   */
	  function isNative(value) {
	    if (value == null) {
	      return false;
	    }
	    if (isFunction(value)) {
	      return reIsNative.test(fnToString.call(value));
	    }
	    return isObjectLike(value) && reIsHostCtor.test(value);
	  }

	  return isNative;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isObject) {

	  /** `Object#toString` result references. */
	  var funcTag = '[object Function]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	   * of values.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * Checks if `value` is classified as a `Function` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   *
	   * _.isFunction(/abc/);
	   * // => false
	   */
	  function isFunction(value) {
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in older versions of Chrome and Safari which return 'function' for regexes
	    // and Safari 8 equivalents which return 'object' for typed array constructors.
	    return isObject(value) && objToString.call(value) == funcTag;
	  }

	  return isFunction;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(1);
	   * // => false
	   */
	  function isObject(value) {
	    // Avoid a V8 JIT bug in Chrome 19-20.
	    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	    var type = typeof value;
	    return !!value && (type == 'object' || type == 'function');
	  }

	  return isObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return !!value && typeof value == 'object';
	  }

	  return isObjectLike;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(getLength, isLength) {

	  /**
	   * Checks if `value` is array-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	   */
	  function isArrayLike(value) {
	    return value != null && isLength(getLength(value));
	  }

	  return isArrayLike;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseProperty) {

	  /**
	   * Gets the "length" property value of `object`.
	   *
	   * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	   * that affects Safari on at least iOS 8.1-8.3 ARM64.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {*} Returns the "length" value.
	   */
	  var getLength = baseProperty('length');

	  return getLength;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * The base implementation of `_.property` without support for deep paths.
	   *
	   * @private
	   * @param {string} key The key of the property to get.
	   * @returns {Function} Returns the new function.
	   */
	  function baseProperty(key) {
	    return function(object) {
	      return object == null ? undefined : object[key];
	    };
	  }

	  return baseProperty;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	   * of an array-like value.
	   */
	  var MAX_SAFE_INTEGER = 9007199254740991;

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	   */
	  function isLength(value) {
	    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }

	  return isLength;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(13), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, keysIn) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * A fallback implementation of `Object.keys` which creates an array of the
	   * own enumerable property names of `object`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function shimKeys(object) {
	    var props = keysIn(object),
	        propsLength = props.length,
	        length = propsLength && object.length;

	    var allowIndexes = !!length && isLength(length) &&
	      (isArray(object) || isArguments(object));

	    var index = -1,
	        result = [];

	    while (++index < propsLength) {
	      var key = props[index];
	      if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return shimKeys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArrayLike, isObjectLike) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /** Native method references. */
	  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	  /**
	   * Checks if `value` is classified as an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    return isObjectLike(value) && isArrayLike(value) &&
	      hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	  }

	  return isArguments;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(13), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(getNative, isLength, isObjectLike) {

	  /** `Object#toString` result references. */
	  var arrayTag = '[object Array]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	   * of values.
	   */
	  var objToString = objectProto.toString;

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeIsArray = getNative(Array, 'isArray');

	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   *
	   * _.isArray(function() { return arguments; }());
	   * // => false
	   */
	  var isArray = nativeIsArray || function(value) {
	    return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	  };

	  return isArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^\d+$/;

	  /**
	   * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	   * of an array-like value.
	   */
	  var MAX_SAFE_INTEGER = 9007199254740991;

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return value > -1 && value % 1 == 0 && value < length;
	  }

	  return isIndex;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(13), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, isObject) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    if (object == null) {
	      return [];
	    }
	    if (!isObject(object)) {
	      object = Object(object);
	    }
	    var length = object.length;
	    length = (length && isLength(length) &&
	      (isArray(object) || isArguments(object)) && length) || 0;

	    var Ctor = object.constructor,
	        index = -1,
	        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	        result = Array(length),
	        skipIndexes = length > 0;

	    while (++index < length) {
	      result[index] = (index + '');
	    }
	    for (var key in object) {
	      if (!(skipIndexes && isIndex(key, length)) &&
	          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return keysIn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(20), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseCopy, keys) {

	  /**
	   * The base implementation of `_.assign` without support for argument juggling,
	   * multiple sources, and `customizer` functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @returns {Object} Returns `object`.
	   */
	  function baseAssign(object, source) {
	    return source == null
	      ? object
	      : baseCopy(source, keys(source), object);
	  }

	  return baseAssign;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Copies properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Array} props The property names to copy.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @returns {Object} Returns `object`.
	   */
	  function baseCopy(source, props, object) {
	    object || (object = {});

	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      object[key] = source[key];
	    }
	    return object;
	  }

	  return baseCopy;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22), __webpack_require__(24), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function(bindCallback, isIterateeCall, restParam) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return restParam(function(object, sources) {
	      var index = -1,
	          length = object == null ? 0 : sources.length,
	          customizer = length > 2 ? sources[length - 2] : undefined,
	          guard = length > 2 ? sources[2] : undefined,
	          thisArg = length > 1 ? sources[length - 1] : undefined;

	      if (typeof customizer == 'function') {
	        customizer = bindCallback(customizer, thisArg, 5);
	        length -= 2;
	      } else {
	        customizer = typeof thisArg == 'function' ? thisArg : undefined;
	        length -= (customizer ? 1 : 0);
	      }
	      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	        customizer = length < 3 ? undefined : customizer;
	        length = 1;
	      }
	      while (++index < length) {
	        var source = sources[index];
	        if (source) {
	          assigner(object, source, customizer);
	        }
	      }
	      return object;
	    });
	  }

	  return createAssigner;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function(identity) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * A specialized version of `baseCallback` which only supports `this` binding
	   * and specifying the number of arguments to provide to `func`.
	   *
	   * @private
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {number} [argCount] The number of arguments to provide to `func`.
	   * @returns {Function} Returns the callback.
	   */
	  function bindCallback(func, thisArg, argCount) {
	    if (typeof func != 'function') {
	      return identity;
	    }
	    if (thisArg === undefined) {
	      return func;
	    }
	    switch (argCount) {
	      case 1: return function(value) {
	        return func.call(thisArg, value);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	      case 5: return function(value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	    }
	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  }

	  return bindCallback;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * This method returns the first argument provided to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.identity(object) === object;
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  return identity;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(17), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArrayLike, isIndex, isObject) {

	  /**
	   * Checks if the provided arguments are from an iteratee call.
	   *
	   * @private
	   * @param {*} value The potential iteratee value argument.
	   * @param {*} index The potential iteratee index or key argument.
	   * @param {*} object The potential iteratee object argument.
	   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	   */
	  function isIterateeCall(value, index, object) {
	    if (!isObject(object)) {
	      return false;
	    }
	    var type = typeof index;
	    if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)) {
	      var other = object[index];
	      return value === value ? (value === other) : (other !== other);
	    }
	    return false;
	  }

	  return isIterateeCall;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** Used as the `TypeError` message for "Functions" methods. */
	  var FUNC_ERROR_TEXT = 'Expected a function';

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeMax = Math.max;

	  /**
	   * Creates a function that invokes `func` with the `this` binding of the
	   * created function and arguments from `start` and beyond provided as an array.
	   *
	   * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {Function} func The function to apply a rest parameter to.
	   * @param {number} [start=func.length-1] The start position of the rest parameter.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var say = _.restParam(function(what, names) {
	   *   return what + ' ' + _.initial(names).join(', ') +
	   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	   * });
	   *
	   * say('hello', 'fred', 'barney', 'pebbles');
	   * // => 'hello fred, barney, & pebbles'
	   */
	  function restParam(func, start) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	    return function() {
	      var args = arguments,
	          index = -1,
	          length = nativeMax(args.length - start, 0),
	          rest = Array(length);

	      while (++index < length) {
	        rest[index] = args[start + index];
	      }
	      switch (start) {
	        case 0: return func.call(this, rest);
	        case 1: return func.call(this, args[0], rest);
	        case 2: return func.call(this, args[0], args[1], rest);
	      }
	      var otherArgs = Array(start + 1);
	      index = -1;
	      while (++index < start) {
	        otherArgs[index] = args[index];
	      }
	      otherArgs[start] = rest;
	      return func.apply(this, otherArgs);
	    };
	  }

	  return restParam;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19), __webpack_require__(27), __webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseAssign, baseCreate, isIterateeCall) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * Creates an object that inherits from the given `prototype` object. If a
	   * `properties` object is provided its own enumerable properties are assigned
	   * to the created object.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} prototype The object to inherit from.
	   * @param {Object} [properties] The properties to assign to the object.
	   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	   * @returns {Object} Returns the new object.
	   * @example
	   *
	   * function Shape() {
	   *   this.x = 0;
	   *   this.y = 0;
	   * }
	   *
	   * function Circle() {
	   *   Shape.call(this);
	   * }
	   *
	   * Circle.prototype = _.create(Shape.prototype, {
	   *   'constructor': Circle
	   * });
	   *
	   * var circle = new Circle;
	   * circle instanceof Circle;
	   * // => true
	   *
	   * circle instanceof Shape;
	   * // => true
	   */
	  function create(prototype, properties, guard) {
	    var result = baseCreate(prototype);
	    if (guard && isIterateeCall(prototype, properties, guard)) {
	      properties = undefined;
	    }
	    return properties ? baseAssign(result, properties) : result;
	  }

	  return create;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isObject) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * The base implementation of `_.create` without support for assigning
	   * properties to the created object.
	   *
	   * @private
	   * @param {Object} prototype The object to inherit from.
	   * @returns {Object} Returns the new object.
	   */
	  var baseCreate = (function() {
	    function object() {}
	    return function(prototype) {
	      if (isObject(prototype)) {
	        object.prototype = prototype;
	        var result = new object;
	        object.prototype = undefined;
	      }
	      return result || {};
	    };
	  }());

	  return baseCreate;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(29), __webpack_require__(30), __webpack_require__(36)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayEach, baseEach, createForEach) {

	  /**
	   * Iterates over elements of `collection` invoking `iteratee` for each element.
	   * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	   * (value, index|key, collection). Iteratee functions may exit iteration early
	   * by explicitly returning `false`.
	   *
	   * **Note:** As with other "Collections" methods, objects with a "length" property
	   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	   * may be used for object iteration.
	   *
	   * @static
	   * @memberOf _
	   * @alias each
	   * @category Collection
	   * @param {Array|Object|string} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @param {*} [thisArg] The `this` binding of `iteratee`.
	   * @returns {Array|Object|string} Returns `collection`.
	   * @example
	   *
	   * _([1, 2]).forEach(function(n) {
	   *   console.log(n);
	   * }).value();
	   * // => logs each value from left to right and returns the array
	   *
	   * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	   *   console.log(n, key);
	   * });
	   * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	   */
	  var forEach = createForEach(arrayEach, baseEach);

	  return forEach;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * A specialized version of `_.forEach` for arrays without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEach(array, iteratee) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      if (iteratee(array[index], index, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  return arrayEach;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(31), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseForOwn, createBaseEach) {

	  /**
	   * The base implementation of `_.forEach` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array|Object|string} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array|Object|string} Returns `collection`.
	   */
	  var baseEach = createBaseEach(baseForOwn);

	  return baseEach;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(32), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseFor, keys) {

	  /**
	   * The base implementation of `_.forOwn` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForOwn(object, iteratee) {
	    return baseFor(object, iteratee, keys);
	  }

	  return baseForOwn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = function(createBaseFor) {

	  /**
	   * The base implementation of `baseForIn` and `baseForOwn` which iterates
	   * over `object` properties returned by `keysFunc` invoking `iteratee` for
	   * each property. Iteratee functions may exit iteration early by explicitly
	   * returning `false`.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @returns {Object} Returns `object`.
	   */
	  var baseFor = createBaseFor();

	  return baseFor;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(34)], __WEBPACK_AMD_DEFINE_RESULT__ = function(toObject) {

	  /**
	   * Creates a base function for `_.forIn` or `_.forInRight`.
	   *
	   * @private
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseFor(fromRight) {
	    return function(object, iteratee, keysFunc) {
	      var iterable = toObject(object),
	          props = keysFunc(object),
	          length = props.length,
	          index = fromRight ? length : -1;

	      while ((fromRight ? index-- : ++index < length)) {
	        var key = props[index];
	        if (iteratee(iterable[key], key, iterable) === false) {
	          break;
	        }
	      }
	      return object;
	    };
	  }

	  return createBaseFor;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isObject) {

	  /**
	   * Converts `value` to an object if it's not one.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {Object} Returns the object.
	   */
	  function toObject(value) {
	    return isObject(value) ? value : Object(value);
	  }

	  return toObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11), __webpack_require__(13), __webpack_require__(34)], __WEBPACK_AMD_DEFINE_RESULT__ = function(getLength, isLength, toObject) {

	  /**
	   * Creates a `baseEach` or `baseEachRight` function.
	   *
	   * @private
	   * @param {Function} eachFunc The function to iterate over a collection.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseEach(eachFunc, fromRight) {
	    return function(collection, iteratee) {
	      var length = collection ? getLength(collection) : 0;
	      if (!isLength(length)) {
	        return eachFunc(collection, iteratee);
	      }
	      var index = fromRight ? length : -1,
	          iterable = toObject(collection);

	      while ((fromRight ? index-- : ++index < length)) {
	        if (iteratee(iterable[index], index, iterable) === false) {
	          break;
	        }
	      }
	      return collection;
	    };
	  }

	  return createBaseEach;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(bindCallback, isArray) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * Creates a function for `_.forEach` or `_.forEachRight`.
	   *
	   * @private
	   * @param {Function} arrayFunc The function to iterate over an array.
	   * @param {Function} eachFunc The function to iterate over a collection.
	   * @returns {Function} Returns the new each function.
	   */
	  function createForEach(arrayFunc, eachFunc) {
	    return function(collection, iteratee, thisArg) {
	      return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	        ? arrayFunc(collection, iteratee)
	        : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	    };
	  }

	  return createForEach;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
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
	module.exports = exports['default'];
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

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashObjectAssign = __webpack_require__(2);

	var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

	var _lodashObjectCreate = __webpack_require__(26);

	var _lodashObjectCreate2 = _interopRequireDefault(_lodashObjectCreate);

	var _vector = __webpack_require__(39);

	var _vector2 = _interopRequireDefault(_vector);

	var pointer = (0, _lodashObjectAssign2['default'])((0, _lodashObjectCreate2['default'])(_vector2['default']), {
	  isDragging: false,
	  origin: (0, _lodashObjectCreate2['default'])(_vector2['default']),
	  delta: (0, _lodashObjectCreate2['default'])(_vector2['default']),
	  startDragging: function startDragging(x, y) {
	    this.isDragging = true;

	    this.origin.set(x, y);
	    this.delta.set(0, 0);

	    return this;
	  },
	  stopDragging: function stopDragging(x, y) {
	    this.isDragging = false;

	    this.origin.clear();
	    this.delta.clear();

	    return this;
	  },
	  set: function set(x, y) {
	    var delta;

	    _vector2['default'].set.call(this, x, y);

	    if (this.isDragging) {
	      delta = this.get().subtract(this.origin);

	      this.delta.set(delta.x, delta.y);
	    }

	    return this;
	  }
	});

	exports['default'] = pointer;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashObjectCreate = __webpack_require__(26);

	var _lodashObjectCreate2 = _interopRequireDefault(_lodashObjectCreate);

	var _lodashLangIsNumber = __webpack_require__(40);

	var _lodashLangIsNumber2 = _interopRequireDefault(_lodashLangIsNumber);

	var vector = {
	  set: function set(x, y) {
	    this.x = x;
	    this.y = y;

	    return this;
	  },
	  get: function get() {
	    return (0, _lodashObjectCreate2['default'])(vector).set(this.x, this.y);
	  },
	  clear: function clear() {
	    delete this.x;
	    delete this.y;

	    return this;
	  },
	  add: function add(_ref) {
	    var x = _ref.x;
	    var y = _ref.y;

	    this.x += x;

	    this.y += y;

	    this.checkLimitation();

	    return this;
	  },
	  subtract: function subtract(_ref2) {
	    var x = _ref2.x;
	    var y = _ref2.y;

	    this.x -= x;

	    this.y -= y;

	    this.checkLimitation();

	    return this;
	  },
	  multiply: function multiply(multiplier, check) {
	    if ((0, _lodashLangIsNumber2['default'])(multiplier)) {
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
	    if ((0, _lodashLangIsNumber2['default'])(divisor)) {
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
	    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	  },
	  limit: function limit(limitation) {
	    this.limitation = limitation;

	    this.checkLimitation();

	    return this;
	  },
	  checkLimitation: function checkLimitation() {
	    var magnitude;

	    if ((0, _lodashLangIsNumber2['default'])(this.limitation)) {
	      magnitude = this.magnitude();

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

	exports['default'] = vector;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isObjectLike) {

	  /** `Object#toString` result references. */
	  var numberTag = '[object Number]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	   * of values.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * Checks if `value` is classified as a `Number` primitive or object.
	   *
	   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	   * as numbers, use the `_.isFinite` method.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isNumber(8.4);
	   * // => true
	   *
	   * _.isNumber(NaN);
	   * // => true
	   *
	   * _.isNumber('8.4');
	   * // => false
	   */
	  function isNumber(value) {
	    return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
	  }

	  return isNumber;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ])
});
;
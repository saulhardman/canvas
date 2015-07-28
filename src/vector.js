import isNumber from 'lodash/lang/isNumber';

var vector = {
  set(x, y) {
    this.x = x;
    this.y = y;

    return this;
  },
  get() {
    return Object.create(vector).set(this.x, this.y);
  },
  clear() {
    delete this.x;
    delete this.y;

    return this;
  },
  add({ x, y }) {
    this.x += x;

    this.y += y;

    this.checkLimitation();

    return this;
  },
  subtract({ x, y }) {
    this.x -= x;

    this.y -= y;

    this.checkLimitation();

    return this;
  },
  multiply(multiplier, check) {
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
  divide(divisor, check) {
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
  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  },
  limit(limitation) {
    this.limitation = limitation;

    this.checkLimitation();

    return this;
  },
  checkLimitation() {
    var magnitude;

    if (isNumber(this.limitation)) {
      magnitude = this.magnitude();

      if (magnitude > this.limitation) {
        this.divide(magnitude, false).multiply(this.limitation, false);
      }
    }

    return this;
  },
  normalize() {
    var magnitude = this.magnitude();

    if (magnitude !== 0) {
      return this.divide(this.magnitude());
    }

    return this;
  },
  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }
};

export default vector;

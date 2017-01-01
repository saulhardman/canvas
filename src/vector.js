import isNumber from 'lodash-es/isNumber';

const vector = {
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
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  },
  limit(limitation) {
    this.limitation = limitation;

    this.checkLimitation();

    return this;
  },
  checkLimitation() {
    if (isNumber(this.limitation)) {
      const magnitude = this.magnitude();

      if (magnitude > this.limitation) {
        this.divide(magnitude, false).multiply(this.limitation, false);
      }
    }

    return this;
  },
  normalize() {
    const magnitude = this.magnitude();

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
  },
};

export default vector;

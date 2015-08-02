import assign from 'lodash/object/assign';
import create from 'lodash/object/create';

import vector from './vector';

var pointer = assign(create(vector), {
  isDragging: false,
  origin: create(vector),
  delta: create(vector),
  startDragging(x, y) {
    this.isDragging = true;

    this.origin.set(x, y);
    this.delta.set(0, 0);

    return this;
  },
  stopDragging(x, y) {
    this.isDragging = false;

    this.origin.clear();
    this.delta.clear();

    return this;
  },
  set(x, y) {
    var delta;

    vector.set.call(this, x, y);

    if (this.isDragging) {
      delta = this.get().subtract(this.origin);

      this.delta.set(delta.x, delta.y);
    }

    return this;
  }
});

export default pointer;

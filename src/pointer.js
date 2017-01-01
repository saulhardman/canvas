import assign from 'lodash-es/assign';

import vector from './vector';

const pointer = assign(Object.create(vector), {
  isDragging: false,
  origin: Object.create(vector),
  delta: Object.create(vector),
  startDragging(x, y) {
    this.isDragging = true;

    this.origin.set(x, y);
    this.delta.set(0, 0);

    return this;
  },
  stopDragging() {
    this.isDragging = false;

    this.origin.clear();
    this.delta.clear();

    return this;
  },
  set(x, y) {
    vector.set.call(this, x, y);

    if (this.isDragging) {
      const delta = this.get().subtract(this.origin);

      this.delta.set(delta.x, delta.y);
    }

    return this;
  },
});

export default pointer;

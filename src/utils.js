export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function random(min, max) {
  return Math.round(min + (Math.random() * (max - min)));
}

export function randomFloat(min, max) {
  return min + (Math.random() * (max - min));
}

export function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

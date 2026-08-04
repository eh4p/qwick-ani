export function seededUnit(index: number, stream: number) {
  let seed = Math.imul(index + 1, 0x9e3779b1) ^ Math.imul(stream + 1, 0x85ebca6b);
  seed = Math.imul(seed ^ (seed >>> 16), 0x7feb352d);
  seed = Math.imul(seed ^ (seed >>> 15), 0x846ca68b);
  return ((seed ^ (seed >>> 16)) >>> 0) / 4294967296;
}

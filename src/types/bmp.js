/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/bmp.js
 */

function check (chunk) {
  return ('BM' === chunk.toString('ascii', 0, 2));
}

function calculateSize (chunk) {
  const width = chunk.readUInt32LE(18);
  const height = Math.abs(chunk.readInt32LE(22));
  return {
    width,
    height
  };
}

function size(chunk) {
  const { width, height } = calculateSize(chunk);
  return {
    type: 'bmp',
    width,
    height
  };
}

module.exports = {
  check,
  size
};
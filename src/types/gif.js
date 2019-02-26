/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/gif.js
 */

const gifRegexp = /^GIF8[79]a/;
function check (chunk) {
  const signature = chunk.toString('ascii', 0, 6);
  return (gifRegexp.test(signature));
}

function calculateSize (chunk) {
  const width = chunk.readUInt16LE(6);
  const height = chunk.readUInt16LE(8);
  return {
    height,
    width
  };
}

function size(chunk) {
  const { width, height } = calculateSize(chunk);
  return {
    type: 'gif',
    width,
    height
  };
}

module.exports = {
  name: 'gif',
  check,
  size
};
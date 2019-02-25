/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/bmp.js
 */

const processStream = require('../helpers/process-stream');

function isBMP (buffer) {
  return ('BM' === buffer.toString('ascii', 0, 2));
}

function getImageStream(stream) {
  function onData(data) {
    let width, height;
    width = data.readUInt32LE(18);
    height = Math.abs(data.readInt32LE(22));

    return {
      type: 'bmp',
      height,
      width
    };
  }
  return processStream(stream, { onData });
}

module.exports = {
  is: isBMP,
  getImageStream,
};
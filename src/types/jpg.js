/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/jpg.js
 */ 

const processStream = require('../helpers/process-stream');

function isJPG (buffer) {
  var SOIMarker = buffer.toString('hex', 0, 2);
  return ('ffd8' === SOIMarker);
}

function extractSize (buffer, i) {
  return {
    height: buffer.readUInt16BE(i),
    width: buffer.readUInt16BE(i + 2)
  };
}

function validateBuffer (buffer, i) {
  // index should be within buffer limits
  if (i > buffer.length) {
    throw new TypeError('Corrupt JPG, exceeded buffer limits');
  }
  // Every JPEG block must begin with a 0xFF
  if (buffer[i] !== 0xFF) {
    throw new TypeError('Invalid JPG, marker table corrupted');
  }
}

function getImageStream(stream) {
  let buffer = [];
  let partIndex = 0;
  let i = -1;
  let offset = 0;
  function onData(data) {
    offset = buffer[partIndex] && buffer[partIndex].length || 0;
    partIndex++;

    let temp = data;
    // start
    if (i === -1) {
      i = 4;
    }

    let next;
    while (i < temp.length) {
      // read length of the next block
      let blockSize = temp.readUInt16BE(i + offset);

      // ensure correct format
      validateBuffer(temp, i + blockSize + offset);

      // 0xFFC0 is baseline standard(SOF)
      // 0xFFC1 is baseline optimized(SOF)
      // 0xFFC2 is progressive(SOF2)
      next = temp[i + blockSize + 1 + offset];
      if (next === 0xC0 || next === 0xC1 || next === 0xC2) {
        let size = extractSize(temp, i + blockSize + 5);
        return {
          type: 'jpg',
          size,
        };
      }

      // move to the next block
      i += blockSize + 2;
    }
  }
  return processStream(stream, { onData });
}

module.exports = {
  is: isJPG,
  getImageStream,
}
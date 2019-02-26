/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/jpg.js
 */ 

function check (chunk) {
  var SOIMarker = chunk.toString('hex', 0, 2);
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

function calculateSize(data, variables) {
  let { buffer = [], partIndex = 0, i = -1, offset = 0 } = variables;
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
      const { width, height } = extractSize(temp, i + blockSize + 5);
      return {
        width,
        height
      };
    }

    // move to the next block
    i += blockSize + 2;
  }

  Object.assign(variables, {
    buffer, partIndex, i, offset
  });
}

function size(data, variables) {
  const res = calculateSize(data, variables)
  if (res) {
    res.type = 'jpg';
  }
  return res;
}

module.exports = {
  check,
  size,
}
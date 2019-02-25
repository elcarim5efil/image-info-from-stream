/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/png.js
 */

const processStream = require('../helpers/process-stream');

const pngSignature = 'PNG\r\n\x1a\n';
const pngImageHeaderChunkName = 'IHDR';

// Used to detect "fried" png's: http://www.jongware.com/pngdefry.html
const pngFriedChunkName = 'CgBI'; 

function isPNG (buffer) {
  let chunkName
  if (pngSignature === buffer.toString('ascii', 1, 8)) {
    chunkName = buffer.toString('ascii', 12, 16);
    if (chunkName === pngFriedChunkName) {
      chunkName = buffer.toString('ascii', 28, 32);
    }
    if (chunkName !== pngImageHeaderChunkName) {
      throw new TypeError('invalid png');
    }
    return true;
  }
}

function getImageStream(stream) {
  function onData(data) {
    let width, height;
    if (data.toString('ascii', 12, 16) === pngFriedChunkName) {
      width = data.readUInt32BE(32);
      height = data.readUInt32BE(36);
    } else {
      width = data.readUInt32BE(16);
      height = data.readUInt32BE(20);
    }

    return {
      type: 'png',
      height,
      width
    };
  }
  return processStream(stream, { onData });
}

module.exports = {
  is: isPNG,
  getImageStream,
};
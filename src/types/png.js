/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/png.js
 */

const pngSignature = 'PNG\r\n\x1a\n';
const pngImageHeaderChunkName = 'IHDR';

// Used to detect "fried" png's: http://www.jongware.com/pngdefry.html
const pngFriedChunkName = 'CgBI'; 

function check (chunk) {
  let chunkName
  if (pngSignature === chunk.toString('ascii', 1, 8)) {
    chunkName = chunk.toString('ascii', 12, 16);
    if (chunkName === pngFriedChunkName) {
      chunkName = chunk.toString('ascii', 28, 32);
    }
    if (chunkName !== pngImageHeaderChunkName) {
      throw new TypeError('invalid png');
    }
    return true;
  }
  return false;
}

function calculateSize (chunk) {
  let width, height;
  if (chunk.toString('ascii', 12, 16) === pngFriedChunkName) {
    width = chunk.readUInt32BE(32);
    height = chunk.readUInt32BE(36);
  } else {
    width = chunk.readUInt32BE(16);
    height = chunk.readUInt32BE(20);
  }
  return { width, height };
}

function size (chunk) {
  const { width, height } = calculateSize(chunk);
  return {
    type: 'png',
    width,
    height
  };
}

module.exports = {
  name: 'png',
  check,
  size,
};
/**
 * Size and type logic is based on image-size by
 * Aditya Yadav (@netroy)
 * Licensed under the MIT License
 * https://github.com/image-size/image-size/blob/master/LICENSE
 *
 * modified by (@elcarim)
 * https://github.com/image-size/image-size/blob/master/lib/types/gif.js
 */

const processStream = require('../helpers/process-stream');

const gifRegexp = /^GIF8[79]a/;
function isGIF (buffer) {
  const signature = buffer.toString('ascii', 0, 6);
  return (gifRegexp.test(signature));
}

function getImageStream(stream) {
  function onData(data) {
    let width, height;
    width = data.readUInt16LE(6);
    height = data.readUInt16LE(8);

    return {
      type: 'gif',
      height,
      width
    };
  }
  return processStream(stream, { onData });
}

module.exports = {
  is: isGIF,
  getImageStream,
};
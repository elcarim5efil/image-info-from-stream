const processStream = require('../helpers/process-stream');
const JPG = require('./jpg');
const PNG = require('./png');
const GIF = require('./gif');
const BMP = require('./bmp');

function type(stream) {
  return processStream(stream, {
    onData(data) {
      let type;
      if (JPG.is(data)) {
        type = 'jpg';
      } else if (PNG.is(data)) {
        type = 'png';
      } else if (GIF.is(data)) {
        type = 'gif';
      } else if (BMP.is(data)) {
        type = 'bmp';
      } else {
        type = 'unknown';
      }

      if (type) {
        return { type };
      }
    }
  });
}

module.exports = type;
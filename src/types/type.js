const processStream = require('../helpers/process-stream');
const JPG = require('./jpg');
const PNG = require('./png');
const GIF = require('./gif');

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
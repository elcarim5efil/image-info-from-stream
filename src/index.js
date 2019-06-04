const through = require('through2');
const jpg = require('./types/jpg');
const png = require('./types/png');
const gif = require('./types/gif');
const bmp = require('./types/bmp');

const types = [
  jpg, png, gif, bmp
];

const unknownTypeResult = {
  type: 'unknown',
  width: null,
  height: null 
};

function getImageInfo(resultObj, callback) {
  let handler;
  let result;
  let variables = {};
  let innerBuffer = [];

  if (typeof resultObj === 'function') {
    callback = resultObj;
    resultObj = null;
  }

  function transformFn(data, encoding, cb) {
    if (result) {
      this.push(data);
      cb();
      return;
    }

    innerBuffer.push(data);
    if (!handler) {
      for(let i = 0; i < types.length; ++i) {
        if (types[i].check(data)) {
          handler = types[i];
          break;
        }
      }
    }

    if (handler) {
      result = handler.size(data, variables);
    // cannot find handler
    } else {
      result = unknownTypeResult;
    }

    if (result) {
      // if the result is fetched, flush the innerBuffer to a readable stream
      innerBuffer.forEach(b => {
        this.push(b);
      });

      if (resultObj) {
        Object.assign(resultObj, result);
      }
      // resolve the result
      if (typeof callback === 'function') {
        callback(result);
      }
    }

    cb()
  }

  return through(transformFn);
}

module.exports = getImageInfo;
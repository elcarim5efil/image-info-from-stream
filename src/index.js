const ImageStream = require('./helpers/image-stream');
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

function getImageInfo(stream) {
  return new Promise((resolve, reject) => {
    const readable = new ImageStream();
    let handler;
    let result;
    let variables = {};
    let innerBuffer = [];

    stream.on('data', (data) => {
      // if the result is fetched, just add to the readable stream
      if (result) {
        readable.add(data);
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
          readable.add(b);
        });

        // resolve the result
        resolve(Object.assign({}, result, {
          stream: readable
        }));
      }
    });

    stream.on('end', () => {
      readable.add(null);
    })
  });
}

module.exports = getImageInfo;
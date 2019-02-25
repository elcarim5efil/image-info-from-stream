const ImageStream = require('./image-stream');

function noop() {}

function process(stream, options) {
  return new Promise((resolve, reject) => {
    const { onData = noop, onEnd = noop } = options;
    const readable = new ImageStream();
    let result;
    let innerBuffer = [];

    stream.on('data', (data) => {
      // if the result is fetched, just add to the readable stream
      if (result) {
        readable.add(data);
        return;
      }

      innerBuffer.push(data);
      result = onData(data, readable, result);

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

    stream.on('end', (data) => {
      readable.add(null);
    })
  });
}

module.exports = process;
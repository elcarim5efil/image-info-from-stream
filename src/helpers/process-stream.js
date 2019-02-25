const ImageStream = require('./image-stream');

function noop() {}

function process(stream, options) {
  return new Promise((resolve, reject) => {
    const { onData = noop, onEnd = noop } = options;
    const readable = new ImageStream();
    let result;
    let buffer = [];

    stream.on('data', (data) => {
      if (result) {
        readable.add(data);
        return;
      }

      buffer.push(data);
      result = onData(data, readable, result);

      if (result) {
        buffer.forEach(b => {
          readable.add(b);
        });
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
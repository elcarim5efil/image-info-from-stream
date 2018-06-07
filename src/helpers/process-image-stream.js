const ImageStream = require('./image-stream');

function noop() {}

function process(stream, options) {
  return new Promise((resolve, reject) => {
    const { onData = noop, onEnd = noop } = options;
    const readable = new ImageStream();
    let res;
    let buffer = [];

    stream.on('data', (data) => {
      if (res) {
        readable.add(data);
        return;
      }

      buffer.push(data);
      res = onData(data, readable, res);

      if (res) {
        buffer.forEach(b => {
          readable.add(b);
        });
        resolve(Object.assign({}, res, {
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
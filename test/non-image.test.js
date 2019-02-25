const getImageInfo = require('../src/index');
const path = require('path');
const ImageStream = require('../src/helpers/image-stream');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.txt'));

test('not image', () => {
  return getImageInfo(stream)
    .then((res) => {
      const { stream, size, type } = res;

      let buffer = [];

      expect(type).toBe('unknown');
      expect(size).toBeUndefined();
      expect(stream).toBeInstanceOf(ImageStream);

      // stream.on('data', (data) => {
      //   buffer.push(data);
      // });

      // stream.on('end', () => {
      //   let image = Buffer.concat(buffer);
      //   console.log(image.length)
      // });
  });
});

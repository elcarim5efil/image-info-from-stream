const getImageInfo = require('../src/index');
const path = require('path');
const ImageStream = require('../src/helpers/image-stream');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/slot3.png'));

test('png', () => {
  getImageInfo(stream)
    .then((res) => {
      const { stream, size, type } = res;

      let buffer = [];

      expect(type).toBe('png');
      expect(size).toEqual({
        width: 1170,
        height: 616,
      });
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

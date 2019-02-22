const getImageInfo = require('../src/index');
const path = require('path');
const ImageStream = require('../src/helpers/image-stream');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.jpg'));

test('jpg', () => {
  return getImageInfo(stream)
    .then((res) => {
      const { stream, size, type } = res;

      let buffer = [];

      expect(type).toBe('jpg');
      expect(size).toEqual({
        width: 1170,
        height: 616,
      });
      expect(stream).toBeInstanceOf(ImageStream);
  });
});

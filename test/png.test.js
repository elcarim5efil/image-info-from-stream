const getImageInfo = require('../src/index');
const path = require('path');
const ImageStream = require('../src/helpers/image-stream');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.png'));

test('png', () => {
  return getImageInfo(stream)
    .then((res) => {
      const { stream, width, height, type } = res;

      let buffer = [];

      expect(type).toBe('png');
      expect(width).toEqual(1170);
      expect(height).toEqual(616);
      expect(stream).toBeInstanceOf(ImageStream);
  });
});

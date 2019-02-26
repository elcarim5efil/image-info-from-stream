const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.gif'));

test('gif', () => {
  return getImageInfo(stream)
    .then((res) => {
      const { stream, width, height, type } = res;

      let buffer = [];

      expect(type).toBe('gif');
      expect(width).toEqual(480);
      expect(height).toEqual(287);
  });
});

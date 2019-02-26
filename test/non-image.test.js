const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.txt'));

test('not image', () => {
  return getImageInfo(stream)
    .then((res) => {
      const { stream, size, type } = res;

      let buffer = [];

      expect(type).toBe('unknown');
      expect(size).toBeUndefined();
  });
});

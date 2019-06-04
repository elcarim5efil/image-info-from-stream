const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('gif', () => {
  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.gif'));
    stream.pipe(getImageInfo(res => {
      const { width, height, type } = res;

      let buffer = [];

      expect(type).toBe('gif');
      expect(width).toEqual(480);
      expect(height).toEqual(287);
      done();
    }));
  });
});

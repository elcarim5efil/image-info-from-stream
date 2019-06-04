const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('bmp', () => {
  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.bmp'));
    stream.pipe(getImageInfo(res => {
      const { width, height, type } = res;

      let buffer = [];

      expect(type).toBe('bmp');
      expect(width).toEqual(1170);
      expect(height).toEqual(616);
      done();
    }));
  });
})

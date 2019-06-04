const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('not image', () => {
  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.txt'));
    stream.pipe(getImageInfo(res => {
      const { height, type } = res;
      expect(type).toBe('unknown');
      expect(height).toBeNull();
      done();
    }));
  });
})

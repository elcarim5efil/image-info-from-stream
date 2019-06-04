const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('not image', () => {
  test('promise', () => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.txt'));
    return getImageInfo(stream)
      .then((res) => {
        const { stream, height, type } = res;
        expect(type).toBe('unknown');
        expect(height).toBeNull();
    });
  });

  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.txt'));
    getImageInfo(stream, res => {
      const { stream, height, type } = res;
      expect(type).toBe('unknown');
      expect(height).toBeNull();
      done();
    });
  });
})

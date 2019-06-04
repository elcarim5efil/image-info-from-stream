const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('bmp', () => {
  test('promise', () => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.bmp'));
    return getImageInfo(stream)
      .then((res) => {
        const { stream, width, height, type } = res;

        let buffer = [];

        expect(type).toBe('bmp');
        expect(width).toEqual(1170);
        expect(height).toEqual(616);
    });
  });

  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.bmp'));
    getImageInfo(stream, res => {
      const { stream, width, height, type } = res;

      let buffer = [];

      expect(type).toBe('bmp');
      expect(width).toEqual(1170);
      expect(height).toEqual(616);
      done();
    });
  });
})

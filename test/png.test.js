const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('png', () => {
  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.png'));
    stream.pipe(
      getImageInfo(res => {
        const { width, height, type } = res;

        let buffer = [];

        expect(type).toBe('png');
        expect(width).toEqual(1170);
        expect(height).toEqual(616);
        // expect(stream).toBeInstanceOf(Transform);
        done();
      })
    )
  });

  test('meta', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.png'));
    const meta = {};
    stream
      .pipe(getImageInfo(meta))
      .on('finish', () => {
        const { width, height, type } = meta;
        expect(type).toBe('png');
        expect(width).toEqual(1170);
        expect(height).toEqual(616);
        done();
      })
  });
});

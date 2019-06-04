const getImageInfo = require('../src/index');
const path = require('path');
const Readable = require('stream').Readable;
const fs = require('fs');

describe('png', () => {
  test('promise', () => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.png'));
    return getImageInfo(stream)
      .then((res) => {
        const {
          stream,
          width,
          height,
          type
        } = res;

        let buffer = [];

        expect(type).toBe('png');
        expect(width).toEqual(1170);
        expect(height).toEqual(616);
        expect(stream).toBeInstanceOf(Readable);

        stream.on('data', data => {
          buffer.push(data);
        })
        stream.on('end', data => {
          buffer.push(null);
        })
      });
  });

  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.png'));
    getImageInfo(stream, res => {
      const { stream, width, height, type } = res;

      let buffer = [];

      expect(type).toBe('png');
      expect(width).toEqual(1170);
      expect(height).toEqual(616);
      expect(stream).toBeInstanceOf(Readable);
      done();
    });
  });
});

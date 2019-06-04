const getImageInfo = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('jpg', () => {
  test('promise', () => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.jpg'));
    return getImageInfo(stream)
      .then((res) => {
        const { stream, width, height, type } = res;
  
        let buffer = [];
  
        expect(type).toBe('jpg');
        expect(width).toEqual(1170);
        expect(height).toEqual(616);
    });
  });

  test('callback', (done) => {
    const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.jpg'));
    getImageInfo(stream, res => {
      const { stream, width, height, type } = res;

      let buffer = [];

      expect(type).toBe('jpg');
      expect(width).toEqual(1170);
      expect(height).toEqual(616);
      done();
    });
  });
})

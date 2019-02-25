const getImageInfo = require('../src/index');
const path = require('path');
const ImageStream = require('../src/helpers/image-stream');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.txt'));

getImageInfo(stream)
  .then((res) => {
    const { stream, height, width, type } = res;

    let buffer = [];

    expect(type).toBe('unknown');
    expect(stream).toBeInstanceOf(ImageStream);
});
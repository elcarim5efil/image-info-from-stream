const getImageInfo = require('../src/index');
const path = require('path');
const ImageStream = require('../src/helpers/image-stream');
const fs = require('fs');
const stream = fs.createReadStream(path.resolve(__dirname, './assets/test.jpg'));

getImageInfo(stream)
  .then((res) => {
    const { stream, height, width, type } = res;

    let buffer = [];
    console.log(type, width, height)

    stream.on('data', data => {
      buffer.push(data);
    })
    stream.on('end', data => {
      buffer.push(null);
      console.log(buffer)
    })
});
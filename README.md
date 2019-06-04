# image info from stream

[![Build Status](https://img.shields.io/travis/elcarim5efil/image-info-from-stream.svg?style=for-the-badge)](https://travis-ci.org/elcarim5efil/image-info-from-stream)
[![Coverage Status](https://img.shields.io/coveralls/repos/github/elcarim5efil/image-info-from-stream.svg?style=for-the-badge)](https://coveralls.io/github/elcarim5efil/image-info-from-stream?branch=master)

## introduction

access image size from stream.

support image file types:

- `.jpg`
- `.png`
- `.gif`
- `.bmp`

## usage

### callback

```javascript
const getImageInfo = require('image-infor-from-stream');

getImageInfo(stream, res => {
  const { stream, width, height, type } = res;
  const name = `${width}x${height}.${type}`;
  let buffer = [];

  stream.on('data', (data) => {
    buffer.push(data);
  });

  stream.on('end', () => {
    let image = Buffer.concat(buffer);
  });
});
```

### promise

```javascript
const getImageInfo = require('image-infor-from-stream');

getImageInfo(stream)
  .then(({ stream, width, height, type }) => {
    const name = `${width}x${height}.${type}`;
    let buffer = [];

    stream.on('data', (data) => {
      buffer.push(data);
    });

    stream.on('end', () => {
      let image = Buffer.concat(buffer);
    });
});
```
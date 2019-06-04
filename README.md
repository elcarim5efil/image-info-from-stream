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

### Callback

```javascript
const getImageInfo = require('image-infor-from-stream');
const stream = fs.createReadStream('test.png');

stream.pipe(
  getImageInfo(res => {
    const { width, height, type } = res;
    const name = `${width}x${height}.${type}`;
  })
);
```

### External Object

```javascript
const getImageInfo = require('image-infor-from-stream');
const stream = fs.createReadStream('test.png');
const meta = {};

stream
  .pipe(getImageInfo(meta))
  .on('finish', () => {
    const { width, height, type } = meta;
    const name = `${width}x${height}.${type}`;
  });
```
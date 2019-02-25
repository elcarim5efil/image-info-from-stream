# image info from stream

[![Build Status](https://img.shields.io/travis/elcarim5efil/image-info-from-stream.svg?style=for-the-badge)](https://travis-ci.org/elcarim5efil/image-info-from-stream)
[![Coverage Status](https://img.shields.io/coveralls/repos/github/elcarim5efil/image-info-from-stream.svg?style=for-the-badge)](https://coveralls.io/github/elcarim5efil/image-info-from-stream?branch=master)

## introduction

access image info from stream

## usage

```javascript
  getImageInfo(stream)
    .then((res) => {
      const {stream, size, type } = res;

      const name = `${size.width}_${size.height}.${type}`;

      let buffer = [];

      stream.on('data', (data) => {
        buffer.push(data);
      });

      stream.on('end', () => {
        let image = Buffer.concat(buffer);
      });
  });
```
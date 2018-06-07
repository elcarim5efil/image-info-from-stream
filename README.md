# image info from stream

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
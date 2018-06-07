const Readable = require('stream').Readable;

class ImageStream extends Readable {
  constructor(options) {
    super(options);
    this.data = [];
  }

  add(data) {
    this.data.push(data);
    if (this._readableState.needReadable) {
      this.read()
    } 
  }

  _read() {
    let data = this.data.pop();
    this.push(data);
  }
}

module.exports = ImageStream;
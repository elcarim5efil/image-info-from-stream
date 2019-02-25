const JPG = require('./types/jpg');
const PNG = require('./types/png');
const type = require('./types/type');

function getImageInfo(stream) {
  return type(stream)
    .then((res) => {
      const { stream, type } = res;;

      if (type === 'jpg') {
        return JPG.getImageStream(stream);
      } else if(type === 'png') {
        return PNG.getImageStream(stream);
      }
      return {
        type,
        stream
      };
    })
}

module.exports = getImageInfo;
const { ImageCode } = require('photobox');
const Jimp = require('jimp');

module.exports = class grayscale extends ImageCode {
  async process(msg) {
    const img = await Jimp.read(msg.url);
    img.greyscale();
    this.sendJimp(msg, img);
  }
};
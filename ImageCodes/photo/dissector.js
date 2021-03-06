/* globals ImageCode */
const sharp = require('sharp');

module.exports = class dissector extends ImageCode {
  static benchmark(constants) {
    return {
      avatar: constants.PICTURE1,
    };
  }

  async process(message) {
    const avatar = await sharp(await this.toBuffer(message.avatar))
      .resize(1000, 1000, { fit: 'cover' })
      .ensureAlpha()
      .png()
      .toBuffer();
    const metadata = await sharp(this.resource('dissector.png')).metadata();
    const perspective = await this.perspectify(avatar, {
      topLeft: { x: 297, y: 208 },
      topRight: { x: 1120, y: 105 },
      bottomLeft: { x: 297, y: 1065 },
      bottomRight: { x: 1120, y: 960 },
      canvas: {
        width: metadata.width,
        height: metadata.height,
        color: 'transparent',
      },
    });
    const canvas = sharp(this.resource('dissector.png'))
      .composite([
        { input: perspective, left: 0, top: 0 },
        { input: this.resource('dissector_overlay.png'), left: 0, top: 0 },
      ]);

    return this.send(message, canvas);
  }
};
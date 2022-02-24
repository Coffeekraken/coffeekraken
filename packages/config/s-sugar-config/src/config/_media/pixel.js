module.exports = {
  /**
   * @name                default
   * @namespace           config.media.pixel
   * @type                String
   *
   * Media query for targeting the pixel
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  default: `
    screen
    and (device-width: 360px)
    and (device-height: 640px)
    and (-webkit-device-pixel-ratio: 3)
    `,

  /**
   * @name                portrait
   * @namespace           config.media.pixel
   * @type                String
   *
   * Media query for targeting the pixel in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  portrait: `
    screen
    and (device-width: 360px)
    and (device-height: 640px)
    and (-webkit-device-pixel-ratio: 3)
    and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media.pixel
   * @type                String
   *
   * Media query for targeting the pixel in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  landscape: `
    screen
    and (device-width: 360px)
    and (device-height: 640px)
    and (-webkit-device-pixel-ratio: 3)
    and (orientation: landscape)
    `
};

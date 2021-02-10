module.exports = {
  /**
   * @name                default
   * @namespace           config.media.htc-one
   * @type                String
   *
   * Media query for targeting the htc-one
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
    screen
    and (device-width: 360px)
    and (device-height: 640px)
    and (-webkit-device-pixel-ratio: 3)
    `,

  /**
   * @name                portrait
   * @namespace           config.media.htc-one
   * @type                String
   *
   * Media query for targeting the htc-one in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @namespace           config.media.htc-one
   * @type                String
   *
   * Media query for targeting the htc-one in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
    screen
    and (device-width: 360px)
    and (device-height: 640px)
    and (-webkit-device-pixel-ratio: 3)
    and (orientation: landscape)
    `
};

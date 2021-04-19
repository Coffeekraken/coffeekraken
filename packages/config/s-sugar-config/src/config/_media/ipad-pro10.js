module.exports = {
  /**
   * @name                default
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-pro10
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
    only screen
    and (min-device-width: 834px)
    and (max-device-width: 1112px)
    and (-webkit-min-device-pixel-ratio: 2)
    `,

  /**
   * @name                portrait
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-pro10 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  portrait: `
    only screen
    and (min-device-width: 834px)
    and (max-device-width: 834px)
    and (orientation: portrait)
    and (-webkit-min-device-pixel-ratio: 2)
    `,

  /**
   * @name                landscape
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-pro10 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
    only screen
    and (min-device-width: 1112px)
    and (max-device-width: 1112px)
    and (orientation: landscape)
    and (-webkit-min-device-pixel-ratio: 2)
    `
};

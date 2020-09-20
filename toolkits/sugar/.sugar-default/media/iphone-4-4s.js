module.exports = {
  /**
   * @name                default
   * @namespace           config.media.iphone-4
   * @type                String
   *
   * Default media query for targeting the iphone 4 and 4s
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
      only screen
      and (min-device-width: 320px)
      and (max-device-width: 480px)
      and (-webkit-min-device-pixel-ratio: 2)
    `,

  /**
   * @name                portrait
   * @namespace           config.media.iphone-4
   * @type                String
   *
   * Media query for targeting the iphone 4 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  portrait: `
      only screen
      and (min-device-width: 320px)
      and (max-device-width: 480px)
      and (-webkit-min-device-pixel-ratio: 2)
      and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media.iphone-4
   * @type                String
   *
   * Media query for targeting the iphone 4 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
      only screen
      and (min-device-width: 320px)
      and (max-device-width: 480px)
      and (-webkit-min-device-pixel-ratio: 2)
      and (orientation: landscape)
    `
};

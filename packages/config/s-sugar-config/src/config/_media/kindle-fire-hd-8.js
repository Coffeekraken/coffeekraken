module.exports = {
  /**
   * @name                default
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the kindle fire HD 8
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
  only screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1.5)
    `,

  /**
   * @name                portrait
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the kindle fire HD 8 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  portrait: `
  only screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1.5)
  and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the kindle fire HD 8 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
  only screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1.5)
  and (orientation: landscape)
    `
};

module.exports = {
  /**
   * @name                default
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the nexus-7
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
  screen
  and (device-width: 601px)
  and (device-height: 906px)
  and (-webkit-min-device-pixel-ratio: 1.331)
  and (-webkit-max-device-pixel-ratio: 1.332)
    `,

  /**
   * @name                portrait
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the nexus-7 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  portrait: `
  screen
  and (device-width: 601px)
  and (device-height: 906px)
  and (-webkit-min-device-pixel-ratio: 1.331)
  and (-webkit-max-device-pixel-ratio: 1.332)
  and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the nexus-7 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
  screen
  and (device-width: 601px)
  and (device-height: 906px)
  and (-webkit-min-device-pixel-ratio: 1.331)
  and (-webkit-max-device-pixel-ratio: 1.332)
  and (orientation: landscape)
    `
};

module.exports = {
  /**
   * @name                default
   * @namespace           config.media.windows
   * @type                String
   *
   * Media query for targeting the windows phone
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
    screen
    and (device-width: 480px)
    and (device-height: 800px)
    `,

  /**
   * @name                portrait
   * @namespace           config.media.windows
   * @type                String
   *
   * Media query for targeting the windows phone in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  portrait: `
    screen
    and (device-width: 480px)
    and (device-height: 800px)
    and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media.windows
   * @type                String
   *
   * Media query for targeting the windows phone in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
    screen
    and (device-width: 480px)
    and (device-height: 800px)
    and (orientation: landscape)
    `
};

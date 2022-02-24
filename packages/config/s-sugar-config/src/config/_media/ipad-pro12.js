module.exports = {
  /**
   * @name                default
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-pro12
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  default: `
    only screen
    and (min-device-width: 1024px)
    and (max-device-width: 1366px)
    and (-webkit-min-device-pixel-ratio: 2)
    `,

  /**
   * @name                portrait
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-pro12 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  portrait: `
    only screen
    and (min-device-width: 1024px)
    and (max-device-width: 1024px)
    and (orientation: portrait)
    and (-webkit-min-device-pixel-ratio: 2)
    `,

  /**
   * @name                landscape
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-pro12 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  landscape: `
    only screen
    and (min-device-width: 1366px)
    and (max-device-width: 1366px)
    and (orientation: landscape)
    and (-webkit-min-device-pixel-ratio: 2)
    `
};

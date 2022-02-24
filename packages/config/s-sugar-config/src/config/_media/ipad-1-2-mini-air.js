module.exports = {
  /**
   * @name                default
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-1
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  default: `
  only screen
  and (min-device-width: 768px)
  and (max-device-width: 1024px)
  and (-webkit-min-device-pixel-ratio: 1)
    `,

  /**
   * @name                portrait
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-1 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  portrait: `
  only screen
  and (min-device-width: 768px)
  and (max-device-width: 1024px)
  and (orientation: portrait)
  and (-webkit-min-device-pixel-ratio: 1)
    `,

  /**
   * @name                landscape
   * @namespace           config.media
   * @type                String
   *
   * Media query for targeting the ipad-1 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  landscape: `
    only screen
    and (min-device-width: 768px)
    and (max-device-width: 1024px)
    and (orientation: landscape)
    and (-webkit-min-device-pixel-ratio: 1)
    `
};

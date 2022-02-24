module.exports = {
  /**
   * @name                default
   * @namespace           config.media.iphone-6
   * @type                String
   *
   * Media query for targeting the iphone 6
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  default: `
      only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px)
      and (-webkit-min-device-pixel-ratio: 2)
    `,

  /**
   * @name                portrait
   * @namespace           config.media.iphone-6
   * @type                String
   *
   * Media query for targeting the iphone 6 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  portrait: `
      only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px)
      and (-webkit-min-device-pixel-ratio: 2)
      and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media.iphone-6
   * @type                String
   *
   * Media query for targeting the iphone 6 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  landscape: `
      only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px)
      and (-webkit-min-device-pixel-ratio: 2)
      and (orientation: landscape)
    `
};

module.exports = {
  /**
   * @name                default
   * @namespace           config.media.iphone-x
   * @type                String
   *
   * Media query for targeting the iphone x
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
      only screen
      and (min-device-width: 375px)
      and (max-device-width: 812px)
      and (-webkit-min-device-pixel-ratio: 3)
    `,

  /**
   * @name                portrait
   * @namespace           config.media.iphone-x
   * @type                String
   *
   * Media query for targeting the iphone x in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  portrait: `
      only screen
      and (min-device-width: 375px)
      and (max-device-width: 812px)
      and (-webkit-min-device-pixel-ratio: 3)
      and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media.iphone-x
   * @type                String
   *
   * Media query for targeting the iphone x in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
      only screen
      and (min-device-width: 375px)
      and (max-device-width: 812px)
      and (-webkit-min-device-pixel-ratio: 3)
      and (orientation: landscape)
    `
};

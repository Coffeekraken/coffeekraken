module.exports = {
  /**
   * @name              defaultAction
   * @namespace         config.media
   * @type              String
   * @values            >,<,=,>=,<=
   * @default           >=
   *
   * Specify the default action to apply if you don't specify one in your media
   * mixin call like ```@include Sugar.media('tablet') {...}```. If the defaultAction is set to ">=",
   * the above media will be the same as ```@include Sugar.media('>=tablet') {...}```
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  defaultAction: '>=',

  queries: {
    /**
     * @name          mobile
     * @namespace     config.media.queries
     * @type          Object
     * @default       {'min-device-width': null, 'max-device-width': 639}
     *
     * Specify the media query arguments needed to target mobile
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    mobile: {
      'min-device-width': null,
      'max-device-width': 639
    },

    /**
     * @name          mobile-portrait
     * @namespace     config.media.queries
     * @type          Object
     * @default       {'min-device-width': null, 'max-device-width': 480}
     *
     * Specify the media query arguments needed to target mobile-portrait
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'mobile-portrait': {
      'min-device-width': null,
      'max-device-width': 480,
      orientation: 'portrait'
    },

    /**
     * @name          mobile-landscape
     * @namespace     config.media.queries
     * @type          Object
     * @default       {'min-device-width': null, 'max-device-width': 639}
     *
     * Specify the media query arguments needed to target mobile-landscape
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'mobile-landscape': {
      'min-device-width': null,
      'max-device-width': 639,
      oprientation: 'landscape'
    },

    /**
     * @name          tablet
     * @namespace     config.media.queries
     * @type          Object
     * @default       {'min-device-width': 640, 'max-device-width': 1279}
     *
     * Specify the media query arguments needed to target tablet
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    tablet: {
      'min-device-width': 640,
      'max-device-width': 1279
    },

    /**
     * @name          tablet-portrait
     * @namespace     config.media.queries
     * @type          Object
     * @default       {'min-device-width': 640, 'max-device-width': 1023}
     *
     * Specify the media query arguments needed to target tablet-portrait
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'tablet-portrait': {
      'min-device-width': 640,
      'max-device-width': 1023,
      orientation: 'portrait'
    },

    /**
     * @name          tablet-landscape
     * @namespace     config.media.queries
     * @type          Object
     * @default       {'min-device-width': 1024, 'max-device-width': 1279}
     *
     * Specify the media query arguments needed to target tablet-landscape
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'tablet-landscape': {
      'min-device-width': 1024,
      'max-device-width': 1279,
      oprientation: 'landscape'
    },

    /**
     * @name          desktop
     * @namespace     config.media.queries
     * @type          Object
     * @default       {'min-width': 1280, 'max-width': null}
     *
     * Specify the media query arguments needed to target desktop
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    desktop: {
      'min-width': 1280,
      'max-width': null
    }

    // devices based media queries
    // 'iphone-4': require('./media/iphone-4-4s'),
    // 'iphone-4s': require('./media/iphone-4-4s'),

    // 'iphone-5': require('./media/iphone-5-5s-5c-5se'),
    // 'iphone-5s': require('./media/iphone-5-5s-5c-5se'),
    // 'iphone-5c': require('./media/iphone-5-5s-5c-5se'),
    // 'iphone-5se': require('./media/iphone-5-5s-5c-5se'),

    // 'iphone-6': require('./media/iphone-6-6s-7-8'),
    // 'iphone-6s': require('./media/iphone-6-6s-7-8'),
    // 'iphone-7': require('./media/iphone-6-6s-7-8'),
    // 'iphone-8': require('./media/iphone-6-6s-7-8'),

    // 'iphone-6+': require('./media/iphone-6+-7+-8+'),
    // 'iphone-7+': require('./media/iphone-6+-7+-8+'),
    // 'iphone-8+': require('./media/iphone-6+-7+-8+'),

    // 'iphone-x': require('./media/iphone-x'),

    // 'galaxy-s3': require('./media/galaxy-s3'),

    // 'galaxy-s4': require('./media/galaxy-s4-s5-note3'),
    // 'galaxy-s5': require('./media/galaxy-s4-s5-note3'),
    // 'galaxy-note3': require('./media/galaxy-s4-s5-note3'),

    // 'galaxy-s6': require('./media/galaxy-s6'),

    // pixel: require('./media/pixel'),
    // 'pixel-xl': require('./media/pixel-xl'),

    // 'htc-one': require('./media/htc-one'),

    // windows: require('./media/windows'),

    // 'ipad-1': require('./media/ipad-1-2-mini-air'),
    // 'ipad-2': require('./media/ipad-1-2-mini-air'),
    // 'ipad-mini': require('./media/ipad-1-2-mini-air'),
    // 'ipad-air': require('./media/ipad-1-2-mini-air'),

    // 'ipad-3': require('./media/ipad-3-4-pro9'),
    // 'ipad-4': require('./media/ipad-3-4-pro9'),
    // 'ipad-pro9': require('./media/ipad-3-4-pro9'),

    // 'ipad-pro10': require('./media/ipad-pro10'),

    // 'ipad-pro12': require('./media/ipad-pro12'),

    // 'galaxy-tab2': require('./media/galaxy-tab2'),
    // 'galaxy-tabs': require('./media/galaxy-tabs'),

    // 'nexus-7': require('./media/nexus-7'),
    // 'nexus-8': require('./media/nexus-7'),

    // 'nexus-9': require('./media/nexus-9'),

    // 'kindle-fire-hd-7': require('./media/kindle-fire-hd-7'),
    // 'kindle-fire-hd-8': require('./media/kindle-fire-hd-8')
  }
};

// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name                SMediaQuery
 * @namespace           sugar.js.responsive
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class expose some nice and easy methods to get the active media query defined in the config.media.queries configuration
 * stack, as well as register to some events list "match" or "unmatch".
 *
 * @param           {String}            mediaName           The media name you want to track. Can be an array of names or simple "*" to track every media queries
 * @param           {Object}            [settings={}]       An object of settings to configure your media query instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SMediaQuery from '@coffeekraken/sugar/js/responsive/SMediaQuery';
 * const mediaQuery = new SMediaQuery('mobile');
 * mediaQuery.on('match', media => {
 *      // do something
 * });
 * SMediaQuery.getActiveMedia(); // => mobile
 *
 * @since           2.0.0
 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SMediaQuery extends __SPromise {
  /**
   * @name                this._activeMedia
   * @type                String
   * @static
   *
   * Store the active media name
   *
   * @since           2.0.0
   * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _activeMedia = 'desktop';

  /**
   * @name                _promisesStack
   * @type                Object
   * @static
   *
   * Store all the promises for each media
   *
   * @since           2.0.0
   * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _promisesStack = {};

  /**
   * @name              startListener
   * @type              Function
   * @static
   *
   * Add the global listener based on the "init-body-media-queries" scss mixin
   *
   * @since             2.0.0
   * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static getActiveMedia() {
    return this._activeMedia;
  }

  /**
   * @name              startListener
   * @type              Function
   * @static
   *
   * Add the global listener based on the "init-body-media-queries" scss mixin
   *
   * @since             2.0.0
   * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static startListener() {
    document.addEventListener('animationend', (e) => {
      const mediaName = e.animationName.replace(/^mq-/, '');
      const previousActiveMedia = this._activeMedia;

      // keep track of the active media
      this._activeMedia = mediaName;

      Object.keys(this._promisesStack).forEach((name) => {
        const nameArray = name.split(' ');
        if (previousActiveMedia) {
          if (nameArray.indexOf(previousActiveMedia) !== -1) {
            const promises = this._promisesStack[name];
            promises.forEach((promise) => {
              promise.emit('unmatch', {
                name: previousActiveMedia
              });
            });
          }
        }
        if (nameArray.indexOf(mediaName) !== -1) {
          const promise = this._promisesStack[name];
          const promises = this._promisesStack[name];
          promises.forEach((promise) => {
            promise.emit('match', {
              name: mediaName
            });
          });
        }
      });

      if (this._promisesStack['*']) {
        const allPromises = this._promisesStack['*'];
        allPromises.forEach((allPromise) => {
          if (previousActiveMedia) {
            allPromise.emit('unmatch', {
              name: previousActiveMedia
            });
          }
          allPromise.emit('match', {
            name: mediaName
          });
        });
      }
    });
  }

  /**
   * @name                constructor
   * @type                Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(mediaName, settings = {}) {
    if (!Array.isArray(mediaName)) mediaName = [mediaName];

    const name = mediaName.join(' ');

    super(settings, {
      id: `SMediaQuery.${name.split(' ').join('-')}`
    });

    if (!this.constructor._promisesStack[name])
      this.constructor._promisesStack[name] = [];
    this.constructor._promisesStack[name].push(this);
  }
}

// start listener
SMediaQuery.startListener();

export default SMediaQuery;

import __SApp from '@coffeekraken/sugar/js/class/SApp';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive';
import __appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag';
import __base64 from '@coffeekraken/sugar/js/crypt/base64';

export default class Squid extends __SApp {

  constructor() {

    super();

    this._importAll(require.context('../animation', false, /\.js$/), 'animation');
    this._importAll(require.context('../view', false, /\.js$/), 'view');

    // register animations
    this._registerAnimations();

    // init the lazyload listener
    this._initLazyloadListeners();

  }

  _importAll(r, scope) {
    if ( ! Squid.prototype[scope]) Squid.prototype[scope] = {};
    r.keys().forEach(key => {
      const s = key.split('/');
      Squid.prototype[scope][s[s.length - 1].replace('.js', '')] = r(key).default.bind(this);
    });
  }

  /**
   * @name                        _registerAnimations
   * @namespace                   squid.js.class.Squid
   * @type                        Function
   * @private
   *
   * Register all the native animations that can be used with Squid
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _registerAnimations() {

    const sugarInAnimations = require.context('@coffeekraken/sugar/js/animation/in', false, /\.js$/);
    sugarInAnimations.keys().forEach(key => {
      const name = key.split('/')[key.split('/').length - 1].replace('.js', '');
      this.animation.register('in', name, sugarInAnimations );
    });


    // [
    // ].forEach(a => {
    //   const name = a.split('/')[a.split('/').length - 1].replace('.js', '');
    //   this.animation.register('in', name, a);
    // });

  }

  /**
   * @name                      _initLazyloadListeners
   * @namespace                 squid.js.class.Squid
   * @type                      Function
   * @private
   *
   * Add the querySelectorLive listeners depending on the config.lazyload list of modules
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initLazyloadListeners() {
    setTimeout(() => {
      const lazyload = window.Squid.config('lazyload');
      Object.keys(lazyload).forEach((selector) => {
        __querySelectorLive(selector, ($elm, clearFn) => {
          __appendScriptTag(`/app/js/lazyload/${__base64.encrypt(selector)}.js`);
          clearFn();
        });
      });
    });
  }

};

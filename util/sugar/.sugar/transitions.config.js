/**
 * @name                    transitions
 * @namespace               sugar.config.scss
 * @type                    Object
 * @default                 { fast: 'all 0.1s ease-in-out 0s', default: 'all 0.2s ease-in-out 0s', slow: 'all 0.5s ease-in-out 0s' }
 *
 * Define all the transitions that you want here. Can be used by applying the class ```.tr-{name}``` on your elements or by
 * calling the mixin ```@include Sugar.transition(myCoolTransition);``` in your scss
 *
 * @example               js
 * {
 *    scss: {
 *      transitions: {
 *        myCoolTransition : 'all 0.1s ease-in-out 0s'
 *      }
 *    }
 * }
 *
 * @since             1.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {
  fast: 'all 0.1s ease-in-out 0s',
  default: 'all 0.2s ease-in-out 0s',
  slow: 'all 0.5s ease-in-out 0s'
};

/**
*
* @name                SMediaQuery
* @namespace            js.responsive
* @type                Class
* @extends             SPromise
* @platform          js
* @platform          ts
* @status              wip
*
* This class expose some nice and easy methods to get the active media query defined in the config.media.queries configuration
* stack, as well as register to some events list "match" or "unmatch".
*
* @param           {String}            mediaName           The media name you want to track. Can be an array of names or simple "*" to track every media queries
* @param           {Object}            [settings={}]       An object of settings to configure your media query instance
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
/**
*
* @name                this._activeMedia
* @type                String
* @static
*
* Store the active media name
*
* @since           2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                _promisesStack
* @type                Object
* @static
*
* Store all the promises for each media
*
* @since           2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              startListener
* @type              Function
* @static
*
* Add the global listener based on the "init-body-media-queries" scss mixin
*
* @since             2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              startListener
* @type              Function
* @static
*
* Add the global listener based on the "init-body-media-queries" scss mixin
*
* @since             2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                constructor
* @type                Function
* @constructor
*
* Constructor
*
* @since           2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
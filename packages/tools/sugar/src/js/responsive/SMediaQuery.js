// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name                SMediaQuery
 * @namespace            js.responsive
 * @type                Class
 * @extends             SPromise
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
class SMediaQuery extends __SPromise {
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
        if (!Array.isArray(mediaName))
            mediaName = [mediaName];
        const name = mediaName.join(' ');
        super(settings, {
            id: `SMediaQuery.${name.split(' ').join('-')}`
        });
        if (!this.constructor._promisesStack[name])
            this.constructor._promisesStack[name] = [];
        this.constructor._promisesStack[name].push(this);
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
}
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
SMediaQuery._activeMedia = 'desktop';
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
SMediaQuery._promisesStack = {};
// start listener
SMediaQuery.startListener();
export default SMediaQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01lZGlhUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWVkaWFRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sV0FBWSxTQUFRLFVBQVU7SUFnR2xDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUFFLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXZELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNkLEVBQUUsRUFBRSxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1NBQy9DLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBN0ZEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLGFBQWE7UUFDbEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxF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
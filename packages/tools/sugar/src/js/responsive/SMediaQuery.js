// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01lZGlhUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWVkaWFRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsVUFBVTtJQWdHbEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQUUsU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ2QsRUFBRSxFQUFFLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7U0FDL0MsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUE3RkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLGNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsYUFBYTtRQUNsQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFF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
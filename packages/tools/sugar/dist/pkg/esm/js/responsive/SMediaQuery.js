// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name                SMediaQuery
 * @namespace            js.responsive
 * @type                Class
 * @extends             SPromise
 * @platform          js
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
 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(mediaName, settings = {}) {
        if (!Array.isArray(mediaName))
            mediaName = [mediaName];
        const name = mediaName.join(' ');
        super(settings, {
            id: `SMediaQuery.${name.split(' ').join('-')}`,
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                                name: previousActiveMedia,
                            });
                        });
                    }
                }
                if (nameArray.indexOf(mediaName) !== -1) {
                    const promise = this._promisesStack[name];
                    const promises = this._promisesStack[name];
                    promises.forEach((promise) => {
                        promise.emit('match', {
                            name: mediaName,
                        });
                    });
                }
            });
            if (this._promisesStack['*']) {
                const allPromises = this._promisesStack['*'];
                allPromises.forEach((allPromise) => {
                    if (previousActiveMedia) {
                        allPromise.emit('unmatch', {
                            name: previousActiveMedia,
                        });
                    }
                    allPromise.emit('match', {
                        name: mediaName,
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
 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SMediaQuery._promisesStack = {};
// start listener
SMediaQuery.startListener();
export default SMediaQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sV0FBWSxTQUFRLFVBQVU7SUFnR2hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUFFLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXZELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNaLEVBQUUsRUFBRSxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1NBQ2pELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBN0ZEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxjQUFjO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLGFBQWE7UUFDaEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzVDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFFOUMsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLG1CQUFtQixFQUFFO29CQUNyQixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzRCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQ0FDcEIsSUFBSSxFQUFFLG1CQUFtQjs2QkFDNUIsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDO3FCQUNOO2lCQUNKO2dCQUNELElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTs0QkFDbEIsSUFBSSxFQUFFLFNBQVM7eUJBQ2xCLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztpQkFDTjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQy9CLElBQUksbUJBQW1CLEVBQUU7d0JBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFOzRCQUN2QixJQUFJLEVBQUUsbUJBQW1CO3lCQUM1QixDQUFDLENBQUM7cUJBQ047b0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ3JCLElBQUksRUFBRSxTQUFTO3FCQUNsQixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUE3RkQ7Ozs7Ozs7OztHQVNHO0FBQ0ksd0JBQVksR0FBRyxTQUFTLENBQUM7QUFFaEM7Ozs7Ozs7OztHQVNHO0FBQ0ksMEJBQWMsR0FBRyxFQUFFLENBQUM7QUFrRy9CLGlCQUFpQjtBQUNqQixXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7QUFFNUIsZUFBZSxXQUFXLENBQUMifQ==
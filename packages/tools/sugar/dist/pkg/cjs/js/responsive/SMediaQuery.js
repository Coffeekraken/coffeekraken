"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
class SMediaQuery extends s_promise_1.default {
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
exports.default = SMediaQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sV0FBWSxTQUFRLG1CQUFVO0lBZ0doQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFBRSxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2RCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDWixFQUFFLEVBQUUsZUFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtTQUNqRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQTdGRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsY0FBYztRQUNqQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxhQUFhO1FBQ2hCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM1QyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRTlDLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxtQkFBbUIsRUFBRTtvQkFDckIsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs0QkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0NBQ3BCLElBQUksRUFBRSxtQkFBbUI7NkJBQzVCLENBQUMsQ0FBQzt3QkFDUCxDQUFDLENBQUMsQ0FBQztxQkFDTjtpQkFDSjtnQkFDRCxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3JDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ2xCLElBQUksRUFBRSxTQUFTO3lCQUNsQixDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUMvQixJQUFJLG1CQUFtQixFQUFFO3dCQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTs0QkFDdkIsSUFBSSxFQUFFLG1CQUFtQjt5QkFDNUIsQ0FBQyxDQUFDO3FCQUNOO29CQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUNyQixJQUFJLEVBQUUsU0FBUztxQkFDbEIsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBN0ZEOzs7Ozs7Ozs7R0FTRztBQUNJLHdCQUFZLEdBQUcsU0FBUyxDQUFDO0FBRWhDOzs7Ozs7Ozs7R0FTRztBQUNJLDBCQUFjLEdBQUcsRUFBRSxDQUFDO0FBa0cvQixpQkFBaUI7QUFDakIsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBRTVCLGtCQUFlLFdBQVcsQ0FBQyJ9
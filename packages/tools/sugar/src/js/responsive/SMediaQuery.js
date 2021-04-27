// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
    class SMediaQuery extends s_promise_1.default {
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
    exports.default = SMediaQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01lZGlhUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWVkaWFRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILE1BQU0sV0FBWSxTQUFRLG1CQUFVO1FBZ0dsQzs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQUUsU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNkLEVBQUUsRUFBRSxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2FBQy9DLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQTdGRDs7Ozs7Ozs7O1dBU0c7UUFDSCxNQUFNLENBQUMsY0FBYztZQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILE1BQU0sQ0FBQyxhQUFhO1lBQ2xCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFB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
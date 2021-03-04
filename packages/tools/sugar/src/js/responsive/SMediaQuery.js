// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
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
    var SMediaQuery = /** @class */ (function (_super) {
        __extends(SMediaQuery, _super);
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
        function SMediaQuery(mediaName, settings) {
            if (settings === void 0) { settings = {}; }
            var _this = this;
            if (!Array.isArray(mediaName))
                mediaName = [mediaName];
            var name = mediaName.join(' ');
            _this = _super.call(this, settings, {
                id: "SMediaQuery." + name.split(' ').join('-')
            }) || this;
            if (!_this.constructor._promisesStack[name])
                _this.constructor._promisesStack[name] = [];
            _this.constructor._promisesStack[name].push(_this);
            return _this;
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
        SMediaQuery.getActiveMedia = function () {
            return this._activeMedia;
        };
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
        SMediaQuery.startListener = function () {
            var _this = this;
            document.addEventListener('animationend', function (e) {
                var mediaName = e.animationName.replace(/^mq-/, '');
                var previousActiveMedia = _this._activeMedia;
                // keep track of the active media
                _this._activeMedia = mediaName;
                Object.keys(_this._promisesStack).forEach(function (name) {
                    var nameArray = name.split(' ');
                    if (previousActiveMedia) {
                        if (nameArray.indexOf(previousActiveMedia) !== -1) {
                            var promises = _this._promisesStack[name];
                            promises.forEach(function (promise) {
                                promise.emit('unmatch', {
                                    name: previousActiveMedia
                                });
                            });
                        }
                    }
                    if (nameArray.indexOf(mediaName) !== -1) {
                        var promise = _this._promisesStack[name];
                        var promises = _this._promisesStack[name];
                        promises.forEach(function (promise) {
                            promise.emit('match', {
                                name: mediaName
                            });
                        });
                    }
                });
                if (_this._promisesStack['*']) {
                    var allPromises = _this._promisesStack['*'];
                    allPromises.forEach(function (allPromise) {
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
        };
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
        return SMediaQuery;
    }(SPromise_1.default));
    // start listener
    SMediaQuery.startListener();
    exports.default = SMediaQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01lZGlhUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWVkaWFRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsaUVBQTZDO0lBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSDtRQUEwQiwrQkFBVTtRQWdHbEM7Ozs7Ozs7OztXQVNHO1FBQ0gscUJBQVksU0FBUyxFQUFFLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7WUFBcEMsaUJBWUM7WUFYQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQUUsU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkQsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQyxRQUFBLGtCQUFNLFFBQVEsRUFBRTtnQkFDZCxFQUFFLEVBQUUsaUJBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHO2FBQy9DLENBQUMsU0FBQztZQUVILElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3QyxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7O1FBQ25ELENBQUM7UUE3RkQ7Ozs7Ozs7OztXQVNHO1FBQ0ksMEJBQWMsR0FBckI7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNJLHlCQUFhLEdBQXBCO1lBQUEsaUJBNkNDO1lBNUNDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FB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
// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
    }(s_promise_1.default));
    // start listener
    SMediaQuery.startListener();
    exports.default = SMediaQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01lZGlhUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9yZXNwb25zaXZlL1NNZWRpYVF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0g7UUFBMEIsK0JBQVU7UUFnR2xDOzs7Ozs7Ozs7V0FTRztRQUNILHFCQUFZLFNBQVMsRUFBRSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBQXBDLGlCQVlDO1lBWEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2dCQUFFLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZELElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakMsUUFBQSxrQkFBTSxRQUFRLEVBQUU7Z0JBQ2QsRUFBRSxFQUFFLGlCQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRzthQUMvQyxDQUFDLFNBQUM7WUFFSCxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO2dCQUN4QyxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDN0MsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDOztRQUNuRCxDQUFDO1FBN0ZEOzs7Ozs7Ozs7V0FTRztRQUNJLDBCQUFjLEdBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSSx5QkFBYSxHQUFwQjtZQUFBLGlCQTZDQztZQTVD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
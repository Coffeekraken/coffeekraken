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
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name                SMediaQuery
     * @namespace           sugar.js.responsive
     * @type                Class
     * @extends             SPromise
     * @wip
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
                                promise.trigger('unmatch', {
                                    name: previousActiveMedia
                                });
                            });
                        }
                    }
                    if (nameArray.indexOf(mediaName) !== -1) {
                        var promise = _this._promisesStack[name];
                        var promises = _this._promisesStack[name];
                        promises.forEach(function (promise) {
                            promise.trigger('match', {
                                name: mediaName
                            });
                        });
                    }
                });
                if (_this._promisesStack['*']) {
                    var allPromises = _this._promisesStack['*'];
                    allPromises.forEach(function (allPromise) {
                        if (previousActiveMedia) {
                            allPromise.trigger('unmatch', {
                                name: previousActiveMedia
                            });
                        }
                        allPromise.trigger('match', {
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
    return SMediaQuery;
});
//# sourceMappingURL=module.js.map
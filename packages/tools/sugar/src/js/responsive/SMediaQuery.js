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
    return SMediaQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01lZGlhUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWVkaWFRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxpRUFBNkM7SUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNIO1FBQTBCLCtCQUFVO1FBZ0dsQzs7Ozs7Ozs7O1dBU0c7UUFDSCxxQkFBWSxTQUFTLEVBQUUsUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTtZQUFwQyxpQkFZQztZQVhDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFBRSxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV2RCxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLFFBQUEsa0JBQU0sUUFBUSxFQUFFO2dCQUNkLEVBQUUsRUFBRSxpQkFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUc7YUFDL0MsQ0FBQyxTQUFDO1lBRUgsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDeEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzdDLEtBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7UUFDbkQsQ0FBQztRQTdGRDs7Ozs7Ozs7O1dBU0c7UUFDSSwwQkFBYyxHQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0kseUJBQWEsR0FBcEI7WUFBQSxpQkE2Q0M7WUE1Q0MsUUFBUSxDQUFDLGdCQUFnQixDQUFD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
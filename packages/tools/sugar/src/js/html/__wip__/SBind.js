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
        define(["require", "exports", "../object/SWatch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name 		SBind
     * @namespace           sugar.js.class
     * @type    Class
     *
     * This class allows to bind properties between objects, object to HTMLElement attribute and vice versa.
     *
     * @example		js
     * const binder = new SBind();
     *
     * // keep in sync the myObject2.title with the myObject1.title property
     * binder.bindObjectPath2ObjectPath(myObject1, 'title', myObject2, 'title');
     *
     * // update and HTMLElement attribute when the myObject1.title is updated
     * binder.bindObjectPath2ElementAttribute(myObject1, 'title', myHTMLElement, 'title');
     *
     * // and more...
     *
     * @author		Olivier Bossel<olivier.bossel@gmail.com>
     */
    var SWatch_1 = __importDefault(require("../object/SWatch"));
    var SBind = /** @class */ (function () {
        /**
         * @constructor
         */
        function SBind() {
            /**
             * @name              _bindStack
             * @type              Object
             * @private
             *
             * Store all the bind objects settings
             *
             * @author		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._bindStack = {
                attr2obj: {},
                obj2attr: {}
            };
            /**
             * @name                _mutationObservedElementsStack
             * @type                Array
             * @private
             *
             * Store all the mutation observers that are used to
             * be notified when attributes are updated
             *
             * @author		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._mutationObservedElementsStack = [];
            /**
             * @name                _digestsMutation
             * @type                Map
             * @private
             *
             * Store for each binded HTMLElement if each binded attributes are
             * in digest phase to avoid multiple assignement of the same attribute
             * in each digest phase
             *
             * @author		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._digestsMutation = new Map();
            // init new watcher
            this._watcher = new SWatch_1.default();
        }
        /**
         * @name                  bind
         * @type                  Function
         *
         * This method allows you to bind an Object|HTMLElement property to another Object|HTMLElement property
         * This mean that when the property of the first passed element is updated, the same property on the second
         * element will be updated as well
         *
         * @param       {Object|HTMLElement}        source            The source object
         * @param       {String}                    sourcePath        The source path to the property that you want to bind
         * @param       {Object|HTMLElement}        target            The target object
         * @param       {String}                    [targetPath=sourcePath]        The target path to the property that you want to be sync with the source element
         *
         * @author		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SBind.prototype.bind = function (source, sourcePath, target, targetPath) {
            // check if the source object is already a watched one
            if (typeof source === 'object' && !source.hasOwnProperty('__$SWatch')) {
                source = new SWatch_1.default(source);
            }
        };
        return SBind;
    }());
    exports.default = SBind;
});

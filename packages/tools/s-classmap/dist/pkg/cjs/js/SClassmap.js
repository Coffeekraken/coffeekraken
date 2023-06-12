"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SClassmapBase_1 = __importDefault(require("../shared/SClassmapBase"));
class SClassmap extends SClassmapBase_1.default {
    /**
     * @name            init
     * @type            Function
     * @static
     *
     * This method allows you to init the your SClassmap instance and store it into the document.env.SUGAR.classmap property
     *
     * @return          {SClassmap}                                    The SClassmal instance that represent the classmap.json file
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static init(settings) {
        let classmapInstance = new this(settings);
        // set the front in the env.SUGAR.front property
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.classmap = classmapInstance;
        // return the classmap instance
        return classmapInstance;
    }
    /**
     * @name           isEnabled
     * @type            Function
     * @static
     *
     * Store if the classmap if enabled or not
     *
     * @return      {Boolean}       true if enabled, false if not. Basically, the classmap is enabled if a `document.env.CLASSMAP` map exists
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static isEnabled() {
        var _a;
        return ((_a = document.env) === null || _a === void 0 ? void 0 : _a.CLASSMAP) !== undefined;
    }
    static areNativeMethodsPatched() {
        return this._areNativeMethodsPatched;
    }
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings) {
        var _a, _b;
        super(Object.assign({ map: (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.CLASSMAP) !== null && _b !== void 0 ? _b : {}, patchNativeMethods: true }, (settings !== null && settings !== void 0 ? settings : {})));
        // patch native methods
        if (this.settings.patchNativeMethods &&
            !this.constructor.areNativeMethodsPatched()) {
            this.patchNativeMethods();
        }
    }
    /**
     * @name        patchNativeMethods
     * @type        Function
     *
     * This method will patch the native methods like classList.add, style.setProperty, etc... to make use
     * of the classmap
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    patchNativeMethods() {
        const _this = this;
        // mark methods as patched
        this.constructor._areNativeMethodsPatched = true;
        // classList
        function getClassList() {
            var element = this;
            var classList = this.className.split(' ');
            classList.add = function (name) {
                var _a;
                const finalName = (_a = _this.map[name]) !== null && _a !== void 0 ? _a : name;
                if (classList.indexOf(finalName) !== -1) {
                    return;
                }
                classList.push(finalName);
                element.className = classList.join(' ');
            };
            classList.remove = function (name) {
                var _a;
                const finalName = (_a = _this.map[name]) !== null && _a !== void 0 ? _a : name;
                var index = classList.indexOf(finalName);
                if (index !== -1) {
                    classList.splice(index, 1);
                    element.className = classList.join(' ');
                }
            };
            classList.contains = function (name) {
                var _a;
                return classList.indexOf((_a = _this.map[name]) !== null && _a !== void 0 ? _a : name) !== -1;
            };
            return classList;
        }
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: getClassList,
        });
        const nativeQuerySelectorAll = Element.prototype.querySelectorAll;
        Element.prototype.querySelectorAll = function (...sels) {
            sels = sels.map((sel) => {
                return _this.patchSelector(sel);
            });
            return nativeQuerySelectorAll.call(this, sels);
        };
        const nativeQuerySelector = Element.prototype.querySelector;
        Element.prototype.querySelector = function (...sels) {
            sels = sels.map((sel) => {
                return _this.patchSelector(sel);
            });
            return nativeQuerySelector.call(this, sels);
        };
        // // style
        // // const nativeStylePrototype = HTMLElement.prototype.style;
        // function getStyle() {
        //     var element = this;
        //     // classList.contains = function (name) {
        //     //     return classList.indexOf(_this.map[name] ?? name) !== -1;
        //     // };
        //     return;
        // }
        // Object.defineProperty(HTMLElement.prototype.style, 'setProperty', {
        //     get: getStyle,
        // });
    }
    resolve(cls) {
        var _a, _b;
        return (_b = (_a = this.map[cls]) !== null && _a !== void 0 ? _a : this.map[cls.replace(/^\./, '')]) !== null && _b !== void 0 ? _b : cls;
    }
    patchElement($elm) {
        var _a, _b;
        const cls = (_b = (_a = $elm.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        const newCls = cls.map((c) => this.resolve(c));
        if ($elm.classList.contains('_package')) {
            console.log('PACKAGE', cls, newCls);
        }
        $elm.setAttribute('class', newCls.join(' '));
    }
    patchDom($rootNode) {
        var _a;
        const $elms = Array.from((_a = $rootNode.querySelectorAll('[class]')) !== null && _a !== void 0 ? _a : []);
        for (let [idx, $elm] of $elms.entries()) {
            this.patchElement($elm);
        }
    }
    patchHtml(html) {
        const classesMatches = html.match(/class="([a-zA-Z0-9_-\s]+)"/gm);
        if (classesMatches === null || classesMatches === void 0 ? void 0 : classesMatches.length) {
            classesMatches.forEach((clsStatement) => {
                let sels = clsStatement
                    .replace('class="', '')
                    .replace(/\"$/, '')
                    .split(' ');
                sels = sels.map((sel) => {
                    return this.resolve(sel);
                });
                html = html.replace(clsStatement, `class="${sels.join(' ')}"`);
            });
        }
        return html;
    }
    patchSelector(sel) {
        sel = sel
            .split(' ')
            .map((part) => {
            const classMatches = part.match(/\.[a-zA-Z0-9_-]+/gm);
            if (classMatches) {
                classMatches.forEach((cls) => {
                    var _a;
                    const clsWithoutDot = cls.slice(1);
                    part = part.replace(cls, `.${(_a = this.map[clsWithoutDot]) !== null && _a !== void 0 ? _a : clsWithoutDot}`);
                });
            }
            return part;
        })
            .join(' ');
        return sel;
    }
    /**
     * @name      loadFromUrl
     * @type        Function
     * @async
     *
     * Load a classmap from a url
     *
     * @param       {string}               url      The url to load the map from
     * @return      {Promise<Object>}               The loaded classmap
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    loadFromUrl(url) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(url).then((response) => response.json());
            this.map = res;
            resolve(res);
        }));
    }
}
exports.default = SClassmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLDRFQUFzRDtBQWlDdEQsTUFBcUIsU0FBVSxTQUFRLHVCQUFlO0lBQ2xEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUE2QjtRQUNyQyxJQUFJLGdCQUFnQixHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLO1lBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztRQUUvQywrQkFBK0I7UUFDL0IsT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsU0FBUzs7UUFDWixPQUFPLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxRQUFRLE1BQUssU0FBUyxDQUFDO0lBQ2hELENBQUM7SUFlRCxNQUFNLENBQUMsdUJBQXVCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXNDOztRQUM5QyxLQUFLLGlCQUNELEdBQUcsRUFBRSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsUUFBUSxtQ0FBSSxFQUFFLEVBQ2pDLGtCQUFrQixFQUFFLElBQUksSUFDckIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFD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
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
        this.patchDomLive();
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
            const newSels = sels.map((sel) => {
                return _this.patchSelector(sel);
            });
            return nativeQuerySelectorAll.call(this, [...sels, ...newSels]);
        };
        const nativeQuerySelector = Element.prototype.querySelector;
        Element.prototype.querySelector = function (...sels) {
            const newSels = sels.map((sel) => {
                const newSel = _this.patchSelector(sel);
                return newSel;
            });
            return nativeQuerySelector.call(this, [...sels, ...newSels]);
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
        $elm.setAttribute('class', newCls.join(' '));
    }
    patchDomLive($rootNode = document) {
        const settings = {
            afterFirst: undefined,
            rootNode: document,
            // ...settings,
        };
        // observer callback
        const patchDomLiveCallback = (mutationList) => {
            mutationList.forEach((mutation) => {
                // new nodes
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach((node) => {
                        if (!node.matches)
                            return;
                        this.patchElement(node);
                        this.patchDom(node);
                    });
                }
                if (mutation.attributeName === 'class') {
                    if (mutation.target._classmapProcessing) {
                        return;
                    }
                    clearTimeout(mutation.target._classmapTimeout);
                    mutation.target._classmapTimeout = setTimeout(() => {
                        mutation.target._classmapProcessing = true;
                        this.patchElement(mutation.target);
                        setTimeout(() => {
                            mutation.target._classmapProcessing = false;
                        });
                    });
                }
            });
        };
        // observe for classes changes to path them live
        const observer = new MutationObserver(patchDomLiveCallback);
        observer.observe($rootNode, {
            attributeFilter: ['class'],
            attributeOldValue: true,
            childList: true,
            subtree: true,
        });
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
        const newSel = sel
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
        return newSel;
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
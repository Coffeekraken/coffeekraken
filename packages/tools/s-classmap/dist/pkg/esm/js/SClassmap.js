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
import __SClassmapBase from '../shared/SClassmapBase.js';
export default class SClassmap extends __SClassmapBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLGVBQWUsTUFBTSw0QkFBNEIsQ0FBQztBQWlDekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFVLFNBQVEsZUFBZTtJQUNsRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBNkI7UUFDckMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUxQyxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSztZQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7UUFFL0MsK0JBQStCO1FBQy9CLE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLFNBQVM7O1FBQ1osT0FBTyxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsUUFBUSxNQUFLLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0lBZUQsTUFBTSxDQUFDLHVCQUF1QjtRQUMxQixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzQzs7UUFDOUMsS0FBSyxpQkFDRCxHQUFHLEVBQUUsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLFFBQVEsbUNBQUksRUFBRSxFQUNqQyxrQkFBa0IsRUFBRSxJQUFJLElBQ3JCLENBQUMsUUFBUSxhQUFSLFFBQVEs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
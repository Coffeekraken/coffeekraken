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
import __SClassmapBase from '../shared/SClassmapBase';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLGVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQWlDdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFVLFNBQVEsZUFBZTtJQUNsRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBNkI7UUFDckMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUxQyxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSztZQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7UUFFL0MsK0JBQStCO1FBQy9CLE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLFNBQVM7O1FBQ1osT0FBTyxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsUUFBUSxNQUFLLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0lBZUQsTUFBTSxDQUFDLHVCQUF1QjtRQUMxQixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzQzs7UUFDOUMsS0FBSyxpQkFDRCxHQUFHLEVBQUUsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLFFBQVEsbUNBQUksRUFBRSxFQUNqQyxrQkFBa0IsRUFBRSxJQUFJLElBQ3JCLENBQUMsUUFBUSxhQUFSLFFBQVEs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
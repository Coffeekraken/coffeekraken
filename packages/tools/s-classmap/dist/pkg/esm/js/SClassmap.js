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
        super(Object.assign({ map: (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap }, (settings !== null && settings !== void 0 ? settings : {})));
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
        // classList
        function getClassList() {
            var element = this;
            var classList = this.className.split(' ');
            classList.add = function (name) {
                var _a;
                if (classList.indexOf(name) !== -1) {
                    return;
                }
                classList.push((_a = _this.map[name]) !== null && _a !== void 0 ? _a : name);
                element.className = classList.join(' ');
            };
            classList.remove = function (name) {
                var _a;
                var index = classList.indexOf((_a = _this.map[name]) !== null && _a !== void 0 ? _a : name);
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
            const res = nativeQuerySelector.call(this, sels);
            if (!res) {
            }
            return res;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQStCdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFVLFNBQVEsZUFBZTtJQUNsRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdDOztRQUNoRCxLQUFLLGlCQUNELEdBQUcsRUFBRSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxRQUFRLElBQy9CLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLEVBQ3JCLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsa0JBQWtCO1FBQ2QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLFlBQVk7UUFDWixTQUFTLFlBQVk7WUFDakIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxJQUFJOztnQkFDMUIsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNoQyxPQUFPO2lCQUNWO2dCQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQ0FBSSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQztZQUNGLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJOztnQkFDN0IsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9B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
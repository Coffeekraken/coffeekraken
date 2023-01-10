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
exports.default = SClassmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDRFQUFzRDtBQThCdEQsTUFBcUIsU0FBVSxTQUFRLHVCQUFlO0lBQ2xEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0M7O1FBQ2hELEtBQUssaUJBQ0QsR0FBRyxFQUFFLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLFFBQVEsSUFDL0IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxrQkFBa0I7UUFDZCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbkIsWUFBWTtRQUNaLFNBQVMsWUFBWTtZQUNqQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFVLElBQUk7O2dCQUMxQixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2hDLE9BQU87aUJBQ1Y7Z0JBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1DQUFJLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDO1lBQ0YsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLElBQUk7O2dCQUM3QixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQUEsS0FBSyxDQUFDLEdBQUcs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
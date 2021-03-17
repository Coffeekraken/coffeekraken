// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name                              when
     * @namespace           sugar.js.dom
     * @type                              Function
     * @stable
     *
     * Return a promise that will be resolved when the wanted status has been applied on the passed HTMLElement.
     * The status that can be requested are:
     * - attribute : Detect when a special attribute has been applied on the element
     * --- settings.attribute : Specify the attribute to check
     * --- settings.checkFn : An optional function to check the attribute. The promise is resolved when this function return true
     *
     * - inViewport : Detect when the element enter in the viewport
     * --- settings.offset : Specify an offset to detect the in viewport state
     *
     * - outOfViewport : Detect when the element exit the viewport
     * --- settings.offset : Specify an offset to detect the out viewport state
     *
     * - transitionEnd : Detect when the css transition is finished on the element
     * --- settings.callback : An optional callback function if you prefer instead of the promise
     *
     * - visible : Detect when the element become visible
     * --- settings.callback : An optional callback function if you prefer instead of the promise
     *
     * @param               {HTMLElement}                 $node               The HTMLElement to check
     * @param               {String}                      state               The state to check on the HTMLElement
     * @param               {Object}                      [settings={}]       The settings to configure the check process
     * @return              {Promise}                                         A promise that will be resolved when the state is detected
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import when from '@coffeekraken/sugar/js/dom/when';
     * when(myCoolNode, 'inViewport').then(() => {
     *    // do something...
     * });
     *
     * @since           1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function when($node, state, settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var importPromise, args, module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        switch (state) {
                            case 'attribute':
                                importPromise = __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                                /* webpackChunkName: "whenAttribute" */ /* webpackMode: "lazy" */ './whenAttribute')); }) : new Promise(function (resolve_1, reject_1) { require(['./whenAttribute'], resolve_1, reject_1); }).then(__importStar);
                                args = [$node, settings.attribute, settings.checkFn];
                                break;
                            case 'inViewport':
                                importPromise = __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                                /* webpackChunkName: "whenInViewport" */ /* webpackMode: "lazy" */ './whenInViewport')); }) : new Promise(function (resolve_2, reject_2) { require(['./whenInViewport'], resolve_2, reject_2); }).then(__importStar);
                                args = [$node, settings.offset];
                                break;
                            case 'outOfViewport':
                                importPromise = __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                                /* webpackChunkName: "whenOutOfViewport" */ /* webpackMode: "lazy" */ './whenOutOfViewport')); }) : new Promise(function (resolve_3, reject_3) { require(['./whenOutOfViewport'], resolve_3, reject_3); }).then(__importStar);
                                args = [$node, settings.offset];
                                break;
                            case 'transitionEnd':
                                importPromise = __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                                /* webpackChunkName: "whenTransitionEnd" */ /* webpackMode: "lazy" */ './whenTransitionEnd')); }) : new Promise(function (resolve_4, reject_4) { require(['./whenTransitionEnd'], resolve_4, reject_4); }).then(__importStar);
                                args = [$node, settings.callback];
                                break;
                            case 'visible':
                                importPromise = __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                                /* webpackChunkName: "whenVisible" */ /* webpackMode: "lazy" */ './whenVisible')); }) : new Promise(function (resolve_5, reject_5) { require(['./whenVisible'], resolve_5, reject_5); }).then(__importStar);
                                args = [$node, settings.callback];
                                break;
                            default:
                                resolve($node);
                                return [2 /*return*/];
                                break;
                        }
                        return [4 /*yield*/, importPromise];
                    case 1:
                        module = _a.sent();
                        // call the when... function
                        module.default.apply(null, args).then(function () {
                            // resolve the promise
                            resolve($node);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    exports.default = when;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vd2hlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlDRztJQUNILFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBYTtRQUF6QyxpQkFrREM7UUFsRDJCLHlCQUFBLEVBQUEsYUFBYTtRQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7O3dCQUd2QyxRQUFRLEtBQUssRUFBRTs0QkFDYixLQUFLLFdBQVc7Z0NBQ2QsYUFBYTtnQ0FDWCx1Q0FBdUMsQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsOEhBQ3BGLENBQUM7Z0NBQ0YsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUNyRCxNQUFNOzRCQUNSLEtBQUssWUFBWTtnQ0FDZixhQUFhO2dDQUNYLHdDQUF3QyxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQiwrSEFDdEYsQ0FBQztnQ0FDRixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNoQyxNQUFNOzRCQUNSLEtBQUssZUFBZTtnQ0FDbEIsYUFBYTtnQ0FDWCwyQ0FBMkMsQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBcUIsa0lBQzVGLENBQUM7Z0NBQ0YsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDaEMsTUFBTTs0QkFDUixLQUFLLGVBQWU7Z0NBQ2xCLGFBQWE7Z0NBQ1gsMkNBQTJDLENBQUMseUJBQXlCLENBQUMscUJBQXFCLGtJQUM1RixDQUFDO2dDQUNGLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ2xDLE1BQU07NEJBQ1IsS0FBSyxTQUFTO2dDQUNaLGFBQWE7Z0NBQ1gscUNBQXFDLENBQUMseUJBQXlCLENBQUMsZUFBZSw0SEFDaEYsQ0FBQztnQ0FDRixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUNsQyxNQUFNOzRCQUNSO2dDQUNFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDZixzQkFBTztnQ0FDUCxNQUFNO3lCQUNUO3dCQUdjLHFCQUFNLGFBQWEsRUFBQTs7d0JBQTVCLE1BQU0sR0FBRyxTQUFtQjt3QkFFbEMsNEJBQTRCO3dCQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUNwQyxzQkFBc0I7NEJBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakIsQ0FBQyxDQUFDLENBQUM7Ozs7YUFDSixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=
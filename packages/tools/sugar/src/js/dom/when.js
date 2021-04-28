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
     * @namespace            js.dom
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
     * @param               {HTMLElement}                 $node               The HTMLElement to check
     * @param               {String}                      state               The state to check on the HTMLElement
     * @param               {Object}                      [settings={}]       The settings to configure the check process
     * @return              {Promise}                                         A promise that will be resolved when the state is detected
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
    function when($node, state, settings = {}) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // check the state to detect
            let importPromise, args;
            switch (state) {
                case 'attribute':
                    importPromise = __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "whenAttribute" */ /* webpackMode: "lazy" */ './whenAttribute'))) : new Promise((resolve_1, reject_1) => { require(['./whenAttribute'], resolve_1, reject_1); }).then(__importStar);
                    args = [$node, settings.attribute, settings.checkFn];
                    break;
                case 'inViewport':
                    importPromise = __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "whenInViewport" */ /* webpackMode: "lazy" */ './whenInViewport'))) : new Promise((resolve_2, reject_2) => { require(['./whenInViewport'], resolve_2, reject_2); }).then(__importStar);
                    args = [$node, settings.offset];
                    break;
                case 'outOfViewport':
                    importPromise = __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "whenOutOfViewport" */ /* webpackMode: "lazy" */ './whenOutOfViewport'))) : new Promise((resolve_3, reject_3) => { require(['./whenOutOfViewport'], resolve_3, reject_3); }).then(__importStar);
                    args = [$node, settings.offset];
                    break;
                case 'transitionEnd':
                    importPromise = __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "whenTransitionEnd" */ /* webpackMode: "lazy" */ './whenTransitionEnd'))) : new Promise((resolve_4, reject_4) => { require(['./whenTransitionEnd'], resolve_4, reject_4); }).then(__importStar);
                    args = [$node, settings.callback];
                    break;
                case 'visible':
                    importPromise = __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "whenVisible" */ /* webpackMode: "lazy" */ './whenVisible'))) : new Promise((resolve_5, reject_5) => { require(['./whenVisible'], resolve_5, reject_5); }).then(__importStar);
                    args = [$node, settings.callback];
                    break;
                default:
                    resolve($node);
                    return;
                    break;
            }
            // wait until the module is loaded
            const module = yield importPromise;
            // call the when... function
            module.default.apply(null, args).then(() => {
                // resolve the promise
                resolve($node);
            });
        }));
    }
    exports.default = when;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vd2hlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlDRztJQUNILFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyw0QkFBNEI7WUFDNUIsSUFBSSxhQUFhLEVBQUUsSUFBSSxDQUFDO1lBQ3hCLFFBQVEsS0FBSyxFQUFFO2dCQUNiLEtBQUssV0FBVztvQkFDZCxhQUFhO29CQUNYLHVDQUF1QyxDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixxSEFDcEYsQ0FBQztvQkFDRixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JELE1BQU07Z0JBQ1IsS0FBSyxZQUFZO29CQUNmLGFBQWE7b0JBQ1gsd0NBQXdDLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLHNIQUN0RixDQUFDO29CQUNGLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1IsS0FBSyxlQUFlO29CQUNsQixhQUFhO29CQUNYLDJDQUEyQyxDQUFDLHlCQUF5QixDQUFDLHFCQUFxQix5SEFDNUYsQ0FBQztvQkFDRixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQyxNQUFNO2dCQUNSLEtBQUssZUFBZTtvQkFDbEIsYUFBYTtvQkFDWCwyQ0FBMkMsQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBcUIseUhBQzVGLENBQUM7b0JBQ0YsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsTUFBTTtnQkFDUixLQUFLLFNBQVM7b0JBQ1osYUFBYTtvQkFDWCxxQ0FBcUMsQ0FBQyx5QkFBeUIsQ0FBQyxlQUFlLG1IQUNoRixDQUFDO29CQUNGLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2xDLE1BQU07Z0JBQ1I7b0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNmLE9BQU87b0JBQ1AsTUFBTTthQUNUO1lBRUQsa0NBQWtDO1lBQ2xDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBYSxDQUFDO1lBRW5DLDRCQUE0QjtZQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDekMsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLElBQUksQ0FBQyJ9
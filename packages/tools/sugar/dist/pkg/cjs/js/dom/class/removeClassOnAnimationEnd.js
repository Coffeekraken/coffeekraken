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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const whenAnimationEnd_1 = __importDefault(require("../detect/whenAnimationEnd"));
/**
 * @name      removeClassOnAnimationEnd
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status      stable
 *
 * Remove some class on animation end
 *
 * @param    {HTMLElement}    $elm    The element to take care of
 * @param    {String|String[]}    cls    The class or classes (Array) to remove
 * @return   {Promise<HTMLElement>}                  A promise that will be resolved once the class has been removed and the animation finished
 *
 * @todo      tests
 *
 * @example    js
 * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
 * removeClassOnAnimationEnd(myCoolElm, 'my-class');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function removeClassOnAnimationEnd($elm, cls) {
    return new s_promise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
        // wait end of animation
        yield (0, whenAnimationEnd_1.default)($elm);
        // remove class
        if (!Array.isArray(cls))
            cls = [cls];
        // remove the cls
        cls.forEach((_cls) => {
            $elm.classList.remove(_cls);
        });
        // resolve the process
        resolve($elm);
    }));
}
exports.default = removeClassOnAnimationEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxrRkFBNEQ7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMseUJBQXlCLENBQzlCLElBQWlCLEVBQ2pCLEdBQXNCO0lBRXRCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3hDLHdCQUF3QjtRQUN4QixNQUFNLElBQUEsMEJBQWtCLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsZUFBZTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLGlCQUFpQjtRQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxzQkFBc0I7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUseUJBQXlCLENBQUMifQ==
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            adoptStyleInShadowRoot
 * @namespace       js.css
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to make a shadowRoot element adopt his host context styles
 *
 * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
 * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
 * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
 *
 * @snippet         __adoptStyleInShadowRoot($1)
 *
 * @todo        tests
 *
 * @example         js
 * import { __adoptStyleInShadowRoot } from '@coffeekraken/sugar/dom';
 * const myShadowRoot = $myElement.shadowRoot;
 * await __adoptStyleInShadowRoot(myShadowRoot);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function __adoptStyleInShadowRoot($shadowRoot, $context = document) {
    return __awaiter(this, void 0, void 0, function* () {
        const $links = $context.querySelectorAll('link[rel="stylesheet"]');
        if ($links && $shadowRoot) {
            Array.from($links).forEach(($link) => __awaiter(this, void 0, void 0, function* () {
                $shadowRoot === null || $shadowRoot === void 0 ? void 0 : $shadowRoot.appendChild($link.cloneNode());
            }));
        }
        return true;
    });
}
exports.default = __adoptStyleInShadowRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQThCLHdCQUF3QixDQUNsRCxXQUF3QixFQUN4QixXQUEwQyxRQUFROztRQUVsRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNuRSxJQUFJLE1BQU0sSUFBSSxXQUFXLEVBQUU7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUEsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUE7QUFYRCwyQ0FXQyJ9
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wait_1 = __importDefault(require("../../../shared/time/wait"));
/**
 * @name      clearFocus
 * @namespace            js.dom.focus
 * @type      Function
 * @platform          js
 * @status        beta
 * @async
 *
 * Unfocus everything that can be focused by focusing an empty floating div added just for that and bluring it.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import clearFocus from '@coffeekraken/sugar/js/dom/focus/clearFocus';
 * clearFocus($input);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
function clearFocus($input) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const $div = document.createElement('div');
        $div.setAttribute('tabindex', '-1');
        $div.style.position = 'fixed';
        $div.style.top = 0;
        $div.style.left = 0;
        document.body.appendChild($div);
        const $overlay = document.createElement('div');
        $overlay.style.position = 'fixed';
        $overlay.style.width = '100vw';
        $overlay.style.height = '100vh';
        $overlay.style.top = 0;
        $overlay.style.left = 0;
        $overlay.style.zIndex = 999999999;
        $overlay.style.backgroundColor = 'rgba(0,0,0,0.2)';
        document.body.appendChild($overlay);
        (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
        yield (0, wait_1.default)(2000);
        $div.focus();
        yield (0, wait_1.default)();
        $div.blur();
        yield (0, wait_1.default)();
        $overlay.remove();
        $div.remove();
    });
}
exports.default = clearFocus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQStDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQThCLFVBQVUsQ0FBQyxNQUFNOzs7UUFDM0MsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDL0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDeEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDO1FBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBDLE1BQUEsTUFBQSxRQUFRLENBQUMsYUFBYSwwQ0FBRSxJQUFJLGtEQUFJLENBQUM7UUFFakMsTUFBTSxJQUFBLGNBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixNQUFNLElBQUEsY0FBTSxHQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLElBQUEsY0FBTSxHQUFFLENBQUM7UUFDZixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztDQUNqQjtBQTNCRCw2QkEyQkMifQ==
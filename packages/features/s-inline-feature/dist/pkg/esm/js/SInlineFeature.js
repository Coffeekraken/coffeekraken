var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SInlineFeatureInterface from './interface/SInlineFeatureInterface.js';
// @ts-ignore
import '../../../../src/css/s-inline-feature.css'; // relative to /dist/pkg/esm/js
/**
 * @name            SInlineFeature
 * @as              Inline feature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SInlineFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to inline things like svg, and maybe more to come.
 *
 * @feature         Inline svg images
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @import          import { define as __SInlineFeatureDefine } from '@coffeekraken/s-inline-feature';
 *
 * @snippet         __SInlineFeatureDefine($1)
 *
 * @install         js
 * import { define as __SInlineFeatureDefine } from '@coffeekraken/s-inline-feature';
 * __SInlineFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @example         html        Inline svg image
 * <img s-inline src="/dist/img/illustrations/stack.svg" />
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SInlineFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-inline',
            interface: __SInlineFeatureInterface,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        // determine what is it to inline
        if (this.node.tagName === 'IMG') {
            const src = this.node.src;
            this._inlineImg(src);
        }
        else {
            throw new Error(`Sorry but your s-inline marked Element cannot be inlined. At least for now...`);
        }
    }
    /**
     * Inline image like SVG
     */
    _inlineImg(src) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield fetch(src);
            const text = yield r.text();
            const parser = new DOMParser();
            const $svg = (parser.parseFromString(text, 'text/html').body.firstChild);
            // copy classes
            $svg.setAttribute('class', this.node.getAttribute('class'));
            this.node.after($svg);
            this.node.remove();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLGFBQWE7QUFDYixPQUFPLDBDQUEwQyxDQUFDLENBQUMsK0JBQStCO0FBS2xGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFVBQVU7SUFDbEQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxVQUFVO1lBQ2hCLFNBQVMsRUFBRSx5QkFBeUI7U0FDdkMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFDRCxLQUFLO1FBQ0QsaUNBQWlDO1FBQ2pDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7YUFBTTtZQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsK0VBQStFLENBQ2xGLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNHLFVBQVUsQ0FBQyxHQUFHOztZQUNoQixNQUFNLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU1QixNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxHQUFnQixDQUN0QixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUM1RCxDQUFDO1lBRUYsZUFBZTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixDQUFDO0tBQUE7Q0FDSiJ9
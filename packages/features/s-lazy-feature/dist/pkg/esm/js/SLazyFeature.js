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
import __SLazyFeatureInterface from './interface/SLazyFeatureInterface';
// @ts-ignore
import __css from '../../../../src/css/s-lazy-feature.css'; // relative to /dist/pkg/esm/js
/**
 * @name            SLazyFeature
 * @as              Template features
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SLazyFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to lazy load things like images, template, etc...
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @import          import { define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
 *
 * @snippet         __SLazyFeatureDefine($1)
 *
 * @install         js
 * import { define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
 * __SLazyFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @example         html        Template        Simply add the "s-lazy" on your template tag and template content will be appended right after when it comes in the viewport
 * <template s-lazy>
 *      <!-- my normal code... -->
 * </template>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SLazyFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-lazy',
            interface: __SLazyFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            let $container, $content;
            if (this.node.tagName === 'TEXTAREA') {
                const parser = new DOMParser();
                const html = this.node.value;
                const $dom = parser.parseFromString(html, 'text/html');
                $content = $dom.body.children[0];
                $container = $dom.body.children[0];
            }
            else {
                $content = this.node.content;
                $container = $content.children[0];
            }
            this.utils.fastdom.mutate(() => {
                this.node.parentNode.insertBefore($content, this.node);
                this.node.remove();
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHVCQUF1QixNQUFNLG1DQUFtQyxDQUFDO0FBRXhFLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSx3Q0FBd0MsQ0FBQyxDQUFDLCtCQUErQjtBQUkzRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxVQUFVO0lBQ2hELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsUUFBUTtZQUNkLFNBQVMsRUFBRSx1QkFBdUI7WUFDbEMsS0FBSyxFQUFFLEtBQUs7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUNLLEtBQUs7O1lBQ1AsSUFBSSxVQUFVLEVBQUUsUUFBUSxDQUFDO1lBRXpCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZELFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDN0IsVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckM7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKIn0=
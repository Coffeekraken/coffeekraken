"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SAssetPickerComponentInterface_1 = __importDefault(require("./interface/SAssetPickerComponentInterface"));
// @ts-ignore
const s_asset_picker_css_1 = __importDefault(require("../../../../src/css/s-asset-picker.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
/**
 * @name                SAssetPickerComponent
 * @as                  Asset picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SAssetPickerComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-asset-picker
 * @platform            html
 * @status              beta
 *
 * This component allows you to select an asset from some provided assets library.
 * You can also "upload" some files like an image, etc...
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-asset-picker-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-asset-picker-component';
 * define();
 *
 * @example         html        Copy from an input
 * <s-asset-picker></s-asset-picker>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SAssetPickerComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-asset-picker',
            interface: SAssetPickerComponentInterface_1.default,
        }));
        this.state = {
            status: 'pending',
        };
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SAssetPickerComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_asset_picker_css_1.default)}
        `;
    }
    render() {
        return (0, lit_1.html) ` <div>Hello</div> `;
    }
}
exports.default = SAssetPickerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGdIQUEwRjtBQUUxRixhQUFhO0FBQ2IsZ0dBQTJELENBQUMsK0JBQStCO0FBRTNGLHNEQUFnQztBQW9FWCxpQkFwRWQsZ0JBQVEsQ0FvRVk7QUFoRTNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFFSCxNQUFxQixxQkFBc0IsU0FBUSx5QkFBZTtJQWtCOUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsd0NBQWdDO1NBQzlDLENBQUMsQ0FDTCxDQUFDO1FBVk4sVUFBSyxHQUFHO1lBQ0osTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztJQVNGLENBQUM7SUF4QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0Ysd0NBQWdDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsNEJBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQWVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBLG9CQUFvQixDQUFDO0lBQ3BDLENBQUM7Q0FDSjtBQTlCRCx3Q0E4QkMifQ==
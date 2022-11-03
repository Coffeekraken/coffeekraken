import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SAssetPickerComponentInterface from './interface/SAssetPickerComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-asset-picker.css'; // relative to /dist/pkg/esm/js
import __define from './define';
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
export default class SAssetPickerComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-asset-picker',
            interface: __SAssetPickerComponentInterface,
        }));
        this.state = {
            status: 'pending',
        };
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SAssetPickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    render() {
        return html ` <div>Hello</div> `;
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUUxRixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sd0NBQXdDLENBQUMsQ0FBQywrQkFBK0I7QUFFM0YsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBSWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHFCQUFzQixTQUFRLGVBQWU7SUFrQjlEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsU0FBUyxFQUFFLGdDQUFnQztTQUM5QyxDQUFDLENBQ0wsQ0FBQztRQVZOLFVBQUssR0FBRztZQUNKLE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFTRixDQUFDO0lBeEJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsZ0NBQWdDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFlRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUEsb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFFLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQyJ9
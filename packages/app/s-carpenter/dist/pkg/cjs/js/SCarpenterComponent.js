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
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SCarpenterComponentInterface_1 = __importDefault(require("./interface/SCarpenterComponentInterface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const datetime_1 = require("@coffeekraken/sugar/datetime");
const dom_2 = require("@coffeekraken/sugar/dom");
const s_carpenter_component_css_1 = __importDefault(require("../../../../src/css/s-carpenter-component.css")); // relative to /dist/pkg/esm/js
/**
 * @name                SCarpenterComponent
 * @as                  Carpenter
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCarpenterComponentInterface.ts
 * @platform            html
 * @status              beta
 *
 * This component represent a carpenter UI that display some components/section/etc... and let you change their properties
 * on the fly to see how it behave
 *
 * @todo               documentation
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-carpenter
 *
 * @snippet             __defineSCarpenterComponent()
 *
 * @example           js
 * import { define as __defineSCarpenterComponent } from '@coffeekraken/s-carpenter';
 * __defineSCarpenterComponent();
 *
 * @install           js
 * import { define as __defineSCarpenterComponent } from '@coffeekraken/s-carpenter';
 * __defineSCarpenterComponent();
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCarpenterComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCarpenterComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_carpenter_component_css_1.default)}
        `;
    }
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-carpenter',
            interface: SCarpenterComponentInterface_1.default,
            carpenter: s_sugar_config_1.default.get('carpenter'),
        }));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // do not mount if is in an iframe
            if ((0, dom_1.__isInIframe)()) {
                return;
            }
            this._$iframe = document.createElement('iframe');
            // inject the current page content inside the iframe
            const iframeHtml = `
            <script type="module" defer src="${this.props.src}"></script>
            <s-carpenter-app></s-caprenter-app>    
        `;
            // add the correct class on the iframe
            this._$iframe.classList.add(this.utils.cls('_editor-iframe'));
            // make sure we don't have any src on the iframe
            this._$iframe.setAttribute('src', 'about:blank');
            // set a name to the iframe
            this._$iframe.setAttribute('name', 's-carpenter-editor');
            // manage to add the iframe inside the body
            // alongside with the s-carpenter component
            this.remove();
            document.body.appendChild(this._$iframe);
            // wait for the iframe to be ready
            // @TODO        check for better solution
            yield (0, datetime_1.__wait)(500);
            // inject the iframe content
            (0, dom_2.__injectIframeContent)(this._$iframe, iframeHtml);
            // // set the document to search in
            // // which will be the iframe document
            // this._$document = this._$iframe.contentWindow.document;
            // // listen for escape in the iframe
            // this._$document.addEventListener('keyup', (e) => {
            //     if (e.keyCode == 27) {
            //         this._closeEditor();
            //     }
            // });
            // // add the "in-iframe" class
            // this._$document.body.classList.add(this.utils.cls('-in-iframe'));
        });
    }
    render() {
        return '';
    }
}
exports.default = SCarpenterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxpREFBdUQ7QUFDdkQsdURBQXlEO0FBQ3pELDZCQUFxQztBQUNyQyw0R0FBc0Y7QUFFdEYsa0ZBQTBEO0FBRTFELHNEQUFnQztBQWtKWCxpQkFsSmQsZ0JBQVEsQ0FrSlk7QUFoSjNCLGFBQWE7QUFDYiwyREFBc0Q7QUFDdEQsaURBQWdFO0FBQ2hFLDhHQUFrRSxDQUFDLCtCQUErQjtBQXNCbEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFxQixtQkFBb0IsU0FBUSx5QkFBZTtJQUM1RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixzQ0FBOEIsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxtQ0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBT0Q7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsU0FBUyxFQUFFLHNDQUE4QjtZQUN6QyxTQUFTLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVLLEtBQUs7O1lBQ1Asa0NBQWtDO1lBQ2xDLElBQUksSUFBQSxrQkFBWSxHQUFFLEVBQUU7Z0JBQ2hCLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVqRCxvREFBb0Q7WUFDcEQsTUFBTSxVQUFVLEdBQUc7K0NBQ29CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7U0FFcEQsQ0FBQztZQUVGLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBRTlELGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFakQsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBRXpELDJDQUEyQztZQUMzQywyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLGtDQUFrQztZQUNsQyx5Q0FBeUM7WUFDekMsTUFBTSxJQUFBLGlCQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEIsNEJBQTRCO1lBQzVCLElBQUEsMkJBQXFCLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVqRCxtQ0FBbUM7WUFDbkMsdUNBQXVDO1lBQ3ZDLDBEQUEwRDtZQUUxRCxxQ0FBcUM7WUFDckMscURBQXFEO1lBQ3JELDZCQUE2QjtZQUM3QiwrQkFBK0I7WUFDL0IsUUFBUTtZQUNSLE1BQU07WUFFTiwrQkFBK0I7WUFDL0Isb0VBQW9FO1FBQ3hFLENBQUM7S0FBQTtJQUVELE1BQU07UUFDRixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQWxGRCxzQ0FrRkMifQ==
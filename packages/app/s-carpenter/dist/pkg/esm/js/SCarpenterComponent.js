var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __isInIframe } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, unsafeCSS } from 'lit';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './define';
// @ts-ignore
import { __wait } from '@coffeekraken/sugar/datetime';
import { __injectIframeContent } from '@coffeekraken/sugar/dom';
import __css from '../../../../src/css/s-carpenter-component.css'; // relative to /dist/pkg/esm/js
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
export default class SCarpenterComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SCarpenterComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    constructor() {
        super(__deepMerge({
            name: 's-carpenter',
            interface: __SCarpenterComponentInterface,
            carpenter: __SSugarConfig.get('carpenter'),
        }));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // do not mount if is in an iframe
            if (__isInIframe()) {
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
            yield __wait(500);
            // inject the iframe content
            __injectIframeContent(this._$iframe, iframeHtml);
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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDckMsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsYUFBYTtBQUNiLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQyxDQUFDLCtCQUErQjtBQXNCbEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUFDNUQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRiw4QkFBOEIsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQU9EO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSw4QkFBOEI7WUFDekMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVLLEtBQUs7O1lBQ1Asa0NBQWtDO1lBQ2xDLElBQUksWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVqRCxvREFBb0Q7WUFDcEQsTUFBTSxVQUFVLEdBQUc7K0NBQ29CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7U0FFcEQsQ0FBQztZQUVGLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBRTlELGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFakQsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBRXpELDJDQUEyQztZQUMzQywyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLGtDQUFrQztZQUNsQyx5Q0FBeUM7WUFDekMsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEIsNEJBQTRCO1lBQzVCLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFakQsbUNBQW1DO1lBQ25DLHVDQUF1QztZQUN2QywwREFBMEQ7WUFFMUQscUNBQXFDO1lBQ3JDLHFEQUFxRDtZQUNyRCw2QkFBNkI7WUFDN0IsK0JBQStCO1lBQy9CLFFBQVE7WUFDUixNQUFNO1lBRU4sK0JBQStCO1lBQy9CLG9FQUFvRTtRQUN4RSxDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0YsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFFRCxPQUFPLEVBQUUsUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFDIn0=
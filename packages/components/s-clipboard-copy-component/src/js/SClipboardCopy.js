var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, property, css, unsafeCSS } from 'lit-element';
import __SClipboardCopyComponentInterface from './interface/SClipboardCopyComponentInterface';
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import __copy from '@coffeekraken/sugar/js/clipboard/copy';
// @ts-ignore
import __css from '../css/s-clipboard-copy.css';
export default class SClipboardCopy extends SLitElement {
    constructor() {
        super();
        this._state = 'pending';
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SClipboardCopyComponentInterface,
                defaultProps: {},
            },
        });
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    firstUpdated() { }
    /**
     * @name                copy
     * @type                Function
     *
     * This method allows you to copy some text through the s-clipboard-copy component that will
     * update itself to display the copy state.
     *
     * @param       {String}            text            The text you want to copy
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    copy(text) {
        this._state = 'copy';
        __copy(text)
            .then(() => {
            this._state = 'success';
            setTimeout(() => {
                this._state = 'pending';
            }, this._component.props.successTimeout);
        })
            .catch((e) => {
            this._state = 'error';
            setTimeout(() => {
                this._state = 'pending';
            }, this._component.props.errorTimeout);
        });
    }
    render() {
        return html `
            <div class="root" ref="root" state="${this._state}">
                <svg
                    ref="svg"
                    class="icon-copy"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0)">
                        <path d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z" fill="currentColor" />
                        <path
                            d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z"
                            fill="currentColor"
                        />
                        <path d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z" fill="currentColor" />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="20" height="20" fill="currentColor" />
                        </clipPath>
                    </defs>
                </svg>
                <svg
                    class="icon-success"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <svg
                    class="icon-error"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
        `;
    }
}
__decorate([
    property()
], SClipboardCopy.prototype, "_state", void 0);
export function webcomponent(props = {}, tagName = 's-clipboard-copy') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SClipboardCopy);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaXBib2FyZENvcHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2xpcGJvYXJkQ29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUE2QixNQUFNLGFBQWEsQ0FBQztBQUN4RixPQUFPLGtDQUFrQyxNQUFNLDhDQUE4QyxDQUFDO0FBQzlGLE9BQU8saUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRixPQUFPLE1BQU0sTUFBTSx1Q0FBdUMsQ0FBQztBQUczRCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sNkJBQTZCLENBQUM7QUFPaEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsV0FBVztJQVluRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBSFosV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUlmLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsa0NBQWtDO2dCQUM3QyxZQUFZLEVBQUUsRUFBRTthQUNuQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuQkQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFnQkQsWUFBWSxLQUFJLENBQUM7SUFFakI7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUMsSUFBSTtRQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDUCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDeEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUM1QixDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUN0QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzVCLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7a0RBQytCLElBQUksQ0FBQyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXdEcEQsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXJHRztJQURDLFFBQVEsRUFBRTs4Q0FDUTtBQXVHdkIsTUFBTSxVQUFVLFlBQVksQ0FBQyxRQUFnRCxFQUFFLEVBQUUsT0FBTyxHQUFHLGtCQUFrQjtJQUN6RyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ25ELENBQUMifQ==
import{css,unsafeCSS,html}from"lit";import{property}from"lit/decorators.js";import __SInterface from"@coffeekraken/s-interface";import __SLitComponent from"@coffeekraken/s-lit-component";import __copy from"@coffeekraken/sugar/js/clipboard/copy";import __deepMerge from"@coffeekraken/sugar/shared/object/deepMerge";class SClipboardCopyComponentInterface extends __SInterface{static get _definition(){return{successTimeout:{description:'Specify the duration for displaying the "success" icon',type:"Number",default:1500},errorTimeout:{description:'Specify the duration for displaying the "error" icon',type:"Number",default:3e3}}}}var __css=".s-clipboard-copy {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    position: relative;\n    cursor: pointer;\n}\n\n    .s-clipboard-copy:not([mounted]) > * {\n        opacity: 0.001;\n        pointer-events: none;\n    }\n\n    .s-clipboard-copy[state='pending'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy[state='copy'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy[state='success'] {\n        color: hsla(calc(var(--s-theme-color-success-h, 0) + var(--s-theme-color-success-spin ,0)),calc((var(--s-theme-color-success-s, 0)) * 1%),calc((var(--s-theme-color-success-l, 0)) * 1%),var(--s-theme-color-success-a, 1));\n    }\n\n    .s-clipboard-copy[state='success'] .icon-success {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy[state='error'] {\n        color: hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0)) * 1%),calc((var(--s-theme-color-error-l, 0)) * 1%),var(--s-theme-color-error-a, 1));\n    }\n\n    .s-clipboard-copy[state='error'] .icon-error {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy svg {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        display: block;\n        width: 1em;\n        height: 1em;\n        background-size: contain;\n        opacity: 0;\n        pointer-events: none;\n    }\n",__decorate=globalThis&&globalThis.__decorate||function(e,o,t,r){var s,n=arguments.length,c=n<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,o,t,r);else for(var i=e.length-1;0<=i;i--)(s=e[i])&&(c=(n<3?s(c):3<n?s(o,t,c):s(o,t))||c);return 3<n&&c&&Object.defineProperty(o,t,c),c};class SClipboardCopy extends __SLitComponent{constructor(){super(__deepMerge({litComponent:{shadowDom:!1},componentUtils:{interface:SClipboardCopyComponentInterface}})),this._state="pending"}static get styles(){return css`
            ${unsafeCSS(__css)}
        `}copy(e){this._state="copy",__copy(e).then(()=>{this._state="success",setTimeout(()=>{this._state="pending"},this.props.successTimeout)}).catch(e=>{this._state="error",setTimeout(()=>{this._state="pending"},this.props.errorTimeout)})}render(){return html`
            <div
                class="${this.componentUtils.className("")}"
                state="${this._state}"
            >
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
                        <path
                            d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z"
                            fill="currentColor"
                        />
                        <path
                            d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z"
                            fill="currentColor"
                        />
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
                    <polygon
                        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                    ></polygon>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
        `}}function define(e={},o="s-clipboard-copy"){__SLitComponent.setDefaultProps(o,e),customElements.define(o,SClipboardCopy)}__decorate([property()],SClipboardCopy.prototype,"_state",void 0);export{SClipboardCopy as default,define};
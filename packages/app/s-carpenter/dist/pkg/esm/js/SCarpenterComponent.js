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
import { css, html, unsafeCSS } from 'lit';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './define';
// @ts-ignore
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
            __SLitComponent.setDefaultProps('s-carpenter-app', this.props);
            // listen for the s-carpenter-app.ready event
            document.addEventListener('s-carpenter-app.ready', (e) => {
                this.remove();
                // this.state.status = 'ready';
                // setTimeout(() => {
                //     this.remove();
                // }, 1000);
            });
            // auto init when the props.autoInit is set to true
            // or that the document.location.hash is "#carpenter"
            if (this.props.autoInit) {
                return this._initEditor();
            }
        });
    }
    _initEditor() {
        var _a;
        // update status to loading
        this.state.status = 'loading';
        // create the iframe that will contain the actual editor
        this._$editorIframe = document.createElement('iframe');
        this._$editorIframe.classList.add(this.utils.cls('_editor-iframe'));
        this._$editorIframe.setAttribute('src', 'about:blank');
        this._$editorIframe.setAttribute('name', 's-carpenter-editor');
        this._$editorIframe.setAttribute('scrolling', 'no');
        document.body.appendChild(this._$editorIframe);
        // inject the current page content inside the iframe
        const iframeHtml = `
            <script type="module" defer src="${this.props.src}"></script>
            <s-carpenter-app id="${(_a = this.props.id) !== null && _a !== void 0 ? _a : 's-carpenter'}" save-state ${this.props.values
            ? `values='${JSON.stringify(this.props.values)}'`
            : ''} ${this.props.specs
            ? `specs='${JSON.stringify(this.props.specs)}'`
            : ''} ${this.props.source
            ? `source='${JSON.stringify(this.props.source)}'`
            : ''}></s-caprenter-app>    
        `;
        // inject the iframe content
        __injectIframeContent(this._$editorIframe, iframeHtml);
    }
    _carpenterLogo() {
        return html `
            <svg
                width="62"
                height="64"
                viewBox="0 0 62 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.7641 10.3858V1.70592C13.7641 0.941977 14.5861 0.460164 15.2527 0.833363L36.9359 12.9732C37.2517 13.15 37.4473 13.4837 37.4473 13.8457V38.8719C37.4473 39.6456 36.6064 40.1262 35.9397 39.7335L28.0526 35.0868C27.7475 34.907 27.5602 34.5793 27.5602 34.2252V19.5822C27.5602 19.2266 27.3713 18.8977 27.0641 18.7185L14.2603 11.2496C13.953 11.0704 13.7641 10.7415 13.7641 10.3858Z"
                    fill="black"
                />
                <path
                    d="M9.07011 58.8847L1.48646 63.1071C0.819001 63.4787 -0.00179823 62.995 2.95924e-06 62.231L0.058594 37.3808C0.0594475 37.0188 0.25586 36.6856 0.572132 36.5095L22.4376 24.3353C23.1136 23.9589 23.9426 24.4599 23.9238 25.2334L23.7007 34.3848C23.6921 34.7388 23.4968 35.0619 23.1875 35.2342L10.3939 42.3574C10.0831 42.5304 9.88765 42.8554 9.88052 43.211L9.58345 58.031C9.57632 58.3866 9.38086 58.7117 9.07011 58.8847Z"
                    fill="black"
                />
                <path
                    d="M53.4768 38.5712L60.9938 42.9112C61.6554 43.2931 61.6617 44.2458 61.0052 44.6365L39.6502 57.3448C39.3392 57.53 38.9523 57.5325 38.6388 57.3515L16.9655 44.8384C16.2955 44.4516 16.2997 43.483 16.9732 43.102L24.9409 38.5949C25.2492 38.4205 25.6266 38.4222 25.9333 38.5993L38.6144 45.9207C38.9225 46.0986 39.3018 46.0994 39.6106 45.923L52.4807 38.569C52.7895 38.3925 53.1688 38.3934 53.4768 38.5712Z"
                    fill="black"
                />
            </svg>
        `;
    }
    render() {
        return html `
            ${!this.props.autoInit &&
            (this.state.status === 'idle' || this.state.status === 'loading')
            ? html `
                      <button
                          s-carpenter-initial-ui
                          class="${this.utils.cls('_open-btn')} ${this.state
                .status}"
                          @click=${() => {
                this._initEditor();
            }}
                      >
                          ${this._carpenterLogo()}
                      </button>
                  `
            : ''}
            ${this.state.status === 'loading'
            ? html `
                      <div
                          s-carpenter-initial-ui
                          style="opacity: 0"
                          class="${this.utils.cls('_loading')}"
                      >
                          <div class="_inner">
                              <div class="_logo">
                                  <div class="_picto">
                                      <div
                                          class="_loader carpenter-loader-blocks"
                                      >
                                          <div class="_block-1"></div>
                                          <div class="_block-2"></div>
                                          <div class="_block-3"></div>
                                      </div>
                                  </div>

                                  <svg
                                      width="259"
                                      height="59"
                                      viewBox="0 0 259 59"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                      <g opacity="0.5">
                                          <path
                                              d="M34.6797 5.5957V0.732422H40.3047V14.8828H34.5625C33.1172 12.0508 32.1348 9.84375 29.6152 8.26172C27.0957 6.67969 25.332 5.88867 22.3242 5.88867C19.4141 5.88867 16.8164 6.66016 14.5312 8.20312C12.2461 9.72656 10.459 11.7773 9.16992 14.3555C7.90039 16.9141 7.26562 19.668 7.26562 22.6172C7.26562 25.6641 7.92969 28.4766 9.25781 31.0547C10.6055 33.6328 12.4512 35.6934 14.7949 37.2363C17.1387 38.7793 19.7461 39.5508 22.6172 39.5508C26.1523 39.5508 29.2773 38.4766 31.9922 36.3281C34.707 34.1602 36.6895 31.0938 37.9395 27.1289L43.5645 30.1172C42.041 35.0391 39.3457 38.8574 35.4785 41.5723C31.6309 44.2676 27.1094 45.6152 21.9141 45.6152C17.6367 45.6152 13.8379 44.5996 10.5176 42.5684C7.19727 40.5176 4.60938 37.7734 2.75391 34.3359C0.917969 30.8789 0 27.0898 0 22.9688C0 18.4961 0.9375 14.5117 2.8125 11.0156C4.70703 7.51953 7.31445 4.81445 10.6348 2.90039C13.9551 0.966797 17.7539 0 22.0312 0C24.9023 0 26.5488 0.478516 28.9707 1.43555C31.3926 2.39258 32.6289 3.7793 34.6797 5.5957Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M65.459 24.9609V39.4922H70.6152V44.8828H60.127V41.1035C57.1973 43.9746 53.9355 45.4102 50.3418 45.4102C48.4473 45.4102 46.709 44.9707 45.127 44.0918C43.5645 43.2129 42.3047 42.041 41.3477 40.5762C40.4102 39.0918 39.9414 37.4512 39.9414 35.6543C39.9414 33.7207 40.459 32.002 41.4941 30.498C42.5488 28.9746 43.9648 27.8027 45.7422 26.9824C47.5195 26.1621 49.3066 25.752 51.1035 25.752C54.1113 25.752 56.9141 26.6309 59.5117 28.3887V25.0781C59.5117 22.6758 59.0039 20.957 57.9883 19.9219C56.9727 18.8867 55.3027 18.3691 52.9785 18.3691C51.3379 18.3691 49.9609 18.6719 48.8477 19.2773C47.7539 19.8633 46.8457 20.7617 46.123 21.9727L40.3223 20.5371C41.6309 18.0957 43.3984 16.2793 45.625 15.0879C47.8516 13.877 50.498 13.2715 53.5645 13.2715C57.6855 13.2715 60.6934 14.209 62.5879 16.084C64.502 17.959 65.459 20.918 65.459 24.9609ZM51.1621 40.752C54.1309 40.752 56.9141 39.5117 59.5117 37.0312V33.4277C56.875 31.377 54.2383 30.3516 51.6016 30.3516C50 30.3516 48.6133 30.8594 47.4414 31.875C46.2891 32.8711 45.7129 34.1309 45.7129 35.6543C45.7129 37.1191 46.2207 38.3398 47.2363 39.3164C48.252 40.2734 49.5605 40.752 51.1621 40.752Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M80.4023 32.5195V39.4922H87.1113V44.8828H68.2148V39.4922H74.3965V19.5117H68.2148V14.0918H79.2012V21.0645C80.4316 18.3105 81.9551 16.3965 83.7715 15.3223C85.6074 14.2285 88.2246 13.6816 91.623 13.6816H93V19.8047H91.6816C88.4004 19.8047 85.959 20.2344 84.3574 21.0938C82.7559 21.9531 81.6914 23.252 81.1641 24.9902C80.6562 26.7285 80.4023 29.2383 80.4023 32.5195Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M124 29.6484C124 32.5195 123.336 35.2051 122.008 37.7051C120.68 40.2051 118.863 42.1777 116.559 43.623C114.273 45.0684 111.734 45.791 108.941 45.791C104.82 45.791 101.217 44.209 98.1309 41.0449V53.291H104.137V58.6816H86.5V53.291H92.0664V19.5117L87 19.8828L91.6816 13.6816H98.1309V19.0137C99.6543 17.2168 101.334 15.8789 103.17 15C105.006 14.1211 106.969 13.6816 109.059 13.6816C111.969 13.6816 114.557 14.4043 116.822 15.8496C119.088 17.2754 120.846 19.209 122.096 21.6504C123.365 24.0918 124 26.7578 124 29.6484ZM108.854 40.2539C110.533 40.2539 112.047 39.7656 113.395 38.7891C114.742 37.8125 115.797 36.4844 116.559 34.8047C117.32 33.125 117.701 31.3477 117.701 29.4727C117.701 27.5781 117.281 25.8398 116.441 24.2578C115.602 22.6562 114.449 21.3867 112.984 20.4492C111.52 19.4922 109.869 19.0137 108.033 19.0137C106.119 19.0137 104.4 19.5215 102.877 20.5371C101.354 21.5332 100.172 22.8613 99.332 24.5215C98.4922 26.1816 98.0723 28.0078 98.0723 30C98.0723 33.2031 99.0781 35.7129 101.09 37.5293C103.121 39.3457 105.709 40.2539 108.854 40.2539Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M153.5 31.0254H127.689C128.061 33.9746 129.203 36.3086 131.117 38.0273C133.031 39.7266 135.375 40.5762 138.148 40.5762C140.18 40.5762 142.064 40.1562 143.803 39.3164C145.541 38.4766 145 38.9355 146.879 37.5293L153.5 39.4922C151.82 42.1094 149.613 42.4512 146.879 43.7988C144.164 45.127 141.205 45.791 138.002 45.791C134.682 45.791 131.732 45.0977 129.154 43.7109C126.576 42.3242 124.564 40.3906 123.119 37.9102C121.693 35.4297 120.98 32.6367 120.98 29.5312C120.98 26.4453 121.684 23.6621 123.09 21.1816C124.516 18.7012 126.459 16.7676 128.92 15.3809C131.381 13.9746 134.096 13.2715 137.064 13.2715C140.307 13.2715 143.129 13.9941 145.531 15.4395C147.953 16.8652 149.857 18.916 151.244 21.5918C152.631 24.248 153.383 27.3926 153.5 31.0254ZM137.182 18.3105C134.896 18.3105 132.895 19.082 131.176 20.625C129.457 22.1484 128.354 24.1699 127.865 26.6895H147.143C146.576 24.1699 145.375 22.1484 143.539 20.625C141.703 19.082 139.584 18.3105 137.182 18.3105Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M181.844 24.1699V39.4922H187V44.8828H175.779V24.5508C175.779 22.6172 175.496 21.2305 174.93 20.3906C174.383 19.5508 173.475 19.1309 172.205 19.1309C169.51 19.1309 166.482 20.459 163.123 23.1152V39.4922H168.426V44.8828L138.148 45.7906L151.727 39.4922H157.146V19.5117H151.727V14.0918H163.123V17.8125C166.893 15.0586 170.438 13.6816 173.758 13.6816C176.512 13.6816 178.543 14.5312 179.852 16.2305C181.18 17.9297 181.844 20.5762 181.844 24.1699Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M201.203 14.0918V19.5117H195.578V35.6543C195.578 37.334 195.754 38.4277 196.105 38.9355C196.477 39.4238 197.102 39.668 197.98 39.668C199.055 39.668 204.426 39.8633 205.5 39.4922L218.021 45.791C215.4 45.791 197.814 45.4102 196.662 45.4102C194.123 45.4102 192.297 44.7754 191.184 43.5059C190.07 42.2168 189.514 40.0195 189.514 36.9141V19.5117H180L173.758 13.6816L189.514 14.0918V9.43359L195.578 3.89648V14.0918H201.203Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M233.52 31.0254H207.709C208.08 33.9746 209.223 36.3086 211.137 38.0273C213.051 39.7266 215.395 40.5762 218.168 40.5762C220.199 40.5762 222.084 40.1562 223.822 39.3164C225.561 38.4766 227.016 37.1875 228.188 35.4492L233.52 37.8516C231.84 40.4688 229.633 42.4512 226.898 43.7988C224.184 45.127 221.225 45.791 218.021 45.791C214.701 45.791 211.752 45.0977 209.174 43.7109C206.596 42.3242 204.584 40.3906 203.139 37.9102C201.713 35.4297 201 32.6367 201 29.5312C201 26.4453 201.703 23.6621 203.109 21.1816C204.535 18.7012 206.479 16.7676 208.939 15.3809C211.4 13.9746 214.115 13.2715 217.084 13.2715C220.326 13.2715 223.148 13.9941 225.551 15.4395C227.973 16.8652 229.877 18.916 231.264 21.5918C232.65 24.248 233.402 27.3926 233.52 31.0254ZM217.201 18.3105C214.916 18.3105 212.914 19.082 211.195 20.625C209.477 22.1484 208.373 24.1699 207.885 26.6895H227.162C226.596 24.1699 225.395 22.1484 223.559 20.625C221.723 19.082 219.604 18.3105 217.201 18.3105Z"
                                              fill="black"
                                          />
                                          <path
                                              d="M246.402 32.5195V39.4922H253.111V44.8828H234.215V39.4922H240.396V19.5117H228L217.201 13.2718L245.201 14.0918V21.0645C246.432 18.3105 247.955 16.3965 249.771 15.3223C251.607 14.2285 254.225 13.6816 257.623 13.6816H259V19.8047H257.682C254.4 19.8047 251.959 20.2344 250.357 21.0938C248.756 21.9531 247.691 23.252 247.164 24.9902C246.656 26.7285 246.402 29.2383 246.402 32.5195Z"
                                              fill="black"
                                          />
                                      </g>
                                  </svg>
                              </div>

                              <!-- <div class="_loader carpenter-loader">
                                  ${this._carpenterLogo()}
                              </div> -->
                              <!-- <h1 class="_title">
                                  Loading <span>Carpenter</span>
                              </h1>
                              <p class="_text">
                                  Loading.
                                  <span>Please wait....</span>
                              </p> -->
                              <!-- <button class="_cancel-btn">Cancel</button> -->
                          </div>
                      </div>
                  `
            : ''}
        `;
    }
}
SCarpenterComponent.state = {
    status: 'idle',
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFFdEYsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRWhDLGFBQWE7QUFDYixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQyxDQUFDLCtCQUErQjtBQXNCbEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUFDNUQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRiw4QkFBOEIsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQVNEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSw4QkFBOEI7WUFDekMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJ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
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
            <s-carpenter-app id="${(_a = this.props.id) !== null && _a !== void 0 ? _a : 's-carpenter'}" save-state ${this.props.sidebar ? 'sidebar' : ''} ${this.props.autoEdit ? 'auto-edit' : ''} ${this.props.features
            ? `features='${JSON.stringify(this.props.features)}'`
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
                              <div class="_loader carpenter-loader">
                                  ${this._carpenterLogo()}
                              </div>
                              <h1 class="_title">
                                  Loading <span>Carpenter</span>
                              </h1>
                              <p class="_text">
                                  Carpenter is loading. Please wait....
                              </p>
                              <!-- <button class="_cancel-btn">Cancel</button> -->
                          </div>
                      </div>
                  `
            : ''}
            ${this.state.status === 'ready'
            ? html `
                      <div
                          s-carpenter-initial-ui
                          class="${this.utils.cls('_ready')}"
                      >
                          <div class="_inner">
                              <div class="_logo">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                  >
                                      <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                      <path
                                          d="M374.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7 86.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"
                                      />
                                  </svg>
                              </div>
                              <h1 class="_title">
                                  <span>Carpenter</span>'s ready!
                              </h1>
                              <p class="_text">
                                  Carpenter is now ready to use. Enjoy!
                              </p>
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
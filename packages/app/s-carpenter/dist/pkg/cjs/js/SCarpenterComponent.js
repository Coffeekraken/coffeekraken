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
        (0, dom_2.__injectIframeContent)(this._$editorIframe, iframeHtml);
    }
    _carpenterLogo() {
        return (0, lit_1.html) `
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
        return (0, lit_1.html) `
            ${!this.props.autoInit &&
            (this.state.status === 'idle' || this.state.status === 'loading')
            ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
                      <div
                          s-carpenter-initial-ui
                          style="opacity: 0"
                          class="${this.utils.cls('_loading')}"
                      >
                          <div class="_inner">
                              <div class="_loader carpenter-loader-blocks">
                                  <div class="_block-1"></div>
                                  <div class="_block-2"></div>
                                  <div class="_block-3"></div>
                              </div>
                              <!-- <div class="_loader carpenter-loader">
                                  ${this._carpenterLogo()}
                              </div> -->
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
            ? (0, lit_1.html) `
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
exports.default = SCarpenterComponent;
SCarpenterComponent.state = {
    status: 'idle',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxpREFBdUQ7QUFDdkQsdURBQXlEO0FBQ3pELDZCQUEyQztBQUMzQyw0R0FBc0Y7QUFFdEYsa0ZBQTBEO0FBRTFELHNEQUFnQztBQXFQWCxpQkFyUGQsZ0JBQVEsQ0FxUFk7QUFuUDNCLGFBQWE7QUFDYixpREFBZ0U7QUFDaEUsOEdBQWtFLENBQUMsK0JBQStCO0FBc0JsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE1BQXFCLG1CQUFvQixTQUFRLHlCQUFlO0lBQzVELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHNDQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLG1DQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFTRDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsYUFBYTtZQUNuQixTQUFTLEVBQUUsc0NBQThCO1lBQ3pDLFNBQVMsRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDN0MsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUssS0FBSzs7WUFDUCxrQ0FBa0M7WUFDbEMsSUFBSSxJQUFBLGtCQUFZLEdBQUUsRUFBRTtnQkFDaEIsT0FBTzthQUNWO1lBRUQsNkNBQTZDO1lBQzdDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsK0JBQStCO2dCQUMvQixxQkFBcUI7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
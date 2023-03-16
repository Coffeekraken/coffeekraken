import __SLitComponent from '@coffeekraken/s-lit-component';

import { __isInIframe } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';

import __SSugarConfig from '@coffeekraken/s-sugar-config';

import __define from './define';

// @ts-ignore
import { __wait } from '@coffeekraken/sugar/datetime';
import { __injectIframeContent } from '@coffeekraken/sugar/dom';
import __css from '../../../../src/css/s-carpenter-component.css'; // relative to /dist/pkg/esm/js

export interface ISCarpenterComponentIconsProp {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
    folderOpen: string;
    folderClose: string;
}

export interface ISCarpenterComponentProps {
    src: string;
    specs: string;
    adapter: 'ajax';
    nav: boolean;
    pagesLink: string;
    iframe: boolean;
    logo: string;
    icons: ISCarpenterComponentIconsProp;
}

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
        return __SLitComponent.propertiesFromInterface(
            {},
            __SCarpenterComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static state = {
        status: 'idle',
    };

    _$editorIframe;
    _$openBtn;

    constructor() {
        super(
            __deepMerge({
                name: 's-carpenter',
                interface: __SCarpenterComponentInterface,
                carpenter: __SSugarConfig.get('carpenter'),
            }),
        );
    }

    async mount() {
        // do not mount if is in an iframe
        if (__isInIframe()) {
            return;
        }

        // listen for the s-carpenter-app.ready event
        document.addEventListener('s-carpenter-app.ready', (e) => {
            this.state.status = 'ready';
            setTimeout(() => {
                this.remove();
            }, 1000);
        });

        // manage to add the iframe inside the body
        // alongside with the s-carpenter component
        // this.remove();

        // const $cancelBtn = document.querySelector('.s-carpenter_loading ._cancel-btn');
        // $cancelBtn.addEventListener('click')

        // auto init when the props.autoInit is set to true
        // or that the document.location.hash is "#carpenter"
        if (this.props.autoInit) {
            // wait for the iframe to be ready
            // @TODO        check for better solution
            await __wait(500);
            return this._initEditor();
        }
    }

    _initEditor() {
        // update status to loading
        this.state.status = 'loading';

        // remove the openButton if needed
        // this._$openBtn?.remove?.();

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
            <s-carpenter-app id="${
                this.props.id ?? 's-carpenter'
            }" save-state></s-caprenter-app>    
        `;

        // inject the iframe content
        __injectIframeContent(this._$editorIframe, iframeHtml);
    }

    _carpenterLogo() {
        return html`
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
        return html`
            ${!this.props.autoInit &&
            (this.state.status === 'idle' || this.state.status === 'loading')
                ? html`
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
                ? html`
                      <div
                          s-carpenter-initial-ui
                          class="${this.utils.cls('_loading')}"
                      >
                          <div class="_inner">
                              <div class="_logo">${this._carpenterLogo()}</div>
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
                ? html`
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

export { __define as define };

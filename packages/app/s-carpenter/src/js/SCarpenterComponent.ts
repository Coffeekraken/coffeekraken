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

    _data;
    _$document;
    _$iframe;
    _$toolbar;

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
        await __wait(500);

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
    }

    render() {
        return '';
    }
}

export { __define as define };

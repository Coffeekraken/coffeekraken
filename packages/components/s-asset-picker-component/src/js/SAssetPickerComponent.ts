import __SLitComponent from '@coffeekraken/s-lit-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SAssetPickerComponentInterface from './interface/SAssetPickerComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-asset-picker.css'; // relative to /dist/pkg/esm/js

import __define from './define';

export interface ISAssetPickerComponentProps {}

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
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SAssetPickerComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    state = {
        status: 'pending',
    };

    constructor() {
        super(
            __deepMerge({
                name: 's-asset-picker',
                interface: __SAssetPickerComponentInterface,
            }),
        );
    }

    render() {
        return html` <div>Hello</div> `;
    }
}

export { __define as define };

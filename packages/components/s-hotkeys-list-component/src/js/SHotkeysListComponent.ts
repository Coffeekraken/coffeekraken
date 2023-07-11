import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import __SHotkeysListComponentInterface from './interface/SHotkeysListComponentInterface.js';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// @ts-ignore
import __css from '../../../../src/css/s-hotkeys-list.css'; // relative to /dist/pkg/esm/js

/**
 * @name                SHotkeysListComponent
 * @as                  Hotkeys list
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SHotkeysListComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-hotkeys-list
 * @platform            html
 * @status              beta
 *
 * Simply list the registered hotkeys stored in the document.env.HOTKEYS stack and update itself on the 'hotkey.update' event. Works fine with the `__hotkey` function from \"@coffeekraken/sugar/dom\" package.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
 *
 * @snippet             __SHotkeysListComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-hotkeys-list-component
 *
 * @install           js
 * import { __define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
 * __SHotkeysListComponentDefine();
 *
 * @example         html        Simple dark mode switcher
 * <s-hotkeys-list></s-hotkeys-list>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISHotkeysListHotkeyObj {
    title?: string;
    description?: string;
    hotkey: string;
}

export interface ISHotkeysListComponentProps {
    hotkeys: Record<string, ISHotkeysListHotkeyObj>;
}

export default class SHotkeysListComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SHotkeysListComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    get _hotkeys(): Record<string, ISHotkeysListHotkeyObj> {
        return this.props.hotkeys ?? document.env?.HOTKEYS;
    }

    constructor() {
        super({
            name: 's-hotkeys-list',
            interface: __SHotkeysListComponentInterface,
        });

        // listen for updates
        document.addEventListener('hotkeys.update', (e) => {
            this.requestUpdate();
        });
    }

    render() {
        return html`
            <ol class="${this.utils.cls('_list')}">
                ${Object.keys(this._hotkeys ?? {}).map((hotkey) => {
                    const hotkeyObj: ISHotkeysListHotkeyObj =
                        this._hotkeys[hotkey];
                    return html`
                        <li class="${this.utils.cls('_list-item')}">
                            <div class="${this.utils.cls('_hotkey')}">
                                ${unsafeHTML(`
                                    ${(hotkeyObj.hotkey ?? hotkey)
                                        .split('+')
                                        .map(
                                            (key) => `<span
                                                    class="${this.utils.cls(
                                                        '_key',
                                                    )}"
                                                    >${key}</span
                                                >`,
                                        )
                                        .join('+')}
                                    `)}
                            </div>
                            <div class="${this.utils.cls('_metas')}">
                                ${hotkeyObj.title
                                    ? html`
                                          <h1
                                              class="${this.utils.cls(
                                                  '_title',
                                              )}"
                                          >
                                              ${hotkeyObj.title}
                                          </h1>
                                      `
                                    : ''}
                                ${hotkeyObj.description
                                    ? html`
                                          <p
                                              class="${this.utils.cls(
                                                  '_description',
                                              )}"
                                          >
                                              ${hotkeyObj.description}
                                          </p>
                                      `
                                    : ''}
                            </div>
                        </li>
                    `;
                })}
            </ol>
        `;
    }
}

import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { __md5 } from '@coffeekraken/sugar/crypto';

import { SSherlockUserInfoSpec } from '@coffeekraken/s-sherlock';

import __sherlockStores from '../../stores/SherlockStores.js';

@customElement('sherlock-user-info')
export class SherlockUserInfoComponent extends LitElement {
    static styles = css``;

    constructor() {
        super();

        __sherlockStores.space().userInfo.$set('*', () => {
            this.requestUpdate();
        });
        __sherlockStores.route.$set('space', () => {
            this.requestUpdate();
        });
    }

    _saveUserInfo(info: any) {
        __sherlockStores.space().userInfo.saveInfo(info);
    }

    _setUserInfo(info: any) {
        __sherlockStores.space().userInfo.setInfo(info);
    }

    render() {
        const userInfo = __sherlockStores.space().userInfo.getInfo();

        return html`
            <section class="sh-user-info">
                ${userInfo?.email
                    ? html`
                          <figure class="s-avatar">
                              <img
                                  src="https://www.gravatar.com/avatar/${__md5.encrypt(
                                      userInfo.email,
                                  )}?s=200"
                                  alt="${userInfo.fullname}"
                              />
                          </figure>
                      `
                    : ''}
                <s-specs-editor
                    uid="user-info"
                    .values=${userInfo}
                    .specs=${SSherlockUserInfoSpec}
                    @s-specs-editor.change=${(e) => {
                        this._setUserInfo(e.detail.values.toJson());
                    }}
                    @s-specs-editor.save=${(e) => {
                        this._saveUserInfo(e.detail.values.toJson());
                    }}
                ></s-specs-editor>
            </section>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

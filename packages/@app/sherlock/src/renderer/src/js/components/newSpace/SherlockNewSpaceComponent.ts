import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { __base64 } from '@coffeekraken/sugar/crypto';

import __SherlockStores from '../../stores/SherlockStores';

import {
    SSherlockNewSpaceSpec,
    SSherlockSpaceContentfulAdapterSpec,
    SSherlockSpacePocketbaseAdapterSpec,
} from '@coffeekraken/s-sherlock';

import type {
    ISherlockContentfulAdapterSettings,
    ISherlockPocketbaseAdapterSettings,
    ISherlockSpace,
} from '@coffeekraken/s-sherlock';

@customElement('sherlock-new-space')
export class SherlockNewSpaceComponent extends LitElement {
    static styles = css``;

    @state()
    _step: 'metas' | 'adapter' = 'adapter';

    @state()
    _adapter: 'pocketbase' | 'contentful' = 'pocketbase';

    @state()
    _error: string;

    _space: ISherlockSpace = {};

    constructor() {
        super();
    }

    _validateGunExisting(base64Uid: string): void {
        if (!base64Uid) {
            return;
        }

        const decoded = __base64.decrypt(base64Uid);
        if (decoded.split(':').length !== 3) {
            // invalid key
            this._error = `This key is not valid...`;
        }

        const parts = decoded.split(':');

        const spaceUid = parts[1],
            spaceName = parts[0];

        this._space.uid = spaceUid;
        this._space.name = spaceName;
    }

    async _saveAdapter(
        type: 'fs' | 'contentful' | 'gun',
        settings: ISherlockPocketbaseAdapterSettings | ISherlockContentfulAdapterSettings,
    ): Promise<void> {
        switch (type) {
            case 'gun':
                this._space.adapter = {
                    type: 'gun',
                    settings: {
                        gunUid: this._space.uid,
                    },
                };
                this._space.pool = {
                    type: 'gun',
                    settings: {
                        gunUid: this._space.uid,
                    },
                };
                break;
            default:
                this._space.adapter = {
                    type,
                    settings,
                };
                break;
        }

        this._step = 'metas';
    }

    async _saveMetas(metas: ISherlockSpace): Promise<void> {
        const finalSpace = {
            ...metas,
            ...this._space,
        };

        // add space in sherlock app
        const addedSpace = await window.sherlock.addSpace(finalSpace);

        // add space in store
        __SherlockStores.spaces.addSpace(addedSpace);

        // go to new space
        __SherlockStores.route.setRoute({
            space: addedSpace.uid,
        });
    }

    render() {
        return html`
            <ul class="sh-new-space">
                ${this._step === 'adapter'
                    ? html`
                          <div class="s-spacing:30">
                              <h1 class="s-typo:h3">Adapter</h1>
                              <p class="s-typo:lead">Select an adapter to use as data storage.</p>
                              <div>
                                  <ol class="s-tabs:grow">
                                      <li
                                          class="${this._adapter === 'pocketbase' ? 'active' : ''}"
                                          @click=${(e) => {
                                              this._adapter = 'pocketbase';
                                          }}
                                      >
                                          Pocketbase
                                      </li>
                                      <li
                                          class="${this._adapter === 'contentful' ? 'active' : ''}"
                                          @click=${(e) => {
                                              this._adapter = 'contentful';
                                          }}
                                      >
                                          Contentful
                                      </li>
                                  </ol>
                                  <div class="_adapter">
                                      ${this._adapter === 'pocketbase'
                                          ? html`
                                                <s-specs-editor
                                                    uid="fs-adapter"
                                                    .values=${{
                                                        folder: {
                                                            value: '~/.sherlock',
                                                        },
                                                    }}
                                                    .specs=${SSherlockSpacePocketbaseAdapterSpec}
                                                    i18n.save-button="Continue"
                                                    @s-specs-editor.save=${(e) => {
                                                        this._saveAdapter('fs', e.detail.values);
                                                    }}
                                                ></s-specs-editor>
                                            `
                                          : this._adapter === 'contentful'
                                          ? html`
                                                <s-specs-editor
                                                    uid="contentful-adapter"
                                                    .values=${{}}
                                                    .specs=${SSherlockSpaceContentfulAdapterSpec}
                                                    i18n.save-button="Continue"
                                                    @s-specs-editor.save=${(e) => {
                                                        this._saveAdapter(
                                                            'contentful',
                                                            e.detail.values,
                                                        );
                                                    }}
                                                ></s-specs-editor>
                                            `
                                          : ''}
                                  </div>
                              </div>
                          </div>
                      `
                    : html`
                          <s-specs-editor
                              uid="new-space"
                              .values=${this._space}
                              .specs=${SSherlockNewSpaceSpec}
                              @s-specs-editor.save=${(e) => {
                                  this._saveMetas(e.detail.values);
                              }}
                          ></s-specs-editor>
                      `}
            </ul>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

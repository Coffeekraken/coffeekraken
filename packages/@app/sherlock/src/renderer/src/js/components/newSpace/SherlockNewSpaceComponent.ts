import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { __base64 } from '@coffeekraken/sugar/crypto';

import {
    SSherlockNewSpaceSpec,
    SSherlockSpaceContentfulAdapterSpec,
    SSherlockSpaceFsAdapterSpec,
    SSherlockSpaceGunAdapterSpec,
} from '../../../../../shared/SherlockSpecs';

import type {
    ISherlockSpace,
    ISherlockSpaceContentfulAdapterSettings,
    ISherlockSpaceFsAdapterSettings,
} from '../../../../../shared/SherlockTypes';

@customElement('sherlock-new-space')
export class SherlockNewSpaceComponent extends LitElement {
    static styles = css``;

    @state()
    _step: 'metas' | 'adapter' = 'adapter';

    @state()
    _adapter: 'fs' | 'contentful' | 'gun' = 'fs';

    @state()
    _error: string;

    _space: ISherlockSpace = {};

    constructor() {
        super();
    }

    _validateGunExisting(uid: string): void {
        console.log('ui', uid);

        // console.log('en', __base64.encrypt(uid));

        const decoded = __base64.decrypt(uid);
        if (decoded.split(':').length !== 3) {
            // invalid key
            this._error = `This key is not valid...`;
        }

        console.log('de', decoded);
    }

    _saveMetas(data: ISherlockSpace): void {
        this._space = data;
    }

    async _saveAdapter(
        type: 'fs' | 'contentful' | 'gun',
        settings: ISherlockSpaceFsAdapterSettings | ISherlockSpaceContentfulAdapterSettings,
    ): Promise<void> {
        return;
        // save the adapter settings in the space directly
        this._space.adapter = {
            type,
            settings,
        };
        const res = await window.sherlock.addSpace(this._space);
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
                                          class="${this._adapter === 'fs' ? 'active' : ''}"
                                          @click=${(e) => {
                                              this._adapter = 'fs';
                                          }}
                                      >
                                          Filesystem
                                      </li>
                                      <li
                                          class="${this._adapter === 'gun' ? 'active' : ''}"
                                          @click=${(e) => {
                                              this._adapter = 'gun';
                                          }}
                                      >
                                          Gun (p2p)
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
                                      ${this._adapter === 'fs'
                                          ? html`
                                                <s-specs-editor
                                                    uid="fs-adapter"
                                                    .values=${{
                                                        folder: {
                                                            value: '%home/.sherlock',
                                                        },
                                                    }}
                                                    .specs=${SSherlockSpaceFsAdapterSpec}
                                                    @s-specs-editor.save=${(e) => {
                                                        this._saveAdapter('fs', e.detail.values);
                                                    }}
                                                ></s-specs-editor>
                                            `
                                          : this._adapter === 'gun'
                                          ? html`
                                                <s-specs-editor
                                                    uid="fs-adapter"
                                                    .values=${{}}
                                                    .specs=${SSherlockSpaceGunAdapterSpec}
                                                    @s-specs-editor.change=${(e) => {
                                                        this._validateGunExisting(
                                                            e.detail.values.existing,
                                                        );
                                                    }}
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
                              .values=${{
                                  uid: 'hello',
                              }}
                              i18n.save-button="Continue"
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

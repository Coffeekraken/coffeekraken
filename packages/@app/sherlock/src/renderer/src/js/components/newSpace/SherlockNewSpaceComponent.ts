import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
    SSherlockNewSpaceSpec,
    SSherlockSpaceContentfulAdapterSpec,
    SSherlockSpaceFsAdapterSpec,
} from '../../../../../shared/SherlockSpecs';

import __unwrapSpecsValues from '../../utils/unwrapSpecsValues';

import type {
    ISherlockSpace,
    ISherlockSpaceContentfulAdapter,
    ISherlockSpaceFsAdapter,
} from '../../../../../shared/SherlockTypes';

@customElement('sherlock-new-space')
export class SherlockNewSpaceComponent extends LitElement {
    static styles = css``;

    @state()
    _step: 'metas' | 'adapter' = 'metas';

    @state()
    _adapter: 'fs' | 'contentful' = 'fs';

    _space: ISherlockSpace;

    constructor() {
        super();
    }

    async _saveMetas(data: ISherlockSpace): void {
        this._space = data;
        this._step = 'adapter';
    }

    async _saveAdapter(
        type: 'fs' | 'contentful',
        values: ISherlockSpaceFsAdapter | ISherlockSpaceContentfulAdapter,
    ): Promise<void> {
        // save the adapter settings in the space directly
        this._space.adapter = {
            type,
            settings: values,
        };
        const res = await window.sherlock.newSpace(this._space);
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
                                                        this._saveAdapter(
                                                            'fs',
                                                            __unwrapSpecsValues(e.detail.values),
                                                        );
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
                                                            __unwrapSpecsValues(e.detail.values),
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
                              .values=${{}}
                              i18n.save-button="Continue"
                              .specs=${SSherlockNewSpaceSpec}
                              @s-specs-editor.save=${(e) => {
                                  this._saveMetas(__unwrapSpecsValues(e.detail.values));
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

import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { ISImage } from '@specimen/types';

export default class SSpecsEditorComponentImageWidget {
    _error;
    _warning;
    _component;
    _propObj;
    _path;

    static isActive() {
        return true;
    }

    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }

    render({ propObj, values, path }) {
        if (!values) {
            values = {};
        }

        return {
            error: this._error,
            warning: this._warning,
            html: html`
                <div class="${this._component.utils.cls('_image-widget')}">
                    <label
                        class="${this._component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                        @click=${(e) => e.preventDefault()}
                    >
                        ${this._component.renderLabel(propObj, path)}
                    </label>

                    <div class="_drop">
                        ${!values.url
                            ? html`
                                  <s-dropzone
                                      accept="image/*"
                                      upload
                                      class="s-bare"
                                      @s-dropzone.file=${(e) => {
                                          // responsive item
                                          this._component.setValue(path, {
                                              url: <ISImage>e.detail[0].url,
                                          });
                                          if (
                                              this._component.isPathResponsive(
                                                  path,
                                              ) &&
                                              this._component.isDefaultMedia()
                                          ) {
                                              this._component.setValue(
                                                  [...path, 'url'],
                                                  <ISImage>e.detail[0].url,
                                                  {
                                                      noneResponsive: true,
                                                  },
                                              );
                                          }
                                          this._component.apply();
                                      }}
                                  ></s-dropzone>
                              `
                            : html`
                                  <ul
                                      class="${this._component.utils.cls(
                                          '_images',
                                      )}"
                                  >
                                      ${this._renderImage(
                                          values.url,
                                          this._component.props.media,
                                          path,
                                      )}
                                  </ul>
                              `}
                    </div>
                </div>
            `,
        };
    }
    _renderImage(url: string, media: string, path: string[]): any {
        return html`
            <li class="_image">
                <figure class="_preview s-media-container">
                    <img class="s-media" src="${url}" />
                </figure>
                <div class="_name">${url.split('/').pop()}</div>
                <div class="_spacer"></div>
                <div class="_actions">
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
                            if (e.currentTarget.needConfirmation) return;
                            this._component.clearValue(path, {
                                media,
                            });
                            this._component.apply();
                        }}
                        confirm="Confirm?"
                    >
                        ${unsafeHTML(this._component.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}

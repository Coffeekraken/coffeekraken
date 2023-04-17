import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISImageData } from '@specimen/types';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentImageWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.url && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }
    }

    render() {
        const values = <ISImageData>this.values;

        return html`
            <div class="${this.editor.utils.cls('_image-widget')}">
                ${this.renderLabel()}
                <div class="_drop">
                    ${!values.url
                        ? html`
                              <s-dropzone
                                  accept="image/*"
                                  upload
                                  class="s-bare"
                                  @s-dropzone.file=${(e) => {
                                      this.setValue({
                                          url: e.detail[0].url,
                                      });

                                      //   if (
                                      //       this.isResponsive() &&
                                      //       this.editor.isDefaultMedia()
                                      //   ) {
                                      //       _console.log('SET');
                                      //       this.setValue(
                                      //           <ISImageData>e.detail[0].url,
                                      //           {
                                      //               path: 'url',
                                      //               noneResponsive: true,
                                      //           },
                                      //       );
                                      //   }
                                  }}
                              ></s-dropzone>
                          `
                        : html`
                              <ul class="${this.editor.utils.cls('_images')}">
                                  ${this._renderImage(values.url)}
                              </ul>
                          `}
                </div>
                ${this.propObj.alt
                    ? this.renderInlineInput({
                          label: 'Alt',
                          description: '',
                          placeholder: __i18n('Image alternative text', {
                              id: 'global.image.alt',
                          }),
                          value: this.noneResponsiveValue.alt,
                          onChange: (e) => {
                              this.mergeValue(
                                  { alt: e.target.value },
                                  {
                                      noneResponsive: true,
                                  },
                              );
                          },
                      })
                    : ''}
            </div>
        `;
    }
    _renderImage(url: string): any {
        return html`
            <li class="_image">
                <figure class="_preview s-media-container">
                    <img class="s-media" src="${url}" />
                </figure>
                <div class="_name">${url.split('/').pop()}</div>
                <div class="_spacer"></div>
                <div class="_actions">
                    ${this.editor.renderCopyButton(
                        `${document.location.origin}/${url}`,
                        this.editor.props.i18n.image.copyUrl,
                    )}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
                            if (e.currentTarget.needConfirmation) return;
                            this.resetValue();
                            this.editor.apply();
                        }}
                        confirm="Confirm?"
                    >
                        ${unsafeHTML(this.editor.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}

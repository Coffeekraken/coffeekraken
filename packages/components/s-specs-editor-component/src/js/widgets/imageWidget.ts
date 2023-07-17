import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISImageData } from '@specim3n/types';

import type {
    ISSpecsEditorWidgetDeps,
    ISSpecsEditorWidgetSettings,
} from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export interface ISSpecsEditorComponentIMageWidgetSettings
    extends ISSpecsEditorWidgetSettings {
    upload?: boolean;
    uploadUrl?: string;
    multiple?: boolean;
}

export default class SSpecsEditorComponentImageWidget extends __SSpecsEditorWidget {
    settings: ISSpecsEditorComponentIMageWidgetSettings;

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
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
                                  ?upload=${this.settings.upload}
                                  ?multiple=${this.settings.multiple}
                                  class="s-bare"
                                  @s-dropzone.file=${(e) => {
                                      console.log('e.', e.detail);
                                      this.setValue(e.detail);
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
                                      responsive: false,
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

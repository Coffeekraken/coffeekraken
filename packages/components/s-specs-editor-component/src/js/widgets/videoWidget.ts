import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISVideoData, ISVideoFormat } from '@specim3n/types';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentVideoWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
    }

    validate(newValues) {
        if (
            this.propObj.required &&
            !Object.keys(newValues?.sources ?? {}).length
        ) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_video-widget')}">
                ${this.renderLabel()}
                <div class="_drop">
                    <s-dropzone
                        accept="video/webm,video/mp4,video/ogg"
                        upload
                        max-files="3"
                        multiple
                        class="s-bare"
                        @s-dropzone.file=${(e) => {
                            const newValue = {
                                sources: {},
                            };
                            for (let [i, video] of e.detail.entries()) {
                                const url = video.url ?? '',
                                    format = url.split('.').pop();

                                newValue.sources[format] = {
                                    url,
                                };
                            }

                            this.setValue(newValue, {});
                        }}
                    ></s-dropzone>
                </div>

                ${this._renderVideos(this.values, this.path)}
            </div>
        `;
    }

    _renderVideos(values: ISVideoData, path: string[]): any {
        return html`
            <ul class="_videos">
                ${Object.keys(values.sources ?? {}).map(
                    (format) => html`
                        ${this._renderVideo(
                            values.sources?.[format].url,
                            format,
                            path,
                        )}
                    `,
                )}
            </li>
        `;
    }

    _renderVideo(url: string, format: ISVideoFormat, path: string[]): any {
        return html`
            <li class="_video">
                <figure class="_preview s-media-container">
                    <video class="s-media">
                        <source src="${url}" type="video/${format}" />
                    </video>
                </figure>
                <div class="_format">${format}</div>
                <div class="_spacer"></div>
                <div class="_actions">
                    ${this.editor.renderCopyButton(
                        `${document.location.origin}/${url}`,
                        this.editor.props.i18n.video.copyUrl,
                    )}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
                            if (e.currentTarget.needConfirmation) return;
                            const values = this.editor.getValue(path);
                            delete values.sources[format];
                            this.editor.setValue(
                                [...path, 'sources'],
                                values.sources,
                            );
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

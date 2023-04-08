import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { ISVideoData, ISVideoFormat } from '@specimen/types';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentVideoWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
    }
    render() {
        const values = <ISVideoData>this.values;

        return html`
            <div class="${this.editor.utils.cls('_video-widget')}">
                <label
                    class="${this.editor.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>

                <div class="_drop">
                    <s-dropzone
                        accept="video/webm,video/mp4,video/ogg"
                        upload
                        max-files="3"
                        multiple
                        class="s-bare"
                        @s-dropzone.file=${(e) => {
                            const newSources = values.sources ?? {};

                            for (let [i, video] of e.detail.entries()) {
                                const url = video.url ?? '',
                                    format = url.split('.').pop();

                                newSources[format] = {
                                    url,
                                };
                            }
                            this.setValue(newSources, {
                                path: 'sources',
                            });
                            this.editor.apply();
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

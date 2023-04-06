import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { ISVideoData, ISVideoFormat } from '@specimen/types';

export default class SSpecsEditorComponentVideoWidget {
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
        values = <ISVideoData>values;

        return html`
            <div class="${this._component.utils.cls('_video-widget')}">
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

                            this._component.setValue(
                                [...path, 'sources'],
                                newSources,
                            );
                            this._component.apply();
                        }}
                    ></s-dropzone>
                </div>

                ${this._renderVideos(values, path)}
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
                    ${this._component.renderCopyButton(
                        `${document.location.origin}/${url}`,
                        this._component.props.i18n.video.copyUrl,
                    )}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
                            if (e.currentTarget.needConfirmation) return;
                            const values = this._component.getValue(path);
                            delete values.sources[format];
                            this._component.setValue(
                                [...path, 'sources'],
                                values.sources,
                            );
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

import { html } from 'lit';

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
                    <s-dropzone
                        accept="image/*"
                        files="${values.url}"
                        upload
                        @s-dropzone.clear=${(e) => {
                            this._component.clearValue([...path, 'url']);
                            this._component.apply();
                        }}
                        @s-dropzone.file=${(e) => {
                            this._component.setValue(
                                path,
                                <ISImage>e.detail[0],
                            );
                            this._component.apply();
                        }}
                    ></s-dropzone>
                </div>
            `,
        };
    }
}

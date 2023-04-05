import { html } from 'lit';

import type { ISWysiwygData } from '@specimen/types';

export default class SSpecsEditorComponentWysiwygWidget {
    _error;
    _warning;
    _component;
    _propObj;
    _path;

    _editorJs;
    _frontspec;
    _$holder;
    _$add;

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
            values = <ISWysiwygData>{
                value: propObj.default,
            };
        }

        return {
            error: this._error,
            warning: this._warning,
            html: html`
                <div
                    class="${this._component.utils.cls('_wysiwyg-widget')}"
                    @s-wysiwyg.change=${(e) => {
                        _console.log('Path', this._path);
                        this._component.setValue(this._path, e.detail);
                        this._component.apply();

                        // const $preview = document.querySelector('._preview');
                        // const wysiwyg = new __SWysiwyg(propObj, e.detail ?? {});
                        // $preview.innerHTML = wysiwyg.toString(
                        //     ({ type, content, isBlock }) => {
                        //         switch (type) {
                        //             case 'root':
                        //                 return `<div>\n${content}\n</div>`;
                        //             case 'text':
                        //                 return content;
                        //             case 'br':
                        //                 return '\n<br />\n';
                        //             default:
                        //                 return `<${type} class="s-typo s-typo--${type}">${content}</${type}>`;
                        //         }
                        //     },
                        // );
                    }}
                >
                    <label
                        class="${this._component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        ${this._component.renderLabel(propObj, path)}
                    </label>

                    <s-wysiwyg frontspec></s-wysiwyg>

                    <div class="_preview"></div>
                </div>
            `,
        };
    }
}

import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentWysiwygWidget extends __SSpecsEditorWidget {
    _editorJs;
    _frontspec;
    _$holder;
    _$add;

    static isActive() {
        return true;
    }

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
    }

    render() {
        return html`
            <div
                class="${this.editor.utils.cls('_wysiwyg-widget')}"
                @s-wysiwyg.change=${(e) => {
                    this.setValue(e.detail);
                    this.editor.apply();

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
                    class="${this.editor.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>

                <s-wysiwyg frontspec></s-wysiwyg>

                <div class="_preview"></div>
            </div>
        `;
    }
}

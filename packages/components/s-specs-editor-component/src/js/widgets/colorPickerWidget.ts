import { html } from 'lit';

import type { ISColorData } from '@specimen/types';
import { __SColor } from '@specimen/types/utils';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentColorPickerWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
        if (!this.values.value) {
            this.setDefault({
                format:
                    this.propObj.default?.format ??
                    this.propObj.format ??
                    'hexa',
                value: this.propObj.default?.value ?? '#ff0000ff',
            });
        }
    }

    render() {
        const color = new __SColor(this.propObj, this.values);

        return html`
            <div class="${this.editor.utils.cls('_color-picker-widget')}">
                ${this.renderLabel()}
                <s-color-picker
                    value="${color.toString()}"
                    format="${this.propObj.format}"
                    @s-color-picker.change=${(e) => {
                        this.setValue(<ISColorData>e.detail);
                    }}
                >
                    <input
                        type="text"
                        name="color"
                        class="s-input"
                        placeholder=${this.propObj.placeholder}
                    />
                    <div class="_color-preview"></div>
                </s-color-picker>
            </div>
        `;
    }
}

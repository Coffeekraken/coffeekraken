import { html } from 'lit';

import type { ISImageData } from '@specimen/types';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentLayoutWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        // if (!this.values.url && this.propObj.default) {
        //     this.setDefault(this.propObj.default);
        // }
    }

    render() {
        const values = <ISImageData>this.values;

        return html`
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this.renderLabel()}
            </div>
        `;
    }
}

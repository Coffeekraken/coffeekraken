import { html } from 'lit';

import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';

__SSpacesSelectorComponentDefine();

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentSpacesWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }
    }

    render() {
        const spaces = {
            padding: [],
            margin: [],
        };

        this.propObj.options.forEach((option) => {
            spaces.padding.push({
                ...option,
            });
            spaces.margin.push({
                ...option,
            });
        });

        return html`
            <div
                class="${this.editor.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
                    this.setValue(e.detail);
                }}
            >
                ${this.renderLabel()}
                <s-spaces-selector
                    .spaces=${spaces}
                    .values=${Object.assign({}, this.values ?? {})}
                ></s-spaces-selector>
            </div>
        `;
    }
}

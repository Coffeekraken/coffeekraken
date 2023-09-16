import { html } from 'lit';

import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';

__SSpacesSelectorComponentDefine();

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentSpacesWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
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

        _console.log('VAL', this.values);

        return html`
            <div
                class="${this.editor.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
                    if (!Object.keys(e.detail).length) {
                        this.resetValue();
                    } else {
                        this.setValue(e.detail);
                    }
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

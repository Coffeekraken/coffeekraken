import { html } from 'lit';

import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';

__SSpacesSelectorComponentDefine();

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentSpacesWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
    }

    render() {
        const spaces = {
            padding: [],
            margin: [],
        };

        this.propObj.props.paddingTop.options.forEach((option) => {
            spaces.padding.push({
                ...option,
                default: option.value == this.propObj.props.paddingTop.default,
            });
        });
        this.propObj.props.marginTop.options.forEach((option) => {
            spaces.margin.push({
                ...option,
                default: option.value == this.propObj.props.marginTop.default,
            });
        });

        return html`
            <div
                class="${this.editor.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
                    const setPath = `${this.path.join('.')}`;
                    this.setValue(e.detail);
                    this.editor.apply();
                }}
            >
                <s-spaces-selector
                    .spaces=${spaces}
                    .values=${Object.assign({}, this.values ?? {})}
                ></s-spaces-selector>
            </div>
        `;
    }
}

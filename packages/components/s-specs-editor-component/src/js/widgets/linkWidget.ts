import { html } from 'lit';

import type { ISImageData } from '@specimen/types';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentLinkWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
    }

    render() {
        const values = <ISImageData>this.values;

        return html`
            <div class="${this.editor.utils.cls('_link-widget')}">
                ${this.renderLabel()}
                <label class="_alt inline-input">
                    <div class="_label">
                        Text <span class="_required">*</span>
                    </div>
                    <input
                        class="_input"
                        type="text"
                        name="Link text"
                        placeholder="Click me!"
                        value="${values.text}"
                        @change=${(e) => {
                            this.mergeValue({
                                text: e.target.value,
                            });
                        }}
                    />
                </label>

                <label class="_alt inline-input">
                    <div class="_label">
                        URL <span class="_required">*</span>
                    </div>
                    <input
                        class="_input"
                        type="text"
                        name="Link URL"
                        placeholder="https://..."
                        value="${values.url}"
                        @change=${(e) => {
                            this.mergeValue({
                                url: e.target.value,
                            });
                        }}
                    />
                </label>

                <label class="_alt inline-input">
                    <div class="_label">Title</div>
                    <input
                        class="_input"
                        type="text"
                        name="Link title"
                        placeholder="Discover our products..."
                        value="${values.title}"
                        @change=${(e) => {
                            this.mergeValue({
                                title: e.target.value,
                            });
                        }}
                    />
                </label>

                <label class="_alt inline-input">
                    <div class="_label">Open in new tab?</div>
                    <input
                        class="_input"
                        type="checkbox"
                        name="Open in new tab?"
                        ?checked=${values.newWindow}
                        .checked=${values.newWindow}
                        @change=${(e) => {
                            this.mergeValue({
                                newWindow: e.target.checked,
                            });
                        }}
                    />
                </label>
            </div>
        `;
    }
}

import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';
export default class SSpecsEditorComponentLinkWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
    }
    render() {
        const values = this.values;
        return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFLM0IsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxPQUFPLCtCQUFnQyxTQUFRLG9CQUFvQjtJQUM3RSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhDLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7a0JBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUU7Ozs7Ozs7Ozs7aUNBVUgsTUFBTSxDQUFDLElBQUk7a0NBQ1YsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSzthQUN2QixDQUFDLENBQUM7UUFDUCxDQUFDOzs7Ozs7Ozs7Ozs7O2lDQWFRLE1BQU0sQ0FBQyxHQUFHO2tDQUNULENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNaLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7Ozs7Ozs7Ozs7aUNBV1EsTUFBTSxDQUFDLEtBQUs7a0NBQ1gsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSzthQUN4QixDQUFDLENBQUM7UUFDUCxDQUFDOzs7Ozs7Ozs7O21DQVVVLE1BQU0sQ0FBQyxTQUFTO21DQUNoQixNQUFNLENBQUMsU0FBUztrQ0FDakIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTzthQUM5QixDQUFDLENBQUM7UUFDUCxDQUFDOzs7O1NBSWhCLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
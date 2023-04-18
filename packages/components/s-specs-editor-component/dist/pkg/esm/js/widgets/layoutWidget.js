import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentLayoutWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        // if (!this.values.url && this.propObj.default) {
        //     this.setDefault(this.propObj.default);
        // }
    }
    render() {
        const values = this.values;
        return html `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this.renderLabel()}
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFLM0IsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFrQyxTQUFRLG9CQUFvQjtJQUMvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLGtEQUFrRDtRQUNsRCw2Q0FBNkM7UUFDN0MsSUFBSTtJQUNSLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFeEMsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsV0FBVyxFQUFFOztTQUUzQixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=
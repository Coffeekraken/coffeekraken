import { html } from 'lit';
import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';
__SSpacesSelectorComponentDefine();
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentSpacesWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        if (!this.values.value && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }
    }
    render() {
        var _a;
        const spaces = {
            padding: [],
            margin: [],
        };
        this.propObj.options.forEach((option) => {
            spaces.padding.push(Object.assign({}, option));
            spaces.margin.push(Object.assign({}, option));
        });
        return html `
            <div
                class="${this.editor.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
            this.setValue(e.detail);
        }}
            >
                ${this.renderLabel()}
                <s-spaces-selector
                    .spaces=${spaces}
                    .values=${Object.assign({}, (_a = this.values) !== null && _a !== void 0 ? _a : {})}
                ></s-spaces-selector>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXZHLGdDQUFnQyxFQUFFLENBQUM7QUFHbkMsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFrQyxTQUFRLG9CQUFvQjtJQUMvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQsTUFBTTs7UUFDRixNQUFNLE1BQU0sR0FBRztZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1CQUNaLE1BQU0sRUFDWCxDQUFDO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUNYLE1BQU0sRUFDWCxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQTs7eUJBRU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOzRDQUNwQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLENBQUM7O2tCQUVDLElBQUksQ0FBQyxXQUFXLEVBQUU7OzhCQUVOLE1BQU07OEJBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUM7OztTQUd6RCxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=
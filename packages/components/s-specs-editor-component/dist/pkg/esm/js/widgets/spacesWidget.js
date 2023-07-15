import { html } from 'lit';
import { __define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';
__SSpacesSelectorComponentDefine();
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';
export default class SSpecsEditorComponentSpacesWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
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
        _console.log('VAL', this.values);
        return html `
            <div
                class="${this.editor.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
            _console.log('SA', e.detail, Object.keys(e.detail));
            if (!Object.keys(e.detail).length) {
                this.resetValue();
            }
            else {
                this.setValue(e.detail);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLFFBQVEsSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXpHLGdDQUFnQyxFQUFFLENBQUM7QUFHbkMsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFrQyxTQUFRLG9CQUFvQjtJQUMvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTs7UUFDRixNQUFNLE1BQU0sR0FBRztZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1CQUNaLE1BQU0sRUFDWCxDQUFDO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUNYLE1BQU0sRUFDWCxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakMsT0FBTyxJQUFJLENBQUE7O3lCQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzs0Q0FDcEIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNCO1FBQ0wsQ0FBQzs7a0JBRUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7OEJBRU4sTUFBTTs4QkFDTixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQzs7O1NBR3pELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
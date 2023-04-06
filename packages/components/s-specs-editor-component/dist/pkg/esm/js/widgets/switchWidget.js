import { html } from 'lit';
export default class SSpecsEditorComponentSwitchWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        var _a;
        if (!values) {
            values = {
                value: (_a = propObj.default) !== null && _a !== void 0 ? _a : false,
            };
        }
        return html `
            <div class="${this._component.utils.cls('_switch-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label')}"
                >
                    <input
                        @change=${(e) => {
            this._component.setValue(path, {
                value: e.target.checked,
            });
            this._component.apply();
        }}
                        type="checkbox"
                        name="${path.at(-1)}"
                        class="${this._component.utils.cls('_switch', 's-switch')}"
                        path="${path.join('.')}"
                        ?checked=${values.value !== false &&
            values.value !== null &&
            values.value !== undefined}
                    />
                    ${this._component.renderLabel(propObj, path, {
            tooltip: 'right',
        })}
                </label>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBaUM7SUFLbEQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBRztnQkFDTCxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxLQUFLO2FBQ2xDLENBQUM7U0FDTDtRQUVELE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzs7NkJBRXhDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDOzs7a0NBR3pDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQzNCLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOztnQ0FFTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsU0FBUyxFQUNULFVBQVUsQ0FDYjtnQ0FDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzttQ0FDWCxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUs7WUFDakMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJO1lBQ3JCLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUzs7c0JBRTVCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDekMsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQzs7O1NBR2IsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
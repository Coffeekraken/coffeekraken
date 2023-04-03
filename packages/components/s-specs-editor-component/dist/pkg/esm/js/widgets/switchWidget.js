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
        return {
            error: this._error,
            warning: this._warning,
            html: html `
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
                        ${this._component.renderLabel(propObj, path)}
                    </label>
                </div>
            `,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBaUM7SUFPbEQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBRztnQkFDTCxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxLQUFLO2FBQ2xDLENBQUM7U0FDTDtRQUVELE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUE7OEJBQ1EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOztpQ0FFeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1IsU0FBUyxDQUNaOzs7c0NBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQzNCLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87aUJBQzFCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLENBQUM7O29DQUVPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7cUNBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixTQUFTLEVBQ1QsVUFBVSxDQUNiO29DQUNPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3VDQUNYLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSztnQkFDakMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUNyQixNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVM7OzBCQUU1QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7YUFHdkQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=
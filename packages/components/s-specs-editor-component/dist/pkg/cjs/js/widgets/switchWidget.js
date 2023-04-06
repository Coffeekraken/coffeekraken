"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
class SSpecsEditorComponentSwitchWidget {
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
        return (0, lit_1.html) `
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
exports.default = SSpecsEditorComponentSwitchWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLE1BQXFCLGlDQUFpQztJQUtsRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHO2dCQUNMLEtBQUssRUFBRSxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLEtBQUs7YUFDbEMsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7OzZCQUV4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7O2tDQUd6QyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUMzQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2FBQzFCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7Z0NBRU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDVixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFNBQVMsRUFDVCxVQUFVLENBQ2I7Z0NBQ08sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7bUNBQ1gsTUFBTSxDQUFDLEtBQUssS0FBSyxLQUFLO1lBQ2pDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSTtZQUNyQixNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVM7O3NCQUU1QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7OztTQUdiLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFwREQsb0RBb0RDIn0=
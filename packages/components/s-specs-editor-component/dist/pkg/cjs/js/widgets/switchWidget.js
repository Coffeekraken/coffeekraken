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
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
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
exports.default = SSpecsEditorComponentSwitchWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLE1BQXFCLGlDQUFpQztJQU9sRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHO2dCQUNMLEtBQUssRUFBRSxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLEtBQUs7YUFDbEMsQ0FBQztTQUNMO1FBRUQsT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsSUFBSSxFQUFFLElBQUEsVUFBSSxFQUFBOzhCQUNRLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzs7aUNBRXhDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLFNBQVMsQ0FDWjs7O3NDQUdhLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUMzQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2lCQUMxQixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixDQUFDOztvQ0FFTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FDQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsU0FBUyxFQUNULFVBQVUsQ0FDYjtvQ0FDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt1Q0FDWCxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUs7Z0JBQ2pDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDckIsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTOzswQkFFNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2FBR3ZEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTNERCxvREEyREMifQ==
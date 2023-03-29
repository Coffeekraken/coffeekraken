"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_i18n_1 = require("@coffeekraken/s-i18n");
function default_1(component) {
    let error, warning;
    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = {
                    value: propObj.default,
                };
            }
            return {
                error,
                warning,
                html: (0, lit_1.html) `
                    <div class="${component.utils.cls('_text-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <input
                                @change=${(e) => {
                    if (propObj.required && !e.target.value) {
                        error = (0, s_i18n_1.__i18n)(`This property is required`, {
                            id: 's-specs-editor.widget.required',
                        });
                        return component.requestUpdate();
                    }
                    error = null;
                    warning = null;
                    component.setValue(path, {
                        value: e.target.value,
                    });
                    component.apply();
                }}
                                type="text"
                                name="${path.at(-1)}"
                                class="${component.utils.cls('_input', 's-input')}"
                                placeholder="${propObj.pladeholder}"
                                path="${path.join('.')}"
                                value="${values.value}"
                            />
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLGlEQUE4QztBQUk5QyxtQkFBeUIsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2lCQUN6QixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7a0NBQ1EsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDOztxQ0FFaEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OzswQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNaLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO3dCQUNyQyxLQUFLLEdBQUcsSUFBQSxlQUFNLEVBQ1YsMkJBQTJCLEVBQzNCOzRCQUNJLEVBQUUsRUFBRSxnQ0FBZ0M7eUJBQ3ZDLENBQ0osQ0FBQzt3QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDcEM7b0JBRUQsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVmLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUNyQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO3FCQUN4QixDQUFDLENBQUM7b0JBQ0gsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QixDQUFDOzt3Q0FFTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1IsU0FBUyxDQUNaOytDQUNjLE9BQU8sQ0FBQyxXQUFXO3dDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt5Q0FDYixNQUFNLENBQUMsS0FBSzs7OEJBRXZCLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2lCQUdqRDthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE5REQsNEJBOERDIn0=
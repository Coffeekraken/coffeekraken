"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
    let error, warning;
    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            var _a;
            if (!values) {
                values = {
                    value: (_a = propObj.default) !== null && _a !== void 0 ? _a : false,
                };
            }
            return {
                error,
                warning,
                html: (0, lit_1.html) `
                    <div class="${component.utils.cls('_switch-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label')}"
                        >
                            <input
                                @change=${(e) => {
                    component.setValue(path, {
                        value: e.target.checked,
                    });
                    component.apply();
                }}
                                type="checkbox"
                                name="${path.at(-1)}"
                                class="${component.utils.cls('_switch', 's-switch')}"
                                path="${path.join('.')}"
                                ?checked=${values.value !== false &&
                    values.value !== null &&
                    values.value !== undefined}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQUc7b0JBQ0wsS0FBSyxFQUFFLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQUksS0FBSztpQkFDbEMsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxLQUFLO2dCQUNMLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLElBQUEsVUFBSSxFQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOztxQ0FFbEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7OzBDQUduQyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNaLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUNyQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO3FCQUMxQixDQUFDLENBQUM7b0JBQ0gsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QixDQUFDOzt3Q0FFTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixTQUFTLEVBQ1QsVUFBVSxDQUNiO3dDQUNPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzJDQUNYLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSztvQkFDakMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJO29CQUNyQixNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVM7OzhCQUU1QixTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztpQkFHakQ7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBL0NELDRCQStDQyJ9
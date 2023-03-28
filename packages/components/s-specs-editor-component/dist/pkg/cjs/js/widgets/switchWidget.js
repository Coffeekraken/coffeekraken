"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
    return {
        keepOriginals: false,
        isActive() {
            return true;
        },
        html({ propObj, values, path }) {
            var _a;
            if (!values) {
                values = {
                    value: (_a = propObj.default) !== null && _a !== void 0 ? _a : false,
                };
            }
            return (0, lit_1.html) `
                <div class="${component.utils.cls('_prop-switch')}">
                    <label class="${component.utils.cls('_label', 's-label')}">
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
            `;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRztvQkFDTCxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxLQUFLO2lCQUNsQyxDQUFDO2FBQ0w7WUFFRCxPQUFPLElBQUEsVUFBSSxFQUFBOzhCQUNPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztvQ0FDN0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7c0NBRXRDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQ3JCLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87aUJBQzFCLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQzs7b0NBRU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQ0FDVixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsU0FBUyxFQUNULFVBQVUsQ0FDYjtvQ0FDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt1Q0FDWCxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUs7Z0JBQ2pDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDckIsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTOzswQkFFNUIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7YUFHakQsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXhDRCw0QkF3Q0MifQ==
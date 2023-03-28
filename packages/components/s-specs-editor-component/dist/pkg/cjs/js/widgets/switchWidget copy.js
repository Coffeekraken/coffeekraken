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
            if (!values) {
                values = {};
            }
            return (0, lit_1.html) `
                <div class="${component.utils.cls('_prop-switch')}">
                    <label class="${component.utils.cls('_label', 's-label')}">
                        <input
                            @change=${(e) => {
                component._update(path, propObj, e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUNmO1lBRUQsT0FBTyxJQUFBLFVBQUksRUFBQTs4QkFDTyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7b0NBQzdCLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7O3NDQUV0QyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNaLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7O29DQUVPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7cUNBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFNBQVMsRUFDVCxVQUFVLENBQ2I7b0NBQ08sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7dUNBQ1gsTUFBTSxDQUFDLEtBQUssS0FBSyxLQUFLO2dCQUNqQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUk7Z0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUzs7MEJBRTVCLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2FBR2pELENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFwQ0QsNEJBb0NDIn0=
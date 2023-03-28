import { html } from 'lit';
export default function (component) {
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
            return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRztvQkFDTCxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxLQUFLO2lCQUNsQyxDQUFDO2FBQ0w7WUFFRCxPQUFPLElBQUksQ0FBQTs4QkFDTyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7b0NBQzdCLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7O3NDQUV0QyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNaLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUNyQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2lCQUMxQixDQUFDLENBQUM7Z0JBQ0gsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7O29DQUVPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7cUNBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFNBQVMsRUFDVCxVQUFVLENBQ2I7b0NBQ08sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7dUNBQ1gsTUFBTSxDQUFDLEtBQUssS0FBSyxLQUFLO2dCQUNqQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUk7Z0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUzs7MEJBRTVCLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2FBR2pELENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==
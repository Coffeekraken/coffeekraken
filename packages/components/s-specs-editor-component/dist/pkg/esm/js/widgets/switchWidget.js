import { html } from 'lit';
export default function (component) {
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
                html: html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQUc7b0JBQ0wsS0FBSyxFQUFFLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQUksS0FBSztpQkFDbEMsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxLQUFLO2dCQUNMLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQTtrQ0FDUSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzs7cUNBRWxDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7OzswQ0FHbkMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDWixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDckIsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTztxQkFDMUIsQ0FBQyxDQUFDO29CQUNILFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzs7d0NBRU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5Q0FDVixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsU0FBUyxFQUNULFVBQVUsQ0FDYjt3Q0FDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzsyQ0FDWCxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUs7b0JBQ2pDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSTtvQkFDckIsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTOzs4QkFFNUIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7aUJBR2pEO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9
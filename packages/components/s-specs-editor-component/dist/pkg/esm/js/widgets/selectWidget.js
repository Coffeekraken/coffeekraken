import { html } from 'lit';
export default function (component) {
    return {
        keepOriginals: false,
        isActive() {
            return true;
        },
        html({ propObj, values, path }) {
            var _a, _b;
            if (!values) {
                values = {
                    value: propObj.default,
                };
            }
            return html `
                <div class="${component.utils.cls('_select-widget')}">
                    <label
                        class="${component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <select
                            @change=${(e) => {
                component.apply(path, {
                    value: e.target.value,
                });
                component.apply();
            }}
                            name="${path.at(-1)}"
                            class="${component.utils.cls('_select', 's-select')}"
                            placeholder="${(_b = (_a = propObj.default) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}"
                            path="${path.join('.')}"
                            .value="${values.value}"
                            value="${values.value}"
                        >
                            ${propObj.options.map((option) => html `
                                    <option
                                        .value="${option.value}"
                                        value="${option.value}"
                                        ?selected=${(!values.value &&
                option.value === null) ||
                option.value === String(values.value)}
                                    >
                                        ${option.name}
                                    </option>
                                `)}
                        </select>

                        ${component.renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBYTtvQkFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87aUJBQ3pCLENBQUM7YUFDTDtZQUVELE9BQU8sSUFBSSxDQUFBOzhCQUNPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOztpQ0FFbEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztzQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNaLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUNsQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2lCQUN4QixDQUFDLENBQUM7Z0JBQ0gsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7b0NBQ08sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQ0FDVixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsU0FBUyxFQUNULFVBQVUsQ0FDYjsyQ0FDYyxNQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQzlCLE9BQU8sQ0FBQyxLQUFLLG1DQUNiLE9BQU8sQ0FBQyxFQUFFO29DQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3NDQUNaLE1BQU0sQ0FBQyxLQUFLO3FDQUNiLE1BQU0sQ0FBQyxLQUFLOzs4QkFFbkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2pCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7O2tEQUVFLE1BQU0sQ0FBQyxLQUFLO2lEQUNiLE1BQU0sQ0FBQyxLQUFLO29EQUNULENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDdEIsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7OzBDQUVuQyxNQUFNLENBQUMsSUFBSTs7aUNBRXBCLENBQ0o7OzswQkFHSCxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OzthQUdqRCxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=
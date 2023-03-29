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
            var _a, _b;
            if (!values) {
                values = {
                    value: propObj.default,
                };
            }
            return (0, lit_1.html) `
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
                            ${propObj.options.map((option) => (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBYTtvQkFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87aUJBQ3pCLENBQUM7YUFDTDtZQUVELE9BQU8sSUFBQSxVQUFJLEVBQUE7OEJBQ08sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7O2lDQUVsQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O3NDQUdhLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ2xCLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7aUJBQ3hCLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQztvQ0FDTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FDQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixTQUFTLEVBQ1QsVUFBVSxDQUNiOzJDQUNjLE1BQUEsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FDOUIsT0FBTyxDQUFDLEtBQUssbUNBQ2IsT0FBTyxDQUFDLEVBQUU7b0NBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7c0NBQ1osTUFBTSxDQUFDLEtBQUs7cUNBQ2IsTUFBTSxDQUFDLEtBQUs7OzhCQUVuQixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDakIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUEsVUFBSSxFQUFBOztrREFFRSxNQUFNLENBQUMsS0FBSztpREFDYixNQUFNLENBQUMsS0FBSztvREFDVCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO2dCQUMxQixNQUFNLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzswQ0FFbkMsTUFBTSxDQUFDLElBQUk7O2lDQUVwQixDQUNKOzs7MEJBR0gsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7YUFHakQsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTdERCw0QkE2REMifQ==
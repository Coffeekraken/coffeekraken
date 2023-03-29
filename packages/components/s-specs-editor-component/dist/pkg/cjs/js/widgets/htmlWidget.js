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
            var _a, _b;
            if (!values) {
                values = {
                    value: propObj.default,
                };
            }
            return {
                error,
                warning,
                html: (0, lit_1.html) `
                    <div class="${component.utils.cls('_html-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <textarea
                                rows="5"
                                @change=${(e) => component._update(path, propObj, e)}
                                name="${path.at(-1)}"
                                class="${component.utils.cls('_input', 's-input')}"
                                placeholder="${(_b = (_a = propObj.default) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}"
                                path="${path.join('.')}"
                            >
${values.value}</textarea
                            >
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLG1CQUF5QixTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2lCQUN6QixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7a0NBQ1EsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDOztxQ0FFaEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7Ozs7MENBSWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNaLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7d0NBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUNBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUixTQUFTLENBQ1o7K0NBQ2MsTUFBQSxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUM5QixPQUFPLENBQUMsS0FBSyxtQ0FDYixPQUFPLENBQUMsRUFBRTt3Q0FDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7RUFFcEQsTUFBTSxDQUFDLEtBQUs7OzhCQUVnQixTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztpQkFHakQ7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBaERELDRCQWdEQyJ9
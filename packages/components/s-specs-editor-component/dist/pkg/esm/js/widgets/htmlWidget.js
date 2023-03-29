import { html } from 'lit';
export default function (component) {
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
                html: html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2lCQUN6QixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQzs7cUNBRWhDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7OzBDQUlhLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDWixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO3dDQUMvQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1IsU0FBUyxDQUNaOytDQUNjLE1BQUEsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FDOUIsT0FBTyxDQUFDLEtBQUssbUNBQ2IsT0FBTyxDQUFDLEVBQUU7d0NBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O0VBRXBELE1BQU0sQ0FBQyxLQUFLOzs4QkFFZ0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7aUJBR2pEO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9
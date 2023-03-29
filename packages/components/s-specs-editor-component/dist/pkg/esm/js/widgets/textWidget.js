import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
export default function (component) {
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
                html: html `
                    <div class="${component.utils.cls('_text-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <input
                                @change=${(e) => {
                    if (propObj.required && !e.target.value) {
                        error = __i18n(`This property is required`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSTlDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2lCQUN6QixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQzs7cUNBRWhDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7MENBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDWixJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTt3QkFDckMsS0FBSyxHQUFHLE1BQU0sQ0FDViwyQkFBMkIsRUFDM0I7NEJBQ0ksRUFBRSxFQUFFLGdDQUFnQzt5QkFDdkMsQ0FDSixDQUFDO3dCQUNGLE9BQU8sU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUNwQztvQkFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRWYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBQ3JCLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7cUJBQ3hCLENBQUMsQ0FBQztvQkFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7O3dDQUVPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUNBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUixTQUFTLENBQ1o7K0NBQ2MsT0FBTyxDQUFDLFdBQVc7d0NBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3lDQUNiLE1BQU0sQ0FBQyxLQUFLOzs4QkFFdkIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7aUJBR2pEO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9
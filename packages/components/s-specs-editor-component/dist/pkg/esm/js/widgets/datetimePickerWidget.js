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
                values = {};
            }
            return html `
                <div class="${component.utils.cls('_datetime-picker')}">
                    <label
                        class="${component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <s-datetime-picker
                            value="${(_a = values.value) !== null && _a !== void 0 ? _a : new Date().toISOString()}"
                            format="${(_b = values.format) !== null && _b !== void 0 ? _b : 'YYYY-MM-DD'}"
                            @s-datetime-picker.change=${(e) => {
                _console.log('e', e);
                // component.setValue(path, {
                //     ...values,
                //     value: e.detail[
                //         values.format ?? 'hexa'
                //     ],
                // });
                // component.apply();
            }}
                        >
                            <input
                                type="text"
                                name="datetime"
                                class="s-input"
                                placeholder="Choose a datetime"
                            />
                        </s-datetime-picker>
                        ${component._renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUNELE9BQU8sSUFBSSxDQUFBOzhCQUNPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDOztpQ0FFcEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztxQ0FHWSxNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO3NDQUN2QyxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLFlBQVk7d0RBQ1gsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXJCLDZCQUE2QjtnQkFDN0IsaUJBQWlCO2dCQUNqQix1QkFBdUI7Z0JBQ3ZCLGtDQUFrQztnQkFDbEMsU0FBUztnQkFDVCxNQUFNO2dCQUNOLHFCQUFxQjtZQUN6QixDQUFDOzs7Ozs7Ozs7MEJBU0gsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7YUFHbEQsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9
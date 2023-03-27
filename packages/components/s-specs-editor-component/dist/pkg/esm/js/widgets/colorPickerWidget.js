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
                <div class="${component.utils.cls('_color-picker')}">
                    <label
                        class="${component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <s-color-picker
                            value="${(_a = values.value) !== null && _a !== void 0 ? _a : '#ff0000'}"
                            format="${(_b = values.format) !== null && _b !== void 0 ? _b : 'hexa'}"
                            @s-color-picker.change=${(e) => {
                var _a;
                component.setValue(path, Object.assign(Object.assign({}, values), { value: e.detail[(_a = values.format) !== null && _a !== void 0 ? _a : 'hexa'] }));
                component.apply();
            }}
                        >
                            <input
                                type="text"
                                name="color"
                                class="s-input"
                                placeholder="Choose a color"
                            />
                            <div class="_color-preview"></div>
                        </s-color-picker>
                        ${component._renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUVELE9BQU8sSUFBSSxDQUFBOzhCQUNPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzs7aUNBRWpDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7cUNBR1ksTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxTQUFTO3NDQUN4QixNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLE1BQU07cURBQ1IsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7Z0JBQzNCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxrQ0FDaEIsTUFBTSxLQUNULEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksTUFBTSxDQUFDLElBQzFDLENBQUM7Z0JBQ0gsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7Ozs7Ozs7Ozs7MEJBVUgsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7YUFHbEQsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9
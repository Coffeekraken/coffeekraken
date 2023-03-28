import __SColor from '@coffeekraken/s-color';
import { html } from 'lit';
export default function (component) {
    return {
        keepOriginals: false,
        isActive() {
            return true;
        },
        html({ propObj, values, path }) {
            var _a, _b, _c, _d;
            if (!values) {
                const color = new __SColor((_a = propObj.default) !== null && _a !== void 0 ? _a : '#ff0000', {
                    defaultFormat: (_b = propObj.format) !== null && _b !== void 0 ? _b : 'hexa',
                });
                values = Object.assign(Object.assign({}, color.toObject()), { format: (_c = propObj.format) !== null && _c !== void 0 ? _c : 'hexa', value: (_d = propObj.default) !== null && _d !== void 0 ? _d : color.toString() });
            }
            _console.log('Values', values);
            return html `
                <div class="${component.utils.cls('_color-picker')}">
                    <label
                        class="${component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <s-color-picker
                            value="${values.value}"
                            format="${values.format}"
                            @s-color-picker.change=${(e) => {
                component.setValue(path, e.detail);
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
                        ${component.renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQUksU0FBUyxFQUFFO29CQUNyRCxhQUFhLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxNQUFNO2lCQUMxQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxHQUFHLGdDQUNGLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FDbkIsTUFBTSxFQUFFLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksTUFBTSxFQUNoQyxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQzdDLENBQUM7YUFDTDtZQUNELFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRS9CLE9BQU8sSUFBSSxDQUFBOzhCQUNPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzs7aUNBRWpDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7cUNBR1ksTUFBTSxDQUFDLEtBQUs7c0NBQ1gsTUFBTSxDQUFDLE1BQU07cURBQ0UsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQzs7Ozs7Ozs7OzswQkFVSCxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OzthQUdqRCxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=
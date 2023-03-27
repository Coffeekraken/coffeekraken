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
                values = {};
            }
            return (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUVELE9BQU8sSUFBQSxVQUFJLEVBQUE7OEJBQ08sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDOztpQ0FFakMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztxQ0FHWSxNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLFNBQVM7c0NBQ3hCLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksTUFBTTtxREFDUixDQUFDLENBQUMsRUFBRSxFQUFFOztnQkFDM0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtDQUNoQixNQUFNLEtBQ1QsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxNQUFNLENBQUMsSUFDMUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQzs7Ozs7Ozs7OzswQkFVSCxTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OzthQUdsRCxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBNUNELDRCQTRDQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
    let error, warning;
    return {
        isActive() {
            var _a;
            return (_a = component.props.features) === null || _a === void 0 ? void 0 : _a.upload;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = {};
            }
            return {
                error,
                warning,
                html: (0, lit_1.html) `
                    <div class="${component.utils.cls('_image-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                            @click=${(e) => e.preventDefault()}
                        >
                            ${component.renderLabel(propObj, path)}
                        </label>
                        <s-dropzone
                            accept="image/*"
                            files="${values.url}"
                            upload
                            @s-dropzone.clear=${(e) => {
                    component.clearValue([...path, 'url']);
                    component.apply();
                }}
                            @s-dropzone.file=${(e) => {
                    component.setValue(path, e.detail[0]);
                    component.apply();
                }}
                        ></s-dropzone>
                    </div>
                `,
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLG1CQUF5QixTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTs7WUFDSixPQUFPLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FBQztRQUM1QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7a0NBQ1EsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDOztxQ0FFakMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7cUNBQ1EsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUU7OzhCQUVoQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7cUNBSTdCLE1BQU0sQ0FBQyxHQUFHOztnREFFQyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUN0QixTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QixDQUFDOytDQUNrQixDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNyQixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzs7O2lCQUdaO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTVDRCw0QkE0Q0MifQ==
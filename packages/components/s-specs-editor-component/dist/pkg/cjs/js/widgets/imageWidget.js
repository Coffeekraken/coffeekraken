"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
    return {
        keepOriginals: true,
        isActive() {
            var _a;
            return (_a = component.props.features) === null || _a === void 0 ? void 0 : _a.upload;
        },
        html({ propObj, values, path }) {
            if (!values) {
                values = {};
            }
            return (0, lit_1.html) `
                <div class="${component.utils.cls('_dropzone')}">
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
            `;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUNuQixRQUFROztZQUNKLE9BQU8sTUFBQSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUVELE9BQU8sSUFBQSxVQUFJLEVBQUE7OEJBQ08sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDOztpQ0FFN0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7aUNBQ1EsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUU7OzBCQUVoQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7aUNBSTdCLE1BQU0sQ0FBQyxHQUFHOzs0Q0FFQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN0QixTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7MkNBQ2tCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7OzthQUdaLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF2Q0QsNEJBdUNDIn0=
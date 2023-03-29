import { html } from 'lit';
export default function (component) {
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
                html: html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTs7WUFDSixPQUFPLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FBQztRQUM1QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzs7cUNBRWpDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCO3FDQUNRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFOzs4QkFFaEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7O3FDQUk3QixNQUFNLENBQUMsR0FBRzs7Z0RBRUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDdEIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzsrQ0FDa0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDckIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7OztpQkFHWjthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==
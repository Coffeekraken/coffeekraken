import { html } from 'lit';
export default function (component) {
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
            return html `
                <div class="${component.utils.cls('_dropzone')}">
                    <label
                        class="${component.utils.cls('_label', 's-label s-label--block')}"
                        @click=${(e) => e.preventDefault()}
                    >
                        ${component._renderLabel(propObj, path)}
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
                component.setValue([...path, 'url'], e.detail[0].url);
                component.apply();
            }}
                    ></s-dropzone>
                </div>
            `;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUNuQixRQUFROztZQUNKLE9BQU8sTUFBQSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUVELE9BQU8sSUFBSSxDQUFBOzhCQUNPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzs7aUNBRTdCLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCO2lDQUNRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFOzswQkFFaEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7O2lDQUk5QixNQUFNLENBQUMsR0FBRzs7NENBRUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixDQUFDOzJDQUNrQixDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixTQUFTLENBQUMsUUFBUSxDQUNkLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ2hCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUNsQixDQUFDO2dCQUNGLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixDQUFDOzs7YUFHWixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=
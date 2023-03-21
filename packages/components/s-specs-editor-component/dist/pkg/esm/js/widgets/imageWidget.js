import { html } from 'lit';
export default function (component) {
    return {
        isActive() {
            var _a;
            return (_a = component.props.features) === null || _a === void 0 ? void 0 : _a.upload;
        },
        html({ propObj, values }) {
            if (!values) {
                values = {};
            }
            return html `
                <div class="${component.utils.cls('_dropzone')}">
                    <s-dropzone
                        accept="image/*"
                        .files="${values.url}"
                        upload
                    ></s-dropzone>
                </div>
            `;
        },
        events: {
            's-dropzone.clear': (e) => {
                const $url = e.$scope.querySelector(`input[name="url"]`);
                if ($url) {
                    $url.removeAttribute('value');
                    $url.value = '';
                    $url.dispatchEvent(new CustomEvent('change', {
                        bubbles: true,
                    }));
                }
            },
            's-dropzone.file': (e) => {
                const $url = e.$scope.querySelector(`input[name="url"]`);
                if ($url) {
                    // $url.setAttribute('value', e.detail[0].url);
                    $url.value = e.detail[0].url;
                    $url.dispatchEvent(new CustomEvent('change', {
                        bubbles: true,
                    }));
                }
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxRQUFROztZQUNKLE9BQU8sTUFBQSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUNmO1lBQ0QsT0FBTyxJQUFJLENBQUE7OEJBQ08sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDOzs7a0NBRzVCLE1BQU0sQ0FBQyxHQUFHOzs7O2FBSS9CLENBQUM7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFFekQsSUFBSSxJQUFJLEVBQUU7b0JBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQ2QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO3dCQUN0QixPQUFPLEVBQUUsSUFBSTtxQkFDaEIsQ0FBQyxDQUNMLENBQUM7aUJBQ0w7WUFDTCxDQUFDO1lBQ0QsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDekQsSUFBSSxJQUFJLEVBQUU7b0JBQ04sK0NBQStDO29CQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUM3QixJQUFJLENBQUMsYUFBYSxDQUNkLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTt3QkFDdEIsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsQ0FDTCxDQUFDO2lCQUNMO1lBQ0wsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==
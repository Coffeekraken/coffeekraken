import { html } from 'lit';
export default function (component) {
    return {
        html(props, values) {
            return html `
                <div
                    class="${component.componentUtils.className('__dropzone')}"
                >
                    <s-dropzone
                        accept="image/*"
                        files="${values.url}"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxJQUFJLENBQUMsS0FBVSxFQUFFLE1BQVc7WUFDeEIsT0FBTyxJQUFJLENBQUE7OzZCQUVNLFNBQVMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQzs7OztpQ0FJNUMsTUFBTSxDQUFDLEdBQUc7Ozs7YUFJOUIsQ0FBQztRQUNOLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixrQkFBa0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN0QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUV6RCxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FDZCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7d0JBQ3RCLE9BQU8sRUFBRSxJQUFJO3FCQUNoQixDQUFDLENBQ0wsQ0FBQztpQkFDTDtZQUNMLENBQUM7WUFDRCxpQkFBaUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLElBQUksRUFBRTtvQkFDTiwrQ0FBK0M7b0JBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQ2QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO3dCQUN0QixPQUFPLEVBQUUsSUFBSTtxQkFDaEIsQ0FBQyxDQUNMLENBQUM7aUJBQ0w7WUFDTCxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9
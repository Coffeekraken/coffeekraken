"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
    return {
        isActive() {
            var _a;
            return (_a = component.props.features) === null || _a === void 0 ? void 0 : _a.upload;
        },
        html({ propObj, values }) {
            if (!values) {
                values = {};
            }
            return (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxRQUFROztZQUNKLE9BQU8sTUFBQSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUNmO1lBQ0QsT0FBTyxJQUFBLFVBQUksRUFBQTs4QkFDTyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7OztrQ0FHNUIsTUFBTSxDQUFDLEdBQUc7Ozs7YUFJL0IsQ0FBQztRQUNOLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixrQkFBa0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN0QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUV6RCxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FDZCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7d0JBQ3RCLE9BQU8sRUFBRSxJQUFJO3FCQUNoQixDQUFDLENBQ0wsQ0FBQztpQkFDTDtZQUNMLENBQUM7WUFDRCxpQkFBaUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLElBQUksRUFBRTtvQkFDTiwrQ0FBK0M7b0JBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQ2QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO3dCQUN0QixPQUFPLEVBQUUsSUFBSTtxQkFDaEIsQ0FBQyxDQUNMLENBQUM7aUJBQ0w7WUFDTCxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQS9DRCw0QkErQ0MifQ==
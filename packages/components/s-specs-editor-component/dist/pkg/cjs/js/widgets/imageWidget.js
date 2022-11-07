"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
    return {
        html(props, values) {
            return (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxJQUFJLENBQUMsS0FBVSxFQUFFLE1BQVc7WUFDeEIsT0FBTyxJQUFBLFVBQUksRUFBQTs7NkJBRU0sU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDOzs7O2lDQUk1QyxNQUFNLENBQUMsR0FBRzs7OzthQUk5QixDQUFDO1FBQ04sQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBRXpELElBQUksSUFBSSxFQUFFO29CQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNoQixJQUFJLENBQUMsYUFBYSxDQUNkLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTt3QkFDdEIsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsQ0FDTCxDQUFDO2lCQUNMO1lBQ0wsQ0FBQztZQUNELGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3pELElBQUksSUFBSSxFQUFFO29CQUNOLCtDQUErQztvQkFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FDZCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7d0JBQ3RCLE9BQU8sRUFBRSxJQUFJO3FCQUNoQixDQUFDLENBQ0wsQ0FBQztpQkFDTDtZQUNMLENBQUM7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBM0NELDRCQTJDQyJ9
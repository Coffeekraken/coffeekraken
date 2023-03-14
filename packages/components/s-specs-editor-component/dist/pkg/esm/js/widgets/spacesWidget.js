import { html } from 'lit';
export default function (component) {
    return {
        hideOriginals: true,
        html(props, values) {
            return html `
                <div class="${component.utils.cls('_spaces')}">Spaces</div>
            `;
        },
        events: {
        // 's-dropzone.clear': (e) => {
        //     const $url = e.$scope.querySelector(`input[name="url"]`);
        //     if ($url) {
        //         $url.removeAttribute('value');
        //         $url.value = '';
        //         $url.dispatchEvent(
        //             new CustomEvent('change', {
        //                 bubbles: true,
        //             }),
        //         );
        //     }
        // },
        // 's-dropzone.file': (e) => {
        //     const $url = e.$scope.querySelector(`input[name="url"]`);
        //     if ($url) {
        //         // $url.setAttribute('value', e.detail[0].url);
        //         $url.value = e.detail[0].url;
        //         $url.dispatchEvent(
        //             new CustomEvent('change', {
        //                 bubbles: true,
        //             }),
        //         );
        //     }
        // },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUNuQixJQUFJLENBQUMsS0FBVSxFQUFFLE1BQVc7WUFDeEIsT0FBTyxJQUFJLENBQUE7OEJBQ08sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2FBQy9DLENBQUM7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1FBQ0osK0JBQStCO1FBQy9CLGdFQUFnRTtRQUNoRSxrQkFBa0I7UUFDbEIseUNBQXlDO1FBQ3pDLDJCQUEyQjtRQUMzQiw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLGlDQUFpQztRQUNqQyxrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLFFBQVE7UUFDUixLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLGdFQUFnRTtRQUNoRSxrQkFBa0I7UUFDbEIsMERBQTBEO1FBQzFELHdDQUF3QztRQUN4Qyw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLGlDQUFpQztRQUNqQyxrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLFFBQVE7UUFDUixLQUFLO1NBQ1I7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9
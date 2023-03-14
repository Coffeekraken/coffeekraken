"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
    return {
        hideOriginals: true,
        html(props, values) {
            return (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUNuQixJQUFJLENBQUMsS0FBVSxFQUFFLE1BQVc7WUFDeEIsT0FBTyxJQUFBLFVBQUksRUFBQTs4QkFDTyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDL0MsQ0FBQztRQUNOLENBQUM7UUFDRCxNQUFNLEVBQUU7UUFDSiwrQkFBK0I7UUFDL0IsZ0VBQWdFO1FBQ2hFLGtCQUFrQjtRQUNsQix5Q0FBeUM7UUFDekMsMkJBQTJCO1FBQzNCLDhCQUE4QjtRQUM5QiwwQ0FBMEM7UUFDMUMsaUNBQWlDO1FBQ2pDLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsUUFBUTtRQUNSLEtBQUs7UUFDTCw4QkFBOEI7UUFDOUIsZ0VBQWdFO1FBQ2hFLGtCQUFrQjtRQUNsQiwwREFBMEQ7UUFDMUQsd0NBQXdDO1FBQ3hDLDhCQUE4QjtRQUM5QiwwQ0FBMEM7UUFDMUMsaUNBQWlDO1FBQ2pDLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsUUFBUTtRQUNSLEtBQUs7U0FDUjtLQUNKLENBQUM7QUFDTixDQUFDO0FBbkNELDRCQW1DQyJ9
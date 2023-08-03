import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';
export default class SSpecsEditorComponentWysiwygWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
    }
    render() {
        return html `
            <div
                class="${this.editor.utils.cls('_wysiwyg-widget')}"
                @s-wysiwyg.change=${(e) => {
            this.setValue(e.detail);
            // const $preview = document.querySelector('._preview');
            // const wysiwyg = new __SWysiwyg(propObj, e.detail ?? {});
            // $preview.innerHTML = wysiwyg.toString(
            //     ({ type, content, isBlock }) => {
            //         switch (type) {
            //             case 'root':
            //                 return `<div>\n${content}\n</div>`;
            //             case 'text':
            //                 return content;
            //             case 'br':
            //                 return '\n<br />\n';
            //             default:
            //                 return `<${type} class="s-typo s-typo--${type}">${content}</${type}>`;
            //         }
            //     },
            // );
        }}
            >
                ${this.renderLabel()}

                <s-wysiwyg frontspec></s-wysiwyg>

                <div class="_preview"></div>
            </div>
        `;
    }
}
// specify if the final value has to be just the "value" data
// and not an object with the "value" property
SSpecsEditorComponentWysiwygWidget.unwrapValue = true;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxPQUFPLGtDQUFtQyxTQUFRLG9CQUFvQjtJQVVoRixZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzt5QkFFTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7b0NBQzdCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsd0RBQXdEO1lBQ3hELDJEQUEyRDtZQUMzRCx5Q0FBeUM7WUFDekMsd0NBQXdDO1lBQ3hDLDBCQUEwQjtZQUMxQiwyQkFBMkI7WUFDM0Isc0RBQXNEO1lBQ3RELDJCQUEyQjtZQUMzQixrQ0FBa0M7WUFDbEMseUJBQXlCO1lBQ3pCLHVDQUF1QztZQUN2Qyx1QkFBdUI7WUFDdkIseUZBQXlGO1lBQ3pGLFlBQVk7WUFDWixTQUFTO1lBQ1QsS0FBSztRQUNULENBQUM7O2tCQUVDLElBQUksQ0FBQyxXQUFXLEVBQUU7Ozs7OztTQU0zQixDQUFDO0lBQ04sQ0FBQzs7QUE1Q0QsNkRBQTZEO0FBQzdELDhDQUE4QztBQUN2Qyw4Q0FBVyxHQUFHLElBQUksQ0FBQyJ9
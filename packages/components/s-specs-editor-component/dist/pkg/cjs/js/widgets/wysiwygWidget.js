"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentWysiwygWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
    }
    render() {
        return (0, lit_1.html) `
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
exports.default = SSpecsEditorComponentWysiwygWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxNQUFxQixrQ0FBbUMsU0FBUSw0QkFBb0I7SUFNaEYsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzt5QkFFTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7b0NBQzdCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsd0RBQXdEO1lBQ3hELDJEQUEyRDtZQUMzRCx5Q0FBeUM7WUFDekMsd0NBQXdDO1lBQ3hDLDBCQUEwQjtZQUMxQiwyQkFBMkI7WUFDM0Isc0RBQXNEO1lBQ3RELDJCQUEyQjtZQUMzQixrQ0FBa0M7WUFDbEMseUJBQXlCO1lBQ3pCLHVDQUF1QztZQUN2Qyx1QkFBdUI7WUFDdkIseUZBQXlGO1lBQ3pGLFlBQVk7WUFDWixTQUFTO1lBQ1QsS0FBSztRQUNULENBQUM7O2tCQUVDLElBQUksQ0FBQyxXQUFXLEVBQUU7Ozs7OztTQU0zQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBMUNELHFEQTBDQyJ9
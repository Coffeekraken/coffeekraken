"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentWysiwygWidget extends SSpecsEditorWidget_1.default {
    static isActive() {
        return true;
    }
    constructor(deps) {
        super(deps);
        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
    }
    render() {
        return (0, lit_1.html) `
            <div
                class="${this.editor.utils.cls('_wysiwyg-widget')}"
                @s-wysiwyg.change=${(e) => {
            this.setValue(e.detail);
            this.editor.apply();
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
                <label
                    class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
                >
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>

                <s-wysiwyg frontspec></s-wysiwyg>

                <div class="_preview"></div>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentWysiwygWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxNQUFxQixrQ0FBbUMsU0FBUSw0QkFBb0I7SUFNaEYsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7O3lCQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztvQ0FDN0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXBCLHdEQUF3RDtZQUN4RCwyREFBMkQ7WUFDM0QseUNBQXlDO1lBQ3pDLHdDQUF3QztZQUN4QywwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLHNEQUFzRDtZQUN0RCwyQkFBMkI7WUFDM0Isa0NBQWtDO1lBQ2xDLHlCQUF5QjtZQUN6Qix1Q0FBdUM7WUFDdkMsdUJBQXVCO1lBQ3ZCLHlGQUF5RjtZQUN6RixZQUFZO1lBQ1osU0FBUztZQUNULEtBQUs7UUFDVCxDQUFDOzs7NkJBR1ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOztzQkFFQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7U0FPN0QsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTNERCxxREEyREMifQ==
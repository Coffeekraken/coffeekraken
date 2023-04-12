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
        if (!this.values.value && this.propObj.default) {
            this.values.value = this.propObj.default;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxNQUFxQixrQ0FBbUMsU0FBUSw0QkFBb0I7SUFNaEYsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7O3lCQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztvQ0FDN0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4Qix3REFBd0Q7WUFDeEQsMkRBQTJEO1lBQzNELHlDQUF5QztZQUN6Qyx3Q0FBd0M7WUFDeEMsMEJBQTBCO1lBQzFCLDJCQUEyQjtZQUMzQixzREFBc0Q7WUFDdEQsMkJBQTJCO1lBQzNCLGtDQUFrQztZQUNsQyx5QkFBeUI7WUFDekIsdUNBQXVDO1lBQ3ZDLHVCQUF1QjtZQUN2Qix5RkFBeUY7WUFDekYsWUFBWTtZQUNaLFNBQVM7WUFDVCxLQUFLO1FBQ1QsQ0FBQzs7a0JBRUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7Ozs7O1NBTTNCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE5Q0QscURBOENDIn0=
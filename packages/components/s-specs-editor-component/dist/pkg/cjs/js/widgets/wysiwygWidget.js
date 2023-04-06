"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
class SSpecsEditorComponentWysiwygWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        if (!values) {
            values = {
                value: propObj.default,
            };
        }
        return (0, lit_1.html) `
            <div
                class="${this._component.utils.cls('_wysiwyg-widget')}"
                @s-wysiwyg.change=${(e) => {
            _console.log('Path', this._path);
            this._component.setValue(this._path, e.detail);
            this._component.apply();
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
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    ${this._component.renderLabel(propObj, path)}
                </label>

                <s-wysiwyg frontspec></s-wysiwyg>

                <div class="_preview"></div>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentWysiwygWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLE1BQXFCLGtDQUFrQztJQVVuRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLEdBQWtCO2dCQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87YUFDekIsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFBLFVBQUksRUFBQTs7eUJBRU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO29DQUNqQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3RCLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXhCLHdEQUF3RDtZQUN4RCwyREFBMkQ7WUFDM0QseUNBQXlDO1lBQ3pDLHdDQUF3QztZQUN4QywwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLHNEQUFzRDtZQUN0RCwyQkFBMkI7WUFDM0Isa0NBQWtDO1lBQ2xDLHlCQUF5QjtZQUN6Qix1Q0FBdUM7WUFDdkMsdUJBQXVCO1lBQ3ZCLHlGQUF5RjtZQUN6RixZQUFZO1lBQ1osU0FBUztZQUNULEtBQUs7UUFDVCxDQUFDOzs7NkJBR1ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOztzQkFFQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O1NBT3ZELENBQUM7SUFDTixDQUFDO0NBQ0o7QUFwRUQscURBb0VDIn0=
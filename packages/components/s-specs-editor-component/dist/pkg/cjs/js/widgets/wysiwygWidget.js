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
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
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
            `,
        };
    }
}
exports.default = SSpecsEditorComponentWysiwygWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLE1BQXFCLGtDQUFrQztJQVluRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLEdBQWtCO2dCQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87YUFDekIsQ0FBQztTQUNMO1FBRUQsT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsSUFBSSxFQUFFLElBQUEsVUFBSSxFQUFBOzs2QkFFTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7d0NBQ2pDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RCLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRXhCLHdEQUF3RDtnQkFDeEQsMkRBQTJEO2dCQUMzRCx5Q0FBeUM7Z0JBQ3pDLHdDQUF3QztnQkFDeEMsMEJBQTBCO2dCQUMxQiwyQkFBMkI7Z0JBQzNCLHNEQUFzRDtnQkFDdEQsMkJBQTJCO2dCQUMzQixrQ0FBa0M7Z0JBQ2xDLHlCQUF5QjtnQkFDekIsdUNBQXVDO2dCQUN2Qyx1QkFBdUI7Z0JBQ3ZCLHlGQUF5RjtnQkFDekYsWUFBWTtnQkFDWixTQUFTO2dCQUNULEtBQUs7WUFDVCxDQUFDOzs7aUNBR1ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzswQkFFQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O2FBT3ZEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTFFRCxxREEwRUMifQ==
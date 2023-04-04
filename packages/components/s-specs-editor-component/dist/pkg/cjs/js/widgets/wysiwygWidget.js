"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
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
                var _a;
                const $preview = document.querySelector('._preview');
                const wysiwyg = new utils_1.__SWysiwyg(propObj, (_a = e.detail) !== null && _a !== void 0 ? _a : {});
                $preview.innerHTML = wysiwyg.toString(({ type, content, isBlock }) => {
                    switch (type) {
                        case 'root':
                            return `<div>\n${content}\n</div>`;
                        case 'text':
                            return content;
                        case 'br':
                            return '\n<br />\n';
                        default:
                            return `<${type} class="s-typo s-typo--${type}">${content}</${type}>`;
                    }
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLGlEQUFtRDtBQUVuRCxNQUFxQixrQ0FBa0M7SUFZbkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFrQjtnQkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2FBQ3pCLENBQUM7U0FDTDtRQUVELE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFBLFVBQUksRUFBQTs7NkJBRU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO3dDQUNqQyxDQUFDLENBQUMsRUFBRSxFQUFFOztnQkFDdEIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUFDLE9BQU8sRUFBRSxNQUFBLENBQUMsQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxRQUFRLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQ2pDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7b0JBQzNCLFFBQVEsSUFBSSxFQUFFO3dCQUNWLEtBQUssTUFBTTs0QkFDUCxPQUFPLFVBQVUsT0FBTyxVQUFVLENBQUM7d0JBQ3ZDLEtBQUssTUFBTTs0QkFDUCxPQUFPLE9BQU8sQ0FBQzt3QkFDbkIsS0FBSyxJQUFJOzRCQUNMLE9BQU8sWUFBWSxDQUFDO3dCQUN4Qjs0QkFDSSxPQUFPLElBQUksSUFBSSwwQkFBMEIsSUFBSSxLQUFLLE9BQU8sS0FBSyxJQUFJLEdBQUcsQ0FBQztxQkFDN0U7Z0JBQ0wsQ0FBQyxDQUNKLENBQUM7WUFDTixDQUFDOzs7aUNBR1ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzswQkFFQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O2FBT3ZEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXRFRCxxREFzRUMifQ==
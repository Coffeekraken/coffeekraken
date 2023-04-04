import { html } from 'lit';
import { __SWysiwyg } from '@specimen/types/utils';
export default class SSpecsEditorComponentWysiwygWidget {
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
            html: html `
                <div
                    class="${this._component.utils.cls('_wysiwyg-widget')}"
                    @s-wysiwyg.change=${(e) => {
                var _a;
                const $preview = document.querySelector('._preview');
                const wysiwyg = new __SWysiwyg(propObj, (_a = e.detail) !== null && _a !== void 0 ? _a : {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRW5ELE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQWtDO0lBWW5ELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBa0I7Z0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTzthQUN6QixDQUFDO1NBQ0w7UUFFRCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFBOzs2QkFFTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7d0NBQ2pDLENBQUMsQ0FBQyxFQUFFLEVBQUU7O2dCQUN0QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBQSxDQUFDLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFDeEQsUUFBUSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUNqQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO29CQUMzQixRQUFRLElBQUksRUFBRTt3QkFDVixLQUFLLE1BQU07NEJBQ1AsT0FBTyxVQUFVLE9BQU8sVUFBVSxDQUFDO3dCQUN2QyxLQUFLLE1BQU07NEJBQ1AsT0FBTyxPQUFPLENBQUM7d0JBQ25CLEtBQUssSUFBSTs0QkFDTCxPQUFPLFlBQVksQ0FBQzt3QkFDeEI7NEJBQ0ksT0FBTyxJQUFJLElBQUksMEJBQTBCLElBQUksS0FBSyxPQUFPLEtBQUssSUFBSSxHQUFHLENBQUM7cUJBQzdFO2dCQUNMLENBQUMsQ0FDSixDQUFDO1lBQ04sQ0FBQzs7O2lDQUdZLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7MEJBRUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7Ozs7OzthQU92RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
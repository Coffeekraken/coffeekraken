import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentWysiwygWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxPQUFPLGtDQUFtQyxTQUFRLG9CQUFvQjtJQU1oRixZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7O3lCQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztvQ0FDN0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4Qix3REFBd0Q7WUFDeEQsMkRBQTJEO1lBQzNELHlDQUF5QztZQUN6Qyx3Q0FBd0M7WUFDeEMsMEJBQTBCO1lBQzFCLDJCQUEyQjtZQUMzQixzREFBc0Q7WUFDdEQsMkJBQTJCO1lBQzNCLGtDQUFrQztZQUNsQyx5QkFBeUI7WUFDekIsdUNBQXVDO1lBQ3ZDLHVCQUF1QjtZQUN2Qix5RkFBeUY7WUFDekYsWUFBWTtZQUNaLFNBQVM7WUFDVCxLQUFLO1FBQ1QsQ0FBQzs7a0JBRUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7Ozs7O1NBTTNCLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
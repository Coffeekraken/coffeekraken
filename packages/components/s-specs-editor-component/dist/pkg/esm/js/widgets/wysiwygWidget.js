import { html } from 'lit';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQ0FBa0M7SUFZbkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFrQjtnQkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2FBQ3pCLENBQUM7U0FDTDtRQUVELE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUE7OzZCQUVPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzt3Q0FDakMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFeEIsd0RBQXdEO2dCQUN4RCwyREFBMkQ7Z0JBQzNELHlDQUF5QztnQkFDekMsd0NBQXdDO2dCQUN4QywwQkFBMEI7Z0JBQzFCLDJCQUEyQjtnQkFDM0Isc0RBQXNEO2dCQUN0RCwyQkFBMkI7Z0JBQzNCLGtDQUFrQztnQkFDbEMseUJBQXlCO2dCQUN6Qix1Q0FBdUM7Z0JBQ3ZDLHVCQUF1QjtnQkFDdkIseUZBQXlGO2dCQUN6RixZQUFZO2dCQUNaLFNBQVM7Z0JBQ1QsS0FBSztZQUNULENBQUM7OztpQ0FHWSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OzBCQUVDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7Ozs7YUFPdkQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=
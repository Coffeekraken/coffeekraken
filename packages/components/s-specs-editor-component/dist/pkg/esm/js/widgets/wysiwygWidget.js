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
        return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQ0FBa0M7SUFVbkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFrQjtnQkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2FBQ3pCLENBQUM7U0FDTDtRQUVELE9BQU8sSUFBSSxDQUFBOzt5QkFFTSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7b0NBQ2pDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFeEIsd0RBQXdEO1lBQ3hELDJEQUEyRDtZQUMzRCx5Q0FBeUM7WUFDekMsd0NBQXdDO1lBQ3hDLDBCQUEwQjtZQUMxQiwyQkFBMkI7WUFDM0Isc0RBQXNEO1lBQ3RELDJCQUEyQjtZQUMzQixrQ0FBa0M7WUFDbEMseUJBQXlCO1lBQ3pCLHVDQUF1QztZQUN2Qyx1QkFBdUI7WUFDdkIseUZBQXlGO1lBQ3pGLFlBQVk7WUFDWixTQUFTO1lBQ1QsS0FBSztRQUNULENBQUM7Ozs2QkFHWSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7O3NCQUVDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7Ozs7U0FPdkQsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
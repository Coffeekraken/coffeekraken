import { html } from 'lit';
import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';
__SSpacesSelectorComponentDefine();
export default class SSpecsEditorComponentSpacesWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        const spaces = {
            padding: [],
            margin: [],
        };
        propObj.props.paddingTop.options.forEach((option) => {
            spaces.padding.push(Object.assign(Object.assign({}, option), { default: option.value == propObj.props.paddingTop.default }));
        });
        propObj.props.marginTop.options.forEach((option) => {
            spaces.margin.push(Object.assign(Object.assign({}, option), { default: option.value == propObj.props.marginTop.default }));
        });
        return html `
            <div
                class="${this._component.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
            const setPath = `${path.join('.')}`;
            this._component.setValue(setPath, e.detail);
            this._component.apply();
        }}
            >
                <s-spaces-selector
                    .spaces=${spaces}
                    .values=${Object.assign({}, values !== null && values !== void 0 ? values : {})}
                ></s-spaces-selector>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXZHLGdDQUFnQyxFQUFFLENBQUM7QUFFbkMsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBaUM7SUFLbEQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixNQUFNLE1BQU0sR0FBRztZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxpQ0FDWixNQUFNLEtBQ1QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUMzRCxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUNYLE1BQU0sS0FDVCxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQzFELENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFBOzt5QkFFTSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7NENBQ3hCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7Ozs4QkFHYSxNQUFNOzhCQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQzs7O1NBR3BELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
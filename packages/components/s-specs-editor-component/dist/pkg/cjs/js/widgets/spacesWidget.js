"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_spaces_selector_component_1 = require("@coffeekraken/s-spaces-selector-component");
(0, s_spaces_selector_component_1.define)();
class SSpecsEditorComponentSpacesWidget {
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
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
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
            `,
        };
    }
}
exports.default = SSpecsEditorComponentSpacesWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLDJGQUF1RztBQUV2RyxJQUFBLG9DQUFnQyxHQUFFLENBQUM7QUFFbkMsTUFBcUIsaUNBQWlDO0lBT2xELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsTUFBTSxNQUFNLEdBQUc7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLE1BQU0sRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUVGLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksaUNBQ1osTUFBTSxLQUNULE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFDM0QsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQ0FDWCxNQUFNLEtBQ1QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUMxRCxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7OzZCQUVPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztnREFDeEIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsQ0FBQzs7O2tDQUdhLE1BQU07a0NBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDOzs7YUFHcEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeERELG9EQXdEQyJ9
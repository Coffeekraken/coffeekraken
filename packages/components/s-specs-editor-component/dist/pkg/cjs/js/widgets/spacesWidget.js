"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_spaces_selector_component_1 = require("@coffeekraken/s-spaces-selector-component");
(0, s_spaces_selector_component_1.define)();
function default_1(component) {
    let error, warning;
    return {
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
                error,
                warning,
                html: (0, lit_1.html) `
                    <div
                        class="${component.utils.cls('_spaces-widget')}"
                        @s-spaces-selector.change=${(e) => {
                    const setPath = `${path.join('.')}`;
                    component.setValue(setPath, e.detail);
                    component.apply();
                }}
                    >
                        <s-spaces-selector
                            .spaces=${spaces}
                            .values=${Object.assign({}, values !== null && values !== void 0 ? values : {})}
                        ></s-spaces-selector>
                    </div>
                `,
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLDJGQUF1RztBQUV2RyxJQUFBLG9DQUFnQyxHQUFFLENBQUM7QUFFbkMsbUJBQXlCLFNBQVM7SUFDOUIsSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDO0lBRW5CLE9BQU87UUFDSCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUM1QixNQUFNLE1BQU0sR0FBRztnQkFDWCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxNQUFNLEVBQUUsRUFBRTthQUNiLENBQUM7WUFFRixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxpQ0FDWixNQUFNLEtBQ1QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUMzRCxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQ0FDWCxNQUFNLEtBQ1QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUMxRCxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7O2lDQUVPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO29EQUNsQixDQUFDLENBQUMsRUFBRSxFQUFFO29CQUM5QixNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDcEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0QyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7OztzQ0FHYSxNQUFNO3NDQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQzs7O2lCQUdwRDthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE1Q0QsNEJBNENDIn0=
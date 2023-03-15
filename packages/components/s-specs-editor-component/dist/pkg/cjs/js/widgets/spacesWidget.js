"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_spaces_selector_component_1 = require("@coffeekraken/s-spaces-selector-component");
(0, s_spaces_selector_component_1.define)();
function default_1(component) {
    return {
        hideOriginals: true,
        html({ propObj, values, path }) {
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
            console.log('SPA', spaces);
            return (0, lit_1.html) `
                <div
                    class="${component.utils.cls('_spaces')}"
                    @s-spaces-selector.change=${(e) => {
                var _a;
                Object.keys((_a = e.detail) !== null && _a !== void 0 ? _a : {}).forEach((key) => {
                    const value = e.detail[key];
                    const setPath = `${path.join('.')}.props.${key}`;
                    component.setValue(setPath, value);
                });
                component.apply();
            }}
                >
                    <s-spaces-selector
                        .spaces=${spaces}
                        .values=${Object.assign({}, values !== null && values !== void 0 ? values : {})}
                    ></s-spaces-selector>
                </div>
            `;
        },
        events: {},
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLDJGQUF1RztBQUV2RyxJQUFBLG9DQUFnQyxHQUFFLENBQUM7QUFFbkMsbUJBQXlCLFNBQVM7SUFDOUIsT0FBTztRQUNILGFBQWEsRUFBRSxJQUFJO1FBQ25CLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQzFCLE1BQU0sTUFBTSxHQUFHO2dCQUNYLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE1BQU0sRUFBRSxFQUFFO2FBQ2IsQ0FBQztZQUVGLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGlDQUNaLE1BQU0sS0FDVCxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQzNELENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUNYLE1BQU0sS0FDVCxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQzFELENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTNCLE9BQU8sSUFBQSxVQUFJLEVBQUE7OzZCQUVNLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztnREFDWCxDQUFDLENBQUMsRUFBRSxFQUFFOztnQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLENBQUMsQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUN4QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7b0JBQ2pELFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQzs7O2tDQUdhLE1BQU07a0NBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDOzs7YUFHcEQsQ0FBQztRQUNOLENBQUM7UUFDRCxNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUM7QUFDTixDQUFDO0FBN0NELDRCQTZDQyJ9
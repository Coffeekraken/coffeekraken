"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("@coffeekraken/sugar/class");
exports.default = {
    id: 'mitosisWebcomponent',
    test(component) {
        let isHtmlElement = false;
        try {
            const extendsStack = (0, class_1.__getExtendsStack)(component.default);
            isHtmlElement = Object.keys(extendsStack).includes('HTMLElement');
        }
        catch (e) {
            return false;
        }
        return component.define && isHtmlElement;
    },
    create(component, html, settings) {
        var _a;
        const $root = (_a = settings.$root) !== null && _a !== void 0 ? _a : document.body;
        component.define();
        $root.innerHTML = html;
        const $component = $root.children[0];
        return $component;
    },
    setProps($component, props) {
        for (let [prop, value] of Object.entries(props !== null && props !== void 0 ? props : {})) {
            if (value === undefined) {
                continue;
            }
            // @ts-ignore
            $component.props[prop] = value;
        }
        // @ts-ignore
        $component.update();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQThEO0FBRzlELGtCQUFlO0lBQ1gsRUFBRSxFQUFFLHFCQUFxQjtJQUN6QixJQUFJLENBQUMsU0FBYztRQUNmLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJO1lBQ0EsTUFBTSxZQUFZLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUQsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3JFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sU0FBUyxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUNELE1BQU0sQ0FDRixTQUFjLEVBQ2QsSUFBWSxFQUNaLFFBQWlEOztRQUVqRCxNQUFNLEtBQUssR0FBRyxNQUFBLFFBQVEsQ0FBQyxLQUFLLG1DQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUNELFFBQVEsQ0FBQyxVQUF1QixFQUFFLEtBQVU7UUFDeEMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxDQUFDLEVBQUU7WUFDbkQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUNyQixTQUFTO2FBQ1o7WUFDRCxhQUFhO1lBQ2IsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbEM7UUFDRCxhQUFhO1FBQ2IsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDSixDQUFDIn0=
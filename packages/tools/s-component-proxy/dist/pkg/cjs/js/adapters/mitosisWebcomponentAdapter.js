"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("@coffeekraken/sugar/class");
exports.default = {
    id: 'mitosisWebcomponent',
    test(component) {
        var _a;
        if (((_a = component.metas) === null || _a === void 0 ? void 0 : _a.type) == 'webcomponent') {
            return true;
        }
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
    create(component, settings) {
        var _a, _b, _c, _d;
        const $root = (_a = settings.$root) !== null && _a !== void 0 ? _a : document.body;
        (_b = component.define) === null || _b === void 0 ? void 0 : _b.call(component);
        $root.innerHTML = (_d = (_c = component.metas) === null || _c === void 0 ? void 0 : _c.preview) !== null && _d !== void 0 ? _d : settings.html;
        const $component = $root.children[0];
        component.$element = $component;
    },
    setProps(component, props) {
        for (let [prop, value] of Object.entries(props !== null && props !== void 0 ? props : {})) {
            if (value === undefined) {
                continue;
            }
            // @ts-ignore
            component.$element.props[prop] = value;
        }
        // @ts-ignore
        component.$element.update();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQThEO0FBTTlELGtCQUFlO0lBQ1gsRUFBRSxFQUFFLHFCQUFxQjtJQUN6QixJQUFJLENBQUMsU0FBb0M7O1FBQ3JDLElBQUksQ0FBQSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLElBQUksS0FBSSxjQUFjLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJO1lBQ0EsTUFBTSxZQUFZLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUQsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3JFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sU0FBUyxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUNELE1BQU0sQ0FDRixTQUFvQyxFQUNwQyxRQUFpRDs7UUFFakQsTUFBTSxLQUFLLEdBQUcsTUFBQSxRQUFRLENBQUMsS0FBSyxtQ0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlDLE1BQUEsU0FBUyxDQUFDLE1BQU0seURBQUksQ0FBQztRQUNyQixLQUFLLENBQUMsU0FBUyxHQUFHLE1BQVEsTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxPQUFPLG1DQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDcEUsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsUUFBUSxDQUFDLFNBQW9DLEVBQUUsS0FBVTtRQUNyRCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsRUFBRTtZQUNuRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3JCLFNBQVM7YUFDWjtZQUNELGFBQWE7WUFDYixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUM7UUFDRCxhQUFhO1FBQ2IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0osQ0FBQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
exports.default = {
    id: 'react',
    test(component) {
        var _a;
        return ((0, react_1.isValidElement)(component.default) ||
            ((_a = component.metas) === null || _a === void 0 ? void 0 : _a.type) === 'react');
    },
    create(component, settings) {
        console.log('create', component);
        const root = (0, client_1.createRoot)(settings.$root);
        root.render((0, react_1.createElement)(component.default, {}, null));
        // const $root = settings.$root ?? document.body;
        // component.define();
        // $root.innerHTML = html;
        // const $component = $root.children[0];
        // return $component;
    },
    setProps($component, props) {
        // for (let [prop, value] of Object.entries(props ?? {})) {
        //     if (value === undefined) {
        //         continue;
        //     }
        //     // @ts-ignore
        //     $component.props[prop] = value;
        // }
        // // @ts-ignore
        // $component.update();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQXNEO0FBQ3RELDZDQUE4QztBQUU5QyxrQkFBZTtJQUNYLEVBQUUsRUFBRSxPQUFPO0lBQ1gsSUFBSSxDQUFDLFNBQWM7O1FBQ2YsT0FBTyxDQUNILElBQUEsc0JBQWMsRUFBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2pDLENBQUEsTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxJQUFJLE1BQUssT0FBTyxDQUNwQyxDQUFDO0lBQ04sQ0FBQztJQUNELE1BQU0sQ0FDRixTQUFjLEVBQ2QsUUFBaUQ7UUFFakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFakMsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBVSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUEscUJBQWEsRUFBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELGlEQUFpRDtRQUNqRCxzQkFBc0I7UUFDdEIsMEJBQTBCO1FBQzFCLHdDQUF3QztRQUN4QyxxQkFBcUI7SUFDekIsQ0FBQztJQUNELFFBQVEsQ0FBQyxVQUF1QixFQUFFLEtBQVU7UUFDeEMsMkRBQTJEO1FBQzNELGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixzQ0FBc0M7UUFDdEMsSUFBSTtRQUNKLGdCQUFnQjtRQUNoQix1QkFBdUI7SUFDM0IsQ0FBQztDQUNKLENBQUMifQ==
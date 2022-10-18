import React from 'react';
import { createRoot } from 'react-dom/client';
export default {
    id: 'react',
    test(component) {
        var _a;
        return ((_a = component.metas) === null || _a === void 0 ? void 0 : _a.type) === 'react';
    },
    create(component, settings) {
        console.log('create', component);
        const root = createRoot(settings.$root);
        root.render(React.createElement(component.default, {}, null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFOUMsZUFBZTtJQUNYLEVBQUUsRUFBRSxPQUFPO0lBQ1gsSUFBSSxDQUFDLFNBQWM7O1FBQ2YsT0FBTyxDQUFBLE1BQUEsU0FBUyxDQUFDLEtBQUssMENBQUUsSUFBSSxNQUFLLE9BQU8sQ0FBQztJQUM3QyxDQUFDO0lBQ0QsTUFBTSxDQUNGLFNBQWMsRUFDZCxRQUFpRDtRQUVqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVqQyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlELGlEQUFpRDtRQUNqRCxzQkFBc0I7UUFDdEIsMEJBQTBCO1FBQzFCLHdDQUF3QztRQUN4QyxxQkFBcUI7SUFDekIsQ0FBQztJQUNELFFBQVEsQ0FBQyxVQUF1QixFQUFFLEtBQVU7UUFDeEMsMkRBQTJEO1FBQzNELGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixzQ0FBc0M7UUFDdEMsSUFBSTtRQUNKLGdCQUFnQjtRQUNoQix1QkFBdUI7SUFDM0IsQ0FBQztDQUNKLENBQUMifQ==
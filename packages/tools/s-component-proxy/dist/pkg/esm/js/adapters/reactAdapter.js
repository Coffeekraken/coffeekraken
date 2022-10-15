import { createElement, isValidElement } from 'react';
import { createRoot } from 'react-dom/client';
export default {
    id: 'react',
    test(component) {
        var _a;
        return (isValidElement(component.default) ||
            ((_a = component.metas) === null || _a === void 0 ? void 0 : _a.type) === 'react');
    },
    create(component, settings) {
        console.log('create', component);
        const root = createRoot(settings.$root);
        root.render(createElement(component.default, {}, null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QyxlQUFlO0lBQ1gsRUFBRSxFQUFFLE9BQU87SUFDWCxJQUFJLENBQUMsU0FBYzs7UUFDZixPQUFPLENBQ0gsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDakMsQ0FBQSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLElBQUksTUFBSyxPQUFPLENBQ3BDLENBQUM7SUFDTixDQUFDO0lBQ0QsTUFBTSxDQUNGLFNBQWMsRUFDZCxRQUFpRDtRQUVqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVqQyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEQsaURBQWlEO1FBQ2pELHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFDMUIsd0NBQXdDO1FBQ3hDLHFCQUFxQjtJQUN6QixDQUFDO0lBQ0QsUUFBUSxDQUFDLFVBQXVCLEVBQUUsS0FBVTtRQUN4QywyREFBMkQ7UUFDM0QsaUNBQWlDO1FBQ2pDLG9CQUFvQjtRQUNwQixRQUFRO1FBQ1Isb0JBQW9CO1FBQ3BCLHNDQUFzQztRQUN0QyxJQUFJO1FBQ0osZ0JBQWdCO1FBQ2hCLHVCQUF1QjtJQUMzQixDQUFDO0NBQ0osQ0FBQyJ9
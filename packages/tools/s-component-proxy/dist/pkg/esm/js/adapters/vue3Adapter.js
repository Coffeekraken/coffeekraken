var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createApp } from 'vue';
export default {
    id: 'vue3',
    test(component) {
        var _a, _b;
        if (((_a = component.path) === null || _a === void 0 ? void 0 : _a.match(/\.vue$/)) ||
            ((_b = component.metas) === null || _b === void 0 ? void 0 : _b.type) === 'vue3' ||
            component.target === 'vue3') {
            return true;
        }
        return false;
    },
    load(component) {
        return __awaiter(this, void 0, void 0, function* () {
            const imported = yield import(component.path);
            component.default = imported.default;
            return imported;
            // return new Promise((resolve, reject) => {
            //     component.default = defineAsyncComponent(
            //         () => import(component.path),
            //     );
            //     resolve(component.default);
            // });
        });
    },
    create(component, settings) {
        var _a;
        console.log('create', component);
        const app = createApp({});
        app.component(component.tagName, component.default);
        const $root = (_a = settings.$root) !== null && _a !== void 0 ? _a : document.body;
        // // $root.innerHTML = component.specs?.preview;
        app.mount($root);
        // const app = createApp(component.default);
        // const $component = $root.children[0];
        // component.$element = $component;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFPaEMsZUFBZTtJQUNYLEVBQUUsRUFBRSxNQUFNO0lBQ1YsSUFBSSxDQUFDLFNBQW9DOztRQUNyQyxJQUNJLENBQUEsTUFBQSxTQUFTLENBQUMsSUFBSSwwQ0FBRSxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQy9CLENBQUEsTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxJQUFJLE1BQUssTUFBTTtZQUNoQyxTQUFTLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFDN0I7WUFDRSxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNLLElBQUksQ0FBQyxTQUFvQzs7WUFDM0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNyQyxPQUFPLFFBQVEsQ0FBQztZQUVoQiw0Q0FBNEM7WUFDNUMsZ0RBQWdEO1lBQ2hELHdDQUF3QztZQUN4QyxTQUFTO1lBQ1Qsa0NBQWtDO1lBQ2xDLE1BQU07UUFDVixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQ0YsU0FBb0MsRUFDcEMsUUFBaUQ7O1FBRWpELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELE1BQU0sS0FBSyxHQUFHLE1BQUEsUUFBUSxDQUFDLEtBQUssbUNBQUksUUFBUSxDQUFDLElBQUksQ0FBQztRQUM5QyxpREFBaUQ7UUFDakQsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQiw0Q0FBNEM7UUFDNUMsd0NBQXdDO1FBQ3hDLG1DQUFtQztJQUN2QyxDQUFDO0lBQ0QsUUFBUSxDQUFDLFNBQW9DLEVBQUUsS0FBVTtRQUNyRCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsRUFBRTtZQUNuRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3JCLFNBQVM7YUFDWjtZQUNELGFBQWE7WUFDYixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUM7UUFDRCxhQUFhO1FBQ2IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0osQ0FBQyJ9
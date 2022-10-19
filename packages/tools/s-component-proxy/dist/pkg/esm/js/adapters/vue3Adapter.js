var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createApp } from 'vue/dist/vue.esm-bundler';
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
            console.log('imported', imported);
            // imported.name = 'SSlider';
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
        const app = createApp({
            data() {
                return {};
            },
            template: component.specs.preview,
        });
        app.component('SSlider', component.default);
        const $root = (_a = settings.$root) !== null && _a !== void 0 ? _a : document.body;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVFyRCxlQUFlO0lBQ1gsRUFBRSxFQUFFLE1BQU07SUFDVixJQUFJLENBQUMsU0FBb0M7O1FBQ3JDLElBQ0ksQ0FBQSxNQUFBLFNBQVMsQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDL0IsQ0FBQSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLElBQUksTUFBSyxNQUFNO1lBQ2hDLFNBQVMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUM3QjtZQUNFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0ssSUFBSSxDQUFDLFNBQW9DOztZQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEMsNkJBQTZCO1lBQzdCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNyQyxPQUFPLFFBQVEsQ0FBQztZQUVoQiw0Q0FBNEM7WUFDNUMsZ0RBQWdEO1lBQ2hELHdDQUF3QztZQUN4QyxTQUFTO1lBQ1Qsa0NBQWtDO1lBQ2xDLE1BQU07UUFDVixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQ0YsU0FBb0MsRUFDcEMsUUFBaUQ7O1FBRWpELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNsQixJQUFJO2dCQUNBLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUNELFFBQVEsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU87U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sS0FBSyxHQUFHLE1BQUEsUUFBUSxDQUFDLEtBQUssbUNBQUksUUFBUSxDQUFDLElBQUksQ0FBQztRQUM5QyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpCLDRDQUE0QztRQUM1Qyx3Q0FBd0M7UUFDeEMsbUNBQW1DO0lBQ3ZDLENBQUM7SUFDRCxRQUFRLENBQUMsU0FBb0MsRUFBRSxLQUFVO1FBQ3JELEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ25ELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsU0FBUzthQUNaO1lBQ0QsYUFBYTtZQUNiLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMxQztRQUNELGFBQWE7UUFDYixTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFDIn0=
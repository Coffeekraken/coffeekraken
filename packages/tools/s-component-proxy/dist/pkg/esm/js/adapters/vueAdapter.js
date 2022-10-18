var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { createApp } from 'vue';
export default {
    id: 'vue3',
    test(component) {
        var _a, _b;
        if ((_a = component.path) === null || _a === void 0 ? void 0 : _a.match(/\.vue$/)) {
            return true;
        }
        if (((_b = component.metas) === null || _b === void 0 ? void 0 : _b.type) === 'vue') {
            return true;
        }
        return false;
    },
    load(component) {
        return __awaiter(this, void 0, void 0, function* () {
            // const Comp = defineAsyncComponent(() => {
            //     import(component.path);
            // });
            // return Comp;
        });
    },
    create(component, settings) {
        var _a;
        console.log('create', component);
        const $root = (_a = settings.$root) !== null && _a !== void 0 ? _a : document.body;
        const app = createApp(component.default);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLG1DQUFtQztBQUVuQyxlQUFlO0lBQ1gsRUFBRSxFQUFFLE1BQU07SUFDVixJQUFJLENBQUMsU0FBb0M7O1FBQ3JDLElBQUksTUFBQSxTQUFTLENBQUMsSUFBSSwwQ0FBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLElBQUksTUFBSyxLQUFLLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDSyxJQUFJLENBQUMsU0FBb0M7O1lBQzNDLDRDQUE0QztZQUM1Qyw4QkFBOEI7WUFDOUIsTUFBTTtZQUNOLGVBQWU7UUFDbkIsQ0FBQztLQUFBO0lBQ0QsTUFBTSxDQUNGLFNBQW9DLEVBQ3BDLFFBQWlEOztRQUVqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxNQUFBLFFBQVEsQ0FBQyxLQUFLLG1DQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFDRCxRQUFRLENBQUMsU0FBb0MsRUFBRSxLQUFVO1FBQ3JELEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ25ELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsU0FBUzthQUNaO1lBQ0QsYUFBYTtZQUNiLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMxQztRQUNELGFBQWE7UUFDYixTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFDIn0=
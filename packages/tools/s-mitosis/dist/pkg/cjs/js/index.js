"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const s_component_proxy_1 = __importDefault(require("@coffeekraken/s-component-proxy"));
const webcomponent_1 = require("@coffeekraken/s-specs-editor-component/webcomponent");
const dom_1 = require("@coffeekraken/sugar/dom");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    (0, s_activate_feature_1.define)();
    // components
    setTimeout(() => {
        (0, webcomponent_1.define)();
    }, 1000);
    (0, dom_1.__querySelectorLive)('[component]', ($app) => __awaiter(void 0, void 0, void 0, function* () {
        const component = JSON.parse($app.getAttribute('component'));
        const componentProxy = new s_component_proxy_1.default(component);
        // const componentImport = await componentProxy.load();
        if (component.target !== 'vue') {
            return;
        }
        const componentImport = yield componentProxy.load();
        // $componentContainer = document.querySelector(
        //     `#component-${component.target}`,
        // );
        console.log('create', component);
        // const app = createApp({
        //     data() {
        //         return {};
        //     },
        //     template: component.specs.preview,
        //     // render() {
        //     //     return `
        //     //         <div v-html=>Hello !!!</div>
        //     //     `;
        //     // },
        // });
        // const $root = $app ?? document.body;
        // app.component('s-slider', componentImport.default);
        // app.mount($root);
        componentProxy.create({
            $root: $app,
        });
        // $componentContainer?.addEventListener('s-specs-editor.change', (e) => {
        //     componentProxy.setProps(e.detail);
        // });
    }));
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQWdGO0FBQ2hGLHdGQUFnRTtBQUNoRSxzRkFBNkc7QUFDN0csaURBQThEO0FBRTlELENBQUMsR0FBUyxFQUFFO0lBQ1IsV0FBVztJQUNYLElBQUEsMkJBQWtCLEdBQUUsQ0FBQztJQUVyQixhQUFhO0lBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNaLElBQUEscUJBQTRCLEdBQUUsQ0FBQztJQUNuQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFVCxJQUFBLHlCQUFtQixFQUFDLGFBQWEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQzlDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzdELE1BQU0sY0FBYyxHQUFHLElBQUksMkJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsdURBQXVEO1FBRXZELElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTztTQUNWO1FBRUQsTUFBTSxlQUFlLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFcEQsZ0RBQWdEO1FBQ2hELHdDQUF3QztRQUN4QyxLQUFLO1FBRUwsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFakMsMEJBQTBCO1FBQzFCLGVBQWU7UUFDZixxQkFBcUI7UUFDckIsU0FBUztRQUNULHlDQUF5QztRQUN6QyxvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLDhDQUE4QztRQUM5QyxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLE1BQU07UUFDTix1Q0FBdUM7UUFDdkMsc0RBQXNEO1FBQ3RELG9CQUFvQjtRQUVwQixjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ2xCLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsMEVBQTBFO1FBQzFFLHlDQUF5QztRQUN6QyxNQUFNO0lBQ1YsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9
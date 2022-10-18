var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import __SComponentProxy from '@coffeekraken/s-component-proxy';
import { define as _sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component/webcomponent';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    __sActivateFeature();
    // components
    setTimeout(() => {
        _sSpecsEditorComponentDefine();
    }, 1000);
    __querySelectorLive('[component]', ($app) => __awaiter(void 0, void 0, void 0, function* () {
        const component = JSON.parse($app.getAttribute('component'));
        const componentProxy = new __SComponentProxy(component);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLElBQUksNEJBQTRCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxDQUFDLEdBQVMsRUFBRTtJQUNSLFdBQVc7SUFDWCxrQkFBa0IsRUFBRSxDQUFDO0lBRXJCLGFBQWE7SUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osNEJBQTRCLEVBQUUsQ0FBQztJQUNuQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFVCxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM3RCxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELHVEQUF1RDtRQUV2RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQzVCLE9BQU87U0FDVjtRQUVELE1BQU0sZUFBZSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBELGdEQUFnRDtRQUNoRCx3Q0FBd0M7UUFDeEMsS0FBSztRQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLDBCQUEwQjtRQUMxQixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLFNBQVM7UUFDVCx5Q0FBeUM7UUFDekMsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0Qiw4Q0FBOEM7UUFDOUMsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixNQUFNO1FBQ04sdUNBQXVDO1FBQ3ZDLHNEQUFzRDtRQUN0RCxvQkFBb0I7UUFFcEIsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUNsQixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUNILDBFQUEwRTtRQUMxRSx5Q0FBeUM7UUFDekMsTUFBTTtJQUNWLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==
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
        const component = JSON.parse($app.getAttribute('component')), componentImport = yield import(component.path), componentProxy = new __SComponentProxy(componentImport), $componentContainer = document.querySelector(`#component-${component.target}`);
        componentProxy.create(componentImport.metas.preview, {
            $root: $app,
        });
        $componentContainer === null || $componentContainer === void 0 ? void 0 : $componentContainer.addEventListener('s-specs-editor.change', (e) => {
            componentProxy.setProps(e.detail);
        });
    }));
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLElBQUksNEJBQTRCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxDQUFDLEdBQVMsRUFBRTtJQUNSLFdBQVc7SUFDWCxrQkFBa0IsRUFBRSxDQUFDO0lBRXJCLGFBQWE7SUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osNEJBQTRCLEVBQUUsQ0FBQztJQUNuQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFVCxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsRUFDeEQsZUFBZSxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFDOUMsY0FBYyxHQUFHLElBQUksaUJBQWlCLENBQUMsZUFBZSxDQUFDLEVBQ3ZELG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3hDLGNBQWMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUNuQyxDQUFDO1FBRU4sY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNqRCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUNILG1CQUFtQixhQUFuQixtQkFBbUIsdUJBQW5CLG1CQUFtQixDQUFFLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakUsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=
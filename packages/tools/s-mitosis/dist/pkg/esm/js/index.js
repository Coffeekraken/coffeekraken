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
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    __sActivateFeature();
    __querySelectorLive('[component]', ($app) => __awaiter(void 0, void 0, void 0, function* () {
        const component = JSON.parse($app.getAttribute('component'));
        console.log(component);
        const componentImport = yield import(component.path);
        switch (component.target) {
            case 'webcomponent':
                componentImport.define();
                $app.innerHTML = componentImport.preview;
                break;
        }
    }));
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxDQUFDLEdBQVMsRUFBRTtJQUNSLFdBQVc7SUFDWCxrQkFBa0IsRUFBRSxDQUFDO0lBRXJCLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQzlDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkIsTUFBTSxlQUFlLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELFFBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QixLQUFLLGNBQWM7Z0JBQ2YsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pDLE1BQU07U0FDYjtJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==
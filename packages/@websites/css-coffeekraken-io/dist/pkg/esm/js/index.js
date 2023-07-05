var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// generic
import __SDashboard from '@coffeekraken/s-dashboard';
import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
// website related
import __WelcomeSlider from './classes/WelcomeSlider';
import { __define as __CKMenuDefine } from './components/CKMenu';
// components
import { __define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { __define as __SDocComponentDefine } from '@coffeekraken/s-doc';
// features
import __SFeature from '@coffeekraken/s-feature';
import { __define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __smoothScroll } from '@coffeekraken/sugar/feature';
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps(['s-code-example'], {
        scrollToSettings: {
            offset: 100,
        },
        responsive: {
            mobile: {
                lines: 5,
            },
        },
    });
    __SFront.init();
    // essentials
    __SPackEssentials();
    // features
    __smoothScroll();
    // components
    __CKMenuDefine();
    __SHotkeysListComponentDefine();
    __SCodeExampleComponentDefine();
    __SDocComponentDefine({
        mountWhen: 'direct',
        endpoints: {
            base: `${document.location.protocol}//${document.location.hostname}:9191/api/doc`,
        },
        icons: {
            file: '<i class="s-icon:file"></i>',
            search: '<i class="s-icon:search"></i>',
            enterFullscreen: '<i class="s-icon:enter-fullscreen"></i>',
            exitFullscreen: '<i class="s-icon:exit-fullscreen"></i>',
        },
    });
    // Website specific
    const $slider = document.querySelector('[welcome-slider]');
    $slider && new __WelcomeSlider($slider);
    // dashboard
    new __SDashboard();
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFVBQVU7QUFDVixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBRWhFLGtCQUFrQjtBQUNsQixPQUFPLGVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxJQUFJLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpFLGFBQWE7QUFDYixPQUFPLEVBQUUsUUFBUSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbkcsT0FBTyxFQUFFLFFBQVEsSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhFLFdBQVc7QUFDWCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbkcsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxDQUFDLEdBQVMsRUFBRTtJQUNSLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQzVCLFNBQVMsRUFBRSxjQUFjO0tBQzVCLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQ2pDLFNBQVMsRUFBRSxjQUFjO0tBQzVCLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2hELGdCQUFnQixFQUFFO1lBQ2QsTUFBTSxFQUFFLEdBQUc7U0FDZDtRQUNELFVBQVUsRUFBRTtZQUNSLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQzthQUNYO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEIsYUFBYTtJQUNiLGlCQUFpQixFQUFFLENBQUM7SUFFcEIsV0FBVztJQUNYLGNBQWMsRUFBRSxDQUFDO0lBRWpCLGFBQWE7SUFDYixjQUFjLEVBQUUsQ0FBQztJQUNqQiw2QkFBNkIsRUFBRSxDQUFDO0lBQ2hDLDZCQUE2QixFQUFFLENBQUM7SUFDaEMscUJBQXFCLENBQUM7UUFDbEIsU0FBUyxFQUFFLFFBQVE7UUFDbkIsU0FBUyxFQUFFO1lBQ1AsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLGVBQWU7U0FDcEY7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLE1BQU0sRUFBRSwrQkFBK0I7WUFDdkMsZUFBZSxFQUFFLHlDQUF5QztZQUMxRCxjQUFjLEVBQUUsd0NBQXdDO1NBQzNEO0tBQ0osQ0FBQyxDQUFDO0lBRUgsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFeEMsWUFBWTtJQUNaLElBQUksWUFBWSxFQUFFLENBQUM7QUFDdkIsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=
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
import __STheme from '@coffeekraken/s-theme';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
// website related
import __WelcomeSlider from './classes/WelcomeSlider.js';
import { define as __CKMenuDefine } from './components/CKMenu.js';
// components
import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';
// features
import __SFeature from '@coffeekraken/s-feature';
import { define as __SHighlightFeatureDefine } from '@coffeekraken/s-highlight-feature';
import { define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SParallaxFeatureDefine } from '@coffeekraken/s-parallax-feature';
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
        responsive: {
            mobile: {
                lines: 5,
            },
        },
    });
    __SFront.init();
    __STheme.init();
    // essentials
    __SPackEssentials();
    // features
    __smoothScroll();
    __SHighlightFeatureDefine();
    __SParallaxFeatureDefine();
    // components
    __CKMenuDefine();
    __SHotkeysListComponentDefine();
    __SCodeExampleComponentDefine();
    __SGaugeComponentDefine();
    __SDocComponentDefine({
        mountWhen: 'direct',
        endpoints: {
            base: document.location.origin.includes(':5173')
                ? 'http://localhost:9191/api/doc'
                : '/api/doc',
        },
        icons: {
            file: '<i class="s-icon:file"></i>',
            search: '<i class="s-icon:search"></i>',
            enterFullscreen: '<i class="s-icon:enter-fullscreen"></i>',
            exitFullscreen: '<i class="s-icon:exit-fullscreen"></i>',
            menu: '<i class="s-icon:documentation"></i>',
        },
    });
    // Website specific
    const $slider = document.querySelector('[welcome-slider]');
    $slider && new __WelcomeSlider($slider);
    // dashboard
    new __SDashboard();
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFVBQVU7QUFDVixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBRWhFLGtCQUFrQjtBQUNsQixPQUFPLGVBQWUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWxFLGFBQWE7QUFDYixPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRixXQUFXO0FBQ1gsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxDQUFDLEdBQVMsRUFBRTtJQUNSLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQzVCLFNBQVMsRUFBRSxjQUFjO0tBQzVCLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQ2pDLFNBQVMsRUFBRSxjQUFjO0tBQzVCLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2hELFVBQVUsRUFBRTtZQUNSLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQzthQUNYO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhCLGFBQWE7SUFDYixpQkFBaUIsRUFBRSxDQUFDO0lBRXBCLFdBQVc7SUFDWCxjQUFjLEVBQUUsQ0FBQztJQUNqQix5QkFBeUIsRUFBRSxDQUFDO0lBQzVCLHdCQUF3QixFQUFFLENBQUM7SUFFM0IsYUFBYTtJQUNiLGNBQWMsRUFBRSxDQUFDO0lBQ2pCLDZCQUE2QixFQUFFLENBQUM7SUFDaEMsNkJBQTZCLEVBQUUsQ0FBQztJQUNoQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzFCLHFCQUFxQixDQUFDO1FBQ2xCLFNBQVMsRUFBRSxRQUFRO1FBQ25CLFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsK0JBQStCO2dCQUNqQyxDQUFDLENBQUMsVUFBVTtTQUNuQjtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSw2QkFBNkI7WUFDbkMsTUFBTSxFQUFFLCtCQUErQjtZQUN2QyxlQUFlLEVBQUUseUNBQXlDO1lBQzFELGNBQWMsRUFBRSx3Q0FBd0M7WUFDeEQsSUFBSSxFQUFFLHNDQUFzQztTQUMvQztLQUNKLENBQUMsQ0FBQztJQUVILG1CQUFtQjtJQUNuQixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDM0QsT0FBTyxJQUFJLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhDLFlBQVk7SUFDWixJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9
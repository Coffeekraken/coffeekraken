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
import __WelcomeSlider from './classes/WelcomeSlider.js';
import { define as __CKMenuDefine } from './components/CKMenu.js';
// components
import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';
// features
import __SFeature from '@coffeekraken/s-feature';
import { define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
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
    __SGaugeComponentDefine();
    __SDocComponentDefine({
        mountWhen: 'direct',
        endpoints: {
            base: document.location.hostname !== 'postcss.coffeekraken.io'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFVBQVU7QUFDVixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBRWhFLGtCQUFrQjtBQUNsQixPQUFPLGVBQWUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWxFLGFBQWE7QUFDYixPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRixXQUFXO0FBQ1gsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pHLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsQ0FBQyxHQUFTLEVBQUU7SUFDUixVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUM1QixTQUFTLEVBQUUsY0FBYztLQUM1QixDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUNqQyxTQUFTLEVBQUUsY0FBYztLQUM1QixDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNoRCxVQUFVLEVBQUU7WUFDUixNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLENBQUM7YUFDWDtTQUNKO0tBQ0osQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhCLGFBQWE7SUFDYixpQkFBaUIsRUFBRSxDQUFDO0lBRXBCLFdBQVc7SUFDWCxjQUFjLEVBQUUsQ0FBQztJQUVqQixhQUFhO0lBQ2IsY0FBYyxFQUFFLENBQUM7SUFDakIsNkJBQTZCLEVBQUUsQ0FBQztJQUNoQyw2QkFBNkIsRUFBRSxDQUFDO0lBQ2hDLHVCQUF1QixFQUFFLENBQUM7SUFDMUIscUJBQXFCLENBQUM7UUFDbEIsU0FBUyxFQUFFLFFBQVE7UUFDbkIsU0FBUyxFQUFFO1lBQ1AsSUFBSSxFQUNBLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLHlCQUF5QjtnQkFDcEQsQ0FBQyxDQUFDLCtCQUErQjtnQkFDakMsQ0FBQyxDQUFDLFVBQVU7U0FDdkI7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLE1BQU0sRUFBRSwrQkFBK0I7WUFDdkMsZUFBZSxFQUFFLHlDQUF5QztZQUMxRCxjQUFjLEVBQUUsd0NBQXdDO1lBQ3hELElBQUksRUFBRSxzQ0FBc0M7U0FDL0M7S0FDSixDQUFDLENBQUM7SUFFSCxtQkFBbUI7SUFDbkIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzNELE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV4QyxZQUFZO0lBQ1osSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==
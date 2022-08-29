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
// import { define as __sAppearFeature } from "@coffeekraken/s-appear-feature";
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import __SFeature from '@coffeekraken/s-feature';
import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { define as __SSliderComponent, SSliderSlideableBehavior, } from '@coffeekraken/s-slider-component';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
// Components
// import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
import { define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav';
import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
import { define as __CKRatingsComponent } from './components/CKRating';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __SEnv from '@coffeekraken/s-env';
// import { define as __VersionSelector } from './components/VersionSelector';
// others
import __SConductor from '@coffeekraken/s-conductor';
// import __SDashboard from '@coffeekraken/s-dashboard';
import __STheme from '@coffeekraken/s-theme';
// import __SCssAnimation from '@coffeekraken/s-css-animation';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
// setup conductor
__SConductor.setup({
    log: true,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        verbose: true,
    });
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        verbose: true,
    });
    __SLitComponent.setDefaultProps(['s-panel', 'ck-settings'], {
        mountWhen: 'direct',
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
    // init theme
    __STheme.init({
        variant: 'dark',
    });
    // exported css
    if (__SEnv.is('production')) {
        __querySelectorLive('[css]', ($elm) => __awaiter(void 0, void 0, void 0, function* () {
            yield __whenNearViewport($elm);
            const path = $elm.getAttribute('css');
            const $link = document.createElement('link');
            $link.setAttribute('rel', 'stylesheet');
            $link.setAttribute('id', path);
            $link.setAttribute('href', `/dist/css/exports/${path}.css`);
            document.head.appendChild($link);
        }));
    }
    // features
    __sActivateFeature();
    __sPageTransitionFeature();
    // internal components
    // __VersionSelector();
    __CKSearchComponent();
    __CkFallingStarsComponent();
    __CKWelcomeRatingsComponent();
    // components
    __CKDiscoverComponent();
    __CKDiscoverTabedComponent();
    __CKSettingsComponent();
    __CKRatingsComponent();
    __CKDocSubNavComponent();
    __SCodeExampleWebcomponent();
    __SFiltrableInputComponent();
    __SSidePanelWebcomponent();
    __SRatingComponent();
    __SColorPickerComponent();
    __SDatetimePickerComponent();
    __SScrollComponent();
    __SRangeWebcomponent();
    __SThemeSwitcherComponent();
    __SSliderComponent({
        behaviors: {
            slideable: {
                class: SSliderSlideableBehavior,
                settings: {},
            },
            // cssAnimation: {
            //     class: SSliderCssAnimationBehavior,
            //     settings: {},
            // },
        },
    });
    // features
    __sSugarFeature();
    __sFloatingFeature();
    // __sAppearFeature();
    __sRefocusFeature();
    __sInlineFeature();
    // __sParallaxFeature();
    __sFormValidateFeature({
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
    });
    // dashboard
    // new __SDashboard({
    //     dashboard: {
    //         components: {
    //             's-dashboard-pages': {
    //                 onSelect: (page) => {
    //                     document.location.href = page.item.loc;
    //                 },
    //             },
    //         },
    //     },
    // });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRiwrRUFBK0U7QUFDL0UsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekYsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RixPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQ0gsTUFBTSxJQUFJLGtCQUFrQixFQUM1Qix3QkFBd0IsR0FDM0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxJQUFJLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUvRixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckYsbUZBQW1GO0FBQ25GLE9BQU8sRUFBRSxNQUFNLElBQUksb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVqRixhQUFhO0FBQ2IscUVBQXFFO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDcEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxJQUFJLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sSUFBSSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxJQUFJLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEYsT0FBTyxrQkFBa0IsTUFBTSxvREFBb0QsQ0FBQztBQUNwRixPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBRXJGLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLDhFQUE4RTtBQUU5RSxTQUFTO0FBQ1QsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsd0RBQXdEO0FBQ3hELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLCtEQUErRDtBQUUvRCxhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMvRCxhQUFhO0FBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRSxrQkFBa0I7QUFDbEIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNmLEdBQUcsRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDO0FBRUgsQ0FBQyxHQUFTLEVBQUU7SUFDUixVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUM1QixTQUFTLEVBQUUsY0FBYztRQUN6QixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUNqQyxTQUFTLEVBQUUsY0FBYztRQUN6QixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUFFO1FBQ3hELFNBQVMsRUFBRSxRQUFRO0tBQ3RCLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2hELGdCQUFnQixFQUFFO1lBQ2QsTUFBTSxFQUFFLEdBQUc7U0FDZDtRQUNELFVBQVUsRUFBRTtZQUNSLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQzthQUNYO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxhQUFhO0lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNWLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUMsQ0FBQztJQUVILGVBQWU7SUFDZixJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDekIsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7WUFDeEMsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDeEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUscUJBQXFCLElBQUksTUFBTSxDQUFDLENBQUM7WUFDNUQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUNOO0lBRUQsV0FBVztJQUNYLGtCQUFrQixFQUFFLENBQUM7SUFDckIsd0JBQXdCLEVBQUUsQ0FBQztJQUUzQixzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQixFQUFFLENBQUM7SUFDdEIseUJBQXlCLEVBQUUsQ0FBQztJQUM1QiwyQkFBMkIsRUFBRSxDQUFDO0lBRTlCLGFBQWE7SUFDYixxQkFBcUIsRUFBRSxDQUFDO0lBQ3hCLDBCQUEwQixFQUFFLENBQUM7SUFDN0IscUJBQXFCLEVBQUUsQ0FBQztJQUN4QixvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLHNCQUFzQixFQUFFLENBQUM7SUFDekIsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QiwwQkFBMEIsRUFBRSxDQUFDO0lBQzdCLHdCQUF3QixFQUFFLENBQUM7SUFDM0Isa0JBQWtCLEVBQUUsQ0FBQztJQUNyQix1QkFBdUIsRUFBRSxDQUFDO0lBQzFCLDBCQUEwQixFQUFFLENBQUM7SUFDN0Isa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLHlCQUF5QixFQUFFLENBQUM7SUFDNUIsa0JBQWtCLENBQUM7UUFDZixTQUFTLEVBQUU7WUFDUCxTQUFTLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLHdCQUF3QjtnQkFDL0IsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNELGtCQUFrQjtZQUNsQiwwQ0FBMEM7WUFDMUMsb0JBQW9CO1lBQ3BCLEtBQUs7U0FDUjtLQUNKLENBQUMsQ0FBQztJQUVILFdBQVc7SUFDWCxlQUFlLEVBQUUsQ0FBQztJQUNsQixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLHNCQUFzQjtJQUN0QixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLGdCQUFnQixFQUFFLENBQUM7SUFDbkIsd0JBQXdCO0lBQ3hCLHNCQUFzQixDQUFDO1FBQ25CLGlCQUFpQixFQUFFO1lBQ2YsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUssS0FBSyxjQUFjLEVBQUU7b0JBQzFCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDbEIsd0NBQXdDLENBQzNDLENBQUM7aUJBQ0w7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKO0tBQ0osQ0FBQyxDQUFDO0lBRUgsWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHFDQUFxQztJQUNyQyx3Q0FBd0M7SUFDeEMsOERBQThEO0lBQzlELHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLFNBQVM7SUFDVCxNQUFNO0FBQ1YsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=
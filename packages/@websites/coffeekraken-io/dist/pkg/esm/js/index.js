var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
// import __SDashboard from '@coffeekraken/s-dashboard';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
import { define as __SGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSidePanelComponentDefine } from '@coffeekraken/s-panel-component';
import { define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
import { define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component';
import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';
import __SFeature from '@coffeekraken/s-feature';
import { define as __SHighlightFeatureDefine } from '@coffeekraken/s-highlight-feature';
import { define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
import { define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
import { define as __SParallaxFeatureDefine } from '@coffeekraken/s-parallax-feature';
// Website specific
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
import { define as __CKDiscoverWelcomeComponent } from './components/CKDiscoverWelcome';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
// Libs
import __STheme from '@coffeekraken/s-theme';
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// For doc specific
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SFeature.setDefaultProps(['s-highlight'], {
        opacity: 0.3,
    });
    __SFeature.setDefaultProps(['s-form-validate'], {
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
    });
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SLitComponent.setDefaultProps(['ck-search-input', 's-color-picker', 's-datetime-picker'], {
        mountWhen: 'interact',
        // verbose: !__SEnv.is('devsCut'),
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
    // essentials
    __SPackEssentials();
    // features
    __SPageTransitionFeatureDefine();
    __SLazyFeatureDefine();
    __SParallaxFeatureDefine();
    __SHighlightFeatureDefine();
    // components
    __SCodeExampleComponentDefine();
    __SSliderComponentDefine();
    __SFiltrableInputComponentDefine();
    __SSidePanelComponentDefine();
    __SRatingComponentDefine();
    __SColorPickerComponentDefine();
    __SDatetimePickerComponentDefine();
    __SGoogleMapComponentDefine();
    __SThemeSwitcherComponentDefine();
    // Website specific
    // __CKRatingsComponent();
    // __CKWelcomeRatingsComponent();
    __CKSearchComponent();
    __CKSettingsComponent();
    __CKDiscoverComponent();
    __CKDiscoverWelcomeComponent();
    __CKDiscoverTabedComponent();
    // dashboard
    // const dashboard = new __SDashboard({
    //   dashboard: {
    //     components: {
    //       's-dashboard-pages': {
    //         onSelect: (page) => {
    //           dashboard.close();
    //           document.dispatchEvent(
    //             new CustomEvent('location.href', {
    //               detail: page.item.loc,
    //               bubbles: true,
    //             })
    //           );
    //         },
    //       },
    //     },
    //   },
    // });
    // code example highlight
    __querySelectorLive('.s-code-example__content', ($elm) => {
        $elm.setAttribute('s-highlight', 'light');
    });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRyx3REFBd0Q7QUFDeEQsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLElBQUksZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RyxPQUFPLEVBQUUsTUFBTSxJQUFJLDJCQUEyQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0YsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEYsT0FBTyxFQUFFLE1BQU0sSUFBSSwrQkFBK0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRXJHLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsTUFBTSxJQUFJLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUUsT0FBTyxFQUFFLE1BQU0sSUFBSSw4QkFBOEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxNQUFNLElB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
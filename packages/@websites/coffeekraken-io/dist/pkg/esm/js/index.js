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
import __SFront from '@coffeekraken/s-front';
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
// import { define as __SGlitchFeatureDefine } from '@coffeekraken/s-glitch-feature';
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
import { define as __CKVersionSelector } from './components/CKVersionSelector';
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import { __isMobile } from '@coffeekraken/sugar/is';
import { __querySelectorLive, __reloadStylesheets, } from '@coffeekraken/sugar/dom';
// Libs
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// For doc specific
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        // perform custom update
        __reloadStylesheets();
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SFeature.setDefaultProps(['s-highlight'], {
        opacity: 0.3,
        lod: 4,
    });
    __SFeature.setDefaultProps('s-refocus', {
        trigger: ['event:actual', 'anchor', 'history'],
        offsetY: 400,
    });
    __SFeature.setDefaultProps(['s-parallax', 's-appear'], {
        lod: 3,
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
    __SFront.init({});
    // essentials
    __SPackEssentials();
    // features
    __SPageTransitionFeatureDefine();
    __SLazyFeatureDefine();
    __SParallaxFeatureDefine();
    __SHighlightFeatureDefine();
    // __SGlitchFeatureDefine();
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
    __CKVersionSelector();
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
    __querySelectorLive('.s-code-example_content', ($elm) => {
        $elm.setAttribute('intensity', '0.3');
        $elm.setAttribute('s-highlight', 'light');
    });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRyx3REFBd0Q7QUFDeEQsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLElBQUksZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RyxPQUFPLEVBQUUsTUFBTSxJQUFJLDJCQUEyQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0YsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEYsT0FBTyxFQUFFLE1BQU0sSUFBSSwrQkFBK0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRXJHLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELHFGQUFxRjtBQUNyRixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLElBQUksOEJBQThC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
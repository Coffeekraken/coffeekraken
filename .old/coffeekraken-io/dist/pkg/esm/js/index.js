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
import { __define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { __define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
// import __SDashboard from '@coffeekraken/s-dashboard';
import { __define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { __define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
import { __define as __SGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __define as __SSidePanelComponentDefine } from '@coffeekraken/s-panel-component';
import { __define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
import { __define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component';
import { __define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';
import __SFeature from '@coffeekraken/s-feature';
// import { __define as __SGlitchFeatureDefine } from '@coffeekraken/s-glitch-feature';
import { __define as __SHighlightFeatureDefine } from '@coffeekraken/s-highlight-feature';
import { __define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
import { __define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
import { __define as __SParallaxFeatureDefine } from '@coffeekraken/s-parallax-feature';
// Website specific
import { __define as __CKDiscoverComponent } from './components/CKDiscover';
import { __define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
import { __define as __CKDiscoverWelcomeComponent } from './components/CKDiscoverWelcome';
import { __define as __CKDocSubNavDefine } from './components/CKDocSubNav';
import { __define as __CKSearchComponent } from './components/CKSearch';
import { __define as __CKSettingsComponent } from './components/CkSettings';
import { __define as __CKVersionSelector } from './components/CKVersionSelector';
// import { __define as __CKRatingsComponent } from './components/CKRating';
// import { __define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import { __isMobile } from '@coffeekraken/sugar/is';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
// Libs
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
        lod: 4,
    });
    __SFeature.setDefaultProps('s-refocus', {
        trigger: ['event:actual', 'anchor', 'history'],
        offsetY: 400,
    });
    __SFeature.setDefaultProps(['s-parallax'], {
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
    __CKDocSubNavDefine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxRQUFRLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNuRyx3REFBd0Q7QUFDeEQsT0FBTyxFQUFFLFFBQVEsSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxRQUFRLElBQUksZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RyxPQUFPLEVBQUUsUUFBUSxJQUFJLDJCQUEyQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0YsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsSUFBSSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxRQUFRLElBQUksd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsUUFBUSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFFBQVEsSUFBSSwrQkFBK0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRXZHLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELHVGQUF1RjtBQUN2RixPQUFPLEVBQUUsUUFBUSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUYsT0FBTyxFQUFFLFFBQVEsSUFBSSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLElBQUksOEJBQThC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
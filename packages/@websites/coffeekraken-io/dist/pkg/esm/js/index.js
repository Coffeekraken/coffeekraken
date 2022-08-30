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
import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import __SDepsFeature, { define as __sDepsFeatureDefine, } from '@coffeekraken/s-deps-feature';
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
    // // exported css
    // // if (__SEnv.is('production')) {
    // __querySelectorLive("[css]", async ($elm) => {
    //   await __whenNearViewport($elm);
    //   const path = $elm.getAttribute("css");
    //   const $link = document.createElement("link");
    //   $link.setAttribute("rel", "stylesheet");
    //   $link.setAttribute("id", path);
    //   $link.setAttribute("href", `/dist/css/partials/${path}.css`);
    //   document.head.appendChild($link);
    // });
    // // }
    // dependencies
    __SDepsFeature.registerDeps('.icon-card', {
        css: 'iconCard',
    });
    __SDepsFeature.registerDeps('s-code-example', {
        css: 'sCodeExample',
    });
    __SDepsFeature.registerDeps('.sidemenu', {
        css: 'sidemenu',
    });
    __SDepsFeature.registerDeps('.code-example-section', {
        css: 'codeExampleSection',
    });
    __SDepsFeature.registerDeps('.s-filtrable-input', {
        css: 'sFiltrableInput',
    });
    __SDepsFeature.registerDeps('.s-color-picker', {
        css: 'sColorPicker',
    });
    __SDepsFeature.registerDeps('.s-rating', {
        css: 'sRating',
    });
    __SDepsFeature.registerDeps('.s-slider', {
        css: 'sSlider',
    });
    __SDepsFeature.registerDeps('.s-theme-switcher', {
        css: 'sThemeSwitcher',
    });
    __SDepsFeature.registerDeps('.s-platform', {
        css: 'sPlatform',
    });
    // features
    __sDepsFeatureDefine();
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
        },
    });
    // features
    __sSugarFeature();
    __sFloatingFeature();
    __sAppearFeature();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxjQUFjLEVBQUUsRUFDckIsTUFBTSxJQUFJLG9CQUFvQixHQUMvQixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0YsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFF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
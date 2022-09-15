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
// import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
// import { define as __CKRatingsComponent } from './components/CKRating';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import __SDashboard from '@coffeekraken/s-dashboard';
import __STheme from '@coffeekraken/s-theme';
import { __querySelectorLive, __whenNearViewport, } from '@coffeekraken/sugar/dom';
// import __SCssAnimation from '@coffeekraken/s-css-animation';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
// setup conductor
// __SConductor.setup({
//     log: true,
// });
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SLitComponent.setDefaultProps(['ck-search-input', 's-color-picker', 's-datetime-picker', 's-range'], {
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
    __querySelectorLive('[s-template]', ($template) => __awaiter(void 0, void 0, void 0, function* () {
        yield __whenNearViewport($template);
        const $content = $template.content;
        const $container = $content.children[0];
        $template.parentNode.insertBefore($content, $template);
        $container === null || $container === void 0 ? void 0 : $container.classList.add('s-template');
        $container === null || $container === void 0 ? void 0 : $container.classList.add('ready');
        $container === null || $container === void 0 ? void 0 : $container.setAttribute('ready', 'true');
        $template.remove();
    }));
    // init theme
    __STheme.init({
        variant: 'dark',
    });
    [
        {
            sel: '.icon-card',
            css: 'iconCard',
        },
        {
            sel: 's-code-example',
            css: 'sCodeExample',
        },
        {
            sel: '.sidemenu',
            css: 'sidemenu',
        },
        {
            sel: '.code-example-section',
            css: 'codeExampleSection',
        },
        {
            sel: '.s-filtrable-input',
            css: 'sFiltrableInput',
        },
        {
            sel: 's-color-picker',
            css: 'sColorPicker',
        },
        {
            sel: 's-datetime-picker',
            css: 'sDatetimePicker',
        },
        {
            sel: 's-rating',
            css: 'sRating',
        },
        {
            sel: 's-slider',
            css: 'sSlider',
        },
        {
            sel: 's-theme-switcher',
            css: 'sThemeSwitcher',
        },
        {
            sel: '.s-plaform',
            css: 'sPlatform',
        },
    ].forEach((dep) => {
        __SDepsFeature.registerDeps(dep.sel, {
            css: dep.css,
        });
    });
    // features
    __sDepsFeatureDefine();
    __sActivateFeature();
    __sPageTransitionFeature();
    // __STemplateFeature();
    // components
    // __CKRatingsComponent();
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
    // internal components
    // __VersionSelector();
    __CKSearchComponent();
    __CKDiscoverComponent();
    __CKDiscoverTabedComponent();
    __CKSettingsComponent();
    __CKDocSubNavComponent();
    // __CkFallingStarsComponent();
    // __CKWelcomeRatingsComponent();
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
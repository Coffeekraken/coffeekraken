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
// import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import __SDepsFeature, { define as __sDepsFeatureDefine, } from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { define as __SSliderComponent, SSliderSlideableBehavior, } from '@coffeekraken/s-slider-component';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
// import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
// import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
// import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
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
function asyncComponents() {
    return __awaiter(this, void 0, void 0, function* () {
        // Code example
        const { define: __lazyDefineSCodeExample } = yield import('@coffeekraken/s-code-example-component/lazy');
        __lazyDefineSCodeExample();
        // Clipboard copy
        const { define: __lazyDefineSClipboardCopy } = yield import('@coffeekraken/s-clipboard-copy-component/lazy');
        __lazyDefineSClipboardCopy();
        // // Slider
        // const { define: __lazyDefineSSliderCopy } = await import(
        //     '@coffeekraken/s-slider-component/lazy'
        // );
        // __lazyDefineSSliderCopy();
        // Color picker
        const { define: __lazyDefineSColorPicker } = yield import('@coffeekraken/s-color-picker-component/lazy');
        __lazyDefineSColorPicker();
        // Datetime picker
        const { define: __lazyDefineSDatetimePicker } = yield import('@coffeekraken/s-datetime-picker-component/lazy');
        __lazyDefineSDatetimePicker();
        // Filtrable input
        const { define: __lazyDefineSFiltrableInput } = yield import('@coffeekraken/s-filtrable-input-component/lazy');
        __lazyDefineSFiltrableInput();
        // Panel
        const { define: __lazyDefineSPanel } = yield import('@coffeekraken/s-panel-component/lazy');
        __lazyDefineSPanel();
        // Range
        const { define: __lazyDefineSRange } = yield import('@coffeekraken/s-range-component/lazy');
        __lazyDefineSRange();
        // Rating
        const { define: __lazyDefineSRating } = yield import('@coffeekraken/s-rating-component/lazy');
        __lazyDefineSRating();
        // Scroll
        const { define: __lazyDefineSScroll } = yield import('@coffeekraken/s-scroll-component/lazy');
        __lazyDefineSScroll();
        // Theme switcher
        const { define: __lazyDefineSThemeSwitcher } = yield import('@coffeekraken/s-theme-switcher-component/lazy');
        __lazyDefineSThemeSwitcher();
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
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
    // assync components
    asyncComponents();
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
    // __SCodeExampleWebcomponent();
    // __SFiltrableInputComponent();
    // __SSidePanelWebcomponent();
    // __SRatingComponent();
    // __SColorPickerComponent();
    // __SDatetimePickerComponent();
    // __SScrollComponent();
    // __SRangeWebcomponent();
    // __SThemeSwitcherComponent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRiwrRUFBK0U7QUFDL0UsaUdBQWlHO0FBQ2pHLDhGQUE4RjtBQUM5RixvR0FBb0c7QUFDcEcsT0FBTyxjQUFjLEVBQUUsRUFDckIsTUFBTSxJQUFJLG9CQUFvQixHQUMvQixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELG9HQUFvRztBQUNwRyxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0YsbUZBQW1GO0FBQ25GLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxtRkFBbUY7QUFDbkYsT0FBTyxFQUNMLE1BQU0sSUFBSSxrQkFBa0IsRUFDNUIsd0JBQXdCLEdBQ3pCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxrR0FBa0c7QUFFbEcsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsd0ZBQXdGO0FBQ3hGLG1GQUFtRjtBQUNuRixvRkFBb0Y7QUFFcEYsYUFBYTtBQUNiLHFFQUFxRTtBQUNyRSxPQUFPLEVBQUUsTUFBTSxJQUFJLHFCQUFxQixFQUFFLE1BQU0seUJB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
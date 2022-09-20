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
import { define as __SCodeExampleComponent } from '@coffeekraken/s-code-example-component/lazy';
import __SDepsFeature, { define as __sDepsFeatureDefine, } from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
import { define as __SSidePanelComponent } from '@coffeekraken/s-panel-component';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import { define as __SSliderComponent, SSliderSlideableBehavior, } from '@coffeekraken/s-slider-component';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import { define as __sTemplateFeature } from '@coffeekraken/s-template-feature';
// Website specific
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
// Libs
import __STheme from '@coffeekraken/s-theme';
import { __wait } from '@coffeekraken/sugar/datetime';
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
    // dependencies
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
            sel: '.s-platform',
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
    __sTemplateFeature();
    // components
    // __CKRatingsComponent();
    __SCodeExampleComponent();
    __SFiltrableInputComponent();
    __SSidePanelComponent();
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
    __sRefocusFeature();
    __sInlineFeature();
    // internal components
    __CKSearchComponent();
    __CKSettingsComponent();
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
    // Load delayed features
    // 2s after
    let delayedLoaded = false;
    function load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (delayedLoaded)
                return;
            delayedLoaded = true;
            console.log('MOVED');
            document.removeEventListener('pointermove', load);
            yield __wait(1000);
            import('./delayed');
        });
    }
    document.addEventListener('pointermove', load);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEcsT0FBTyxjQUFjLEVBQUUsRUFDbkIsTUFBTSxJQUFJLG9CQUFvQixHQUNqQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUNILE1BQU0sSUFBSSxrQkFBa0IsRUFDNUIsd0JBQXdCLEdBQzNCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFaEYsbUJBQW1CO0FBQ25CLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxJQUFJLHFCQUFxQixF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
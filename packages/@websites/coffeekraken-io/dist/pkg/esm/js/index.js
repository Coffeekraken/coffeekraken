var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __SClipboardCopyComponent } from '@coffeekraken/s-clipboard-copy-component';
import { define as __SCodeExampleComponent } from '@coffeekraken/s-code-example-component/lazy';
import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import __SDashboard from '@coffeekraken/s-dashboard';
import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSidePanelComponent } from '@coffeekraken/s-panel-component';
import { define as __SRangeComponent } from '@coffeekraken/s-range-component';
import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { define as __SSliderComponent, SSliderSlideableBehavior, } from '@coffeekraken/s-slider-component';
import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';
import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import __SDepsFeature, { define as __sDepsFeatureDefine, } from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import { define as __sTemplateFeature } from '@coffeekraken/s-template-feature';
// Website specific
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
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
    __sFloatingFeature();
    __sInlineFeature();
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
    __sSugarFeature();
    __sRefocusFeature();
    // components
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
    __SClipboardCopyComponent();
    __SRatingComponent();
    __SColorPickerComponent();
    __SDatetimePickerComponent();
    __SScrollComponent();
    __SRangeComponent();
    __SThemeSwitcherComponent();
    // Website specific
    // __CKRatingsComponent();
    // __CKWelcomeRatingsComponent();
    __CKSearchComponent();
    __CKSettingsComponent();
    __CKDiscoverComponent();
    __CKDiscoverTabedComponent();
    // dashboard
    const dashboard = new __SDashboard({
        dashboard: {
            components: {
                's-dashboard-pages': {
                    onSelect: (page) => {
                        dashboard.close();
                        document.dispatchEvent(new CustomEvent('location.href', {
                            detail: page.item.loc,
                            bubbles: true,
                        }));
                    },
                },
            },
        },
    });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRixPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEcsT0FBTyxFQUFFLE1BQU0sSUFBSSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNGLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sRUFDSCxNQUFNLElBQUksa0JBQWtCLEVBQzVCLHdCQUF3QixHQUMzQixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUvRixPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxjQUFjLEVBQUUsRUFDbkIsTUFBTSxJQUFJLG9CQUFvQixHQUNqQyxNQUFNLDhC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
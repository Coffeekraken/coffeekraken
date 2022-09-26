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
import '@coffeekraken/s-clipboard-copy-mito-component/webcomponent';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRixPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEcsT0FBTyxFQUFFLE1BQU0sSUFBSSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNGLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sRUFDTCxNQUFNLElBQUksa0JBQWtCLEVBQzVCLHdCQUF3QixHQUN6QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUvRixPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxjQUFjLEVBQUUsRUFDckIsTUFBTSxJQUFJLG9CQUFvQixHQUMvQixNQUFNLDhC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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __SClipboardCopyComponent } from '@coffeekraken/s-clipboard-copy-component/webcomponent';
import { define as __SInlineComponent } from '@coffeekraken/s-inline-component/webcomponent';
import { define as __SCodeExampleComponent } from '@coffeekraken/s-code-example-component/webcomponent';
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
    __SCodeExampleComponent({
        cssDeps: ['global', '/dist/css/partials/sCodeExample.css'],
    });
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
    __SInlineComponent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUM1RyxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFFN0YsT0FBTyxFQUFFLE1BQU0sSUFBSSx1QkFBdUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pHLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQ0wsTUFBTSxJQUFJLGtCQUFrQixFQUM1Qix3QkFBd0IsR0FDekIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFL0YsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FB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
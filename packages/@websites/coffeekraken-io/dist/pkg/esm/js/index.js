var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component';
import { define as __sInlineFeatureDefine } from '@coffeekraken/s-inline-feature';
import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import __SDashboard from '@coffeekraken/s-dashboard';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSidePanelComponentDefine } from '@coffeekraken/s-panel-component';
import { define as __SRangeComponentDefine } from '@coffeekraken/s-range-component';
import { define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
import { define as __SScrollComponentDefine } from '@coffeekraken/s-scroll-component';
import { define as __SSliderComponentDefine, SSliderSlideableBehavior, } from '@coffeekraken/s-slider-component';
import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';
import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
import { define as __SDepsFeatureDefine } from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __SFloatingFeatureDefube } from '@coffeekraken/s-floating-feature';
import { define as __SFormValidateFeatureDefine } from '@coffeekraken/s-form-validate-feature';
import { define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
import { define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature';
import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
import { define as __STemplateFeatureDefine } from '@coffeekraken/s-template-feature';
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
    // [
    //   {
    //     sel: '.icon-card',
    //     css: 'iconCard',
    //   },
    //   {
    //     sel: 's-code-example',
    //     css: 'sCodeExample',
    //   },
    //   {
    //     sel: '.sidemenu',
    //     css: 'sidemenu',
    //   },
    //   {
    //     sel: '.code-example-section',
    //     css: 'codeExampleSection',
    //   },
    //   {
    //     sel: '.s-filtrable-input',
    //     css: 'sFiltrableInput',
    //   },
    //   {
    //     sel: 's-color-picker',
    //     css: 'sColorPicker',
    //   },
    //   {
    //     sel: 's-datetime-picker',
    //     css: 'sDatetimePicker',
    //   },
    //   {
    //     sel: 's-rating',
    //     css: 'sRating',
    //   },
    //   {
    //     sel: 's-slider',
    //     css: 'sSlider',
    //   },
    //   {
    //     sel: 's-theme-switcher',
    //     css: 'sThemeSwitcher',
    //   },
    //   {
    //     sel: '.s-platform',
    //     css: 'sPlatform',
    //   },
    // ].forEach((dep) => {
    //   __SDepsFeature.registerDeps(dep.sel, {
    //     css: dep.css,
    //   });
    // });
    // features
    __SDepsFeatureDefine();
    __SActivateFeatureDefine();
    __SPageTransitionFeatureDefine();
    __STemplateFeatureDefine();
    __SFloatingFeatureDefube();
    __SFormValidateFeatureDefine({
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
    });
    __SSugarFeatureDefine();
    __SRefocusFeatureDefine();
    __sInlineFeatureDefine();
    // components
    __SCodeExampleComponentDefine({
        cssDeps: ['global', '/dist/css/partials/sCodeExample.css'],
    });
    __SFiltrableInputComponentDefine();
    __SSidePanelComponentDefine();
    __SSliderComponentDefine({
        behaviors: {
            slideable: {
                class: SSliderSlideableBehavior,
                settings: {},
            },
        },
    });
    __SClipboardCopyComponentDefine();
    __SRatingComponentDefine();
    __SColorPickerComponentDefine();
    __SDatetimePickerComponentDefine();
    __SScrollComponentDefine();
    __SRangeComponentDefine();
    __SThemeSwitcherComponentDefine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksK0JBQStCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRyxPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbEYsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxJQUFJLGdDQUFnQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkcsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLElBQUksMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEYsT0FBTyxFQUFFLE1BQU0sSUFBSSx3QkFBd0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RixPQUFPLEVBQ0wsTUFBTSxJQUFJLHdCQUF3QixFQUNsQyx3QkFBd0IsR0FDekIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxJQUFJLCtCQUErQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFckcsT0FBTyxFQUFFLE1BQU0sSUFBSSx3QkFBd0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FB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
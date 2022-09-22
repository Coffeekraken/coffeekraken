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
import {
    define as __SSliderComponent,
    SSliderSlideableBehavior,
} from '@coffeekraken/s-slider-component';
import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';

import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import __SDepsFeature, {
    define as __sDepsFeatureDefine,
} from '@coffeekraken/s-deps-feature';
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

(async () => {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SLitComponent.setDefaultProps(
        ['ck-search-input', 's-color-picker', 's-datetime-picker'],
        {
            mountWhen: 'interact',
            // verbose: !__SEnv.is('devsCut'),
        },
    );
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
                    return helpers.message(
                        'Are you sure? Krakens are dangerous...',
                    );
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
                        document.dispatchEvent(
                            new CustomEvent('location.href', {
                                detail: page.item.loc,
                                bubbles: true,
                            }),
                        );
                    },
                },
            },
        },
    });
})();

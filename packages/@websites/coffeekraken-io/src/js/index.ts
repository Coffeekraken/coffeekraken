import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as __SCodeExampleComponent } from '@coffeekraken/s-code-example-component/lazy';
import __SDepsFeature, {
    define as __sDepsFeatureDefine,
} from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';

import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
import { define as __SSidePanelComponent } from '@coffeekraken/s-panel-component';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import {
    define as __SSliderComponent,
    SSliderSlideableBehavior,
} from '@coffeekraken/s-slider-component';
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
    async function load() {
        if (delayedLoaded) return;
        delayedLoaded = true;
        console.log('MOVED');
        document.removeEventListener('pointermove', load);
        await __wait(1000);
        import('./delayed');
    }
    document.addEventListener('pointermove', load);
})();

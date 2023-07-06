// generic
import __SDashboard from '@coffeekraken/s-dashboard';
import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';

// website related
import __WelcomeSlider from './classes/WelcomeSlider';
import { __define as __CKMenuDefine } from './components/CKMenu';

// components
import { __define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { __define as __SDocComponentDefine } from '@coffeekraken/s-doc';

// features
import __SFeature from '@coffeekraken/s-feature';
import { __define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __smoothScroll } from '@coffeekraken/sugar/feature';

// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');

(async () => {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
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

    __SFront.init();

    // essentials
    __SPackEssentials();

    // features
    __smoothScroll();

    // components
    __CKMenuDefine();
    __SHotkeysListComponentDefine();
    __SCodeExampleComponentDefine();
    __SDocComponentDefine({
        mountWhen: 'direct',
        endpoints: {
            // base: `${document.location.protocol}//${document.location.hostname}:9191/api/doc`,
        },
        icons: {
            file: '<i class="s-icon:file"></i>',
            search: '<i class="s-icon:search"></i>',
            enterFullscreen: '<i class="s-icon:enter-fullscreen"></i>',
            exitFullscreen: '<i class="s-icon:exit-fullscreen"></i>',
        },
    });

    // Website specific
    const $slider = document.querySelector('[welcome-slider]');
    $slider && new __WelcomeSlider($slider);

    // dashboard
    new __SDashboard();
})();

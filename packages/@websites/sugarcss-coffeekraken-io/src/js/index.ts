// generic
import __SDashboard from '@coffeekraken/s-dashboard';
import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';

// website related
import __WelcomeSlider from './classes/WelcomeSlider.js';
import { define as __CKMenuDefine } from './components/CKMenu.js';

// components
import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';

// features
import __SFeature from '@coffeekraken/s-feature';
import { define as __SHighlightFeatureDefine } from '@coffeekraken/s-highlight-feature';
import { define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SParallaxFeatureDefine } from '@coffeekraken/s-parallax-feature';
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
    __SHighlightFeatureDefine();
    __SParallaxFeatureDefine();

    // components
    __CKMenuDefine();
    __SHotkeysListComponentDefine();
    __SCodeExampleComponentDefine();
    __SGaugeComponentDefine();
    __SDocComponentDefine({
        mountWhen: 'direct',
        endpoints: {
            base: document.location.origin.includes(':5173')
                ? 'http://localhost:9191/api/doc'
                : '/api/doc',
        },
        icons: {
            file: '<i class="s-icon:file"></i>',
            search: '<i class="s-icon:search"></i>',
            enterFullscreen: '<i class="s-icon:enter-fullscreen"></i>',
            exitFullscreen: '<i class="s-icon:exit-fullscreen"></i>',
            menu: '<i class="s-icon:documentation"></i>',
        },
    });

    // Website specific
    const $slider = document.querySelector('[welcome-slider]');
    $slider && new __WelcomeSlider($slider);

    // dashboard
    new __SDashboard();
})();

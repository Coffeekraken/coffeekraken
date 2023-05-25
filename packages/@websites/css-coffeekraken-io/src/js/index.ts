import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import __SFront from '@coffeekraken/s-front';

import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
import __SFeature from '@coffeekraken/s-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';

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

    __SFront.init({});

    // essentials
    __SPackEssentials();

    // features

    // components
    __SCodeExampleComponentDefine();
    __SDocComponentDefine({
        mountWhen: 'direct',
    });

    // Website specific
})();

import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import type TWhenTrigger from '@coffeekraken/sugar/js/dom/detect/when';

interface ILazyDefineSettings {
    when: TWhenTrigger;
}

export function define(
    props = {},
    tagName = 's-slider',
    settings: Partial<ILazyDefineSettings> = {},
) {
    __querySelectorLive(
        tagName,
        async ($elm) => {
            const { define } = await import(
                '../../../../src/js/build/webcomponent/SSliderComponent'
            );
            define(props, tagName);
        },
        {
            when: settings.when ?? 'nearViewport',
            firstOnly: true,
        },
    );
}

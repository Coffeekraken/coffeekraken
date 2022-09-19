import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import type TWhenTrigger from '@coffeekraken/sugar/js/dom/detect/when';

interface ILazyDefineSettings {
    when: TWhenTrigger;
}

export function define(
    props,
    tagName = 's-panel',
    settings: Partial<ILazyDefineSettings> = {},
) {
    __querySelectorLive(
        tagName,
        async ($elm) => {
            const define = await import('./define');
            define.default(props, tagName);
        },
        {
            when: settings.when ?? 'direct',
            firstOnly: true,
        },
    );
}

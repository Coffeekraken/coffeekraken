import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import type TWhenTrigger from '@coffeekraken/sugar/js/dom/detect/when';

interface ILazyDefineSettings {
    when: TWhenTrigger;
}

export function define(
    props,
    name = 's-appear',
    settings: Partial<ILazyDefineSettings> = {},
) {
    __querySelectorLive(
        `[${name}]`,
        async ($elm) => {
            const define = await import('./define');
            define.default(props, name);
        },
        {
            when: settings.when ?? 'nearViewport',
            firstOnly: true,
        },
    );
}

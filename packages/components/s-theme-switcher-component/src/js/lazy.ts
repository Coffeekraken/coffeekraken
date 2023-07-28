import type { TWhenTrigger } from '@coffeekraken/sugar/dom';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';

interface ILazyDefineSettings {
    when: TWhenTrigger;
}

export function define(
    props,
    tagName = 's-theme-switcher',
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

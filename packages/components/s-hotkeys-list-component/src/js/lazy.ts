import type { TWhenTrigger } from '@coffeekraken/sugar/dom';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';

interface ILazyDefineSettings {
    when: TWhenTrigger;
}

export function __define(
    props,
    tagName = 's-hotkeys-list',
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

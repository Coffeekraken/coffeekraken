import type { TWhenTrigger } from '@coffeekraken/sugar/dom';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';

interface ILazyDefineSettings {
    when: TWhenTrigger;
}

export function __define(
    props,
    name = 's-floating',
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

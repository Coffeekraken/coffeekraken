import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import type { TWhenTrigger } from '@coffeekraken/sugar/dom';

interface ILazyDefineSettings extends ISLitComponentDefineSettings {
    when: TWhenTrigger;
}

export function define(
    props,
    tagName = 's-slider',
    settings: Partial<ILazyDefineSettings> = {},
) {
    __querySelectorLive(
        tagName,
        async ($elm) => {
            const define = await import('./define');
            define.default(props, tagName, settings);
        },
        {
            when: settings.when ?? 'nearViewport',
            firstOnly: true,
        },
    );
}

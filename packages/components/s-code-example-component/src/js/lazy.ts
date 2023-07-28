import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type { TWhenTrigger } from '@coffeekraken/sugar/dom';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';

interface ILazyDefineSettings extends ISLitComponentDefineSettings {
    when: TWhenTrigger;
}

export function define(
    props,
    tagName = 's-code-example',
    settings: Partial<ILazyDefineSettings> = {},
) {
    __querySelectorLive(
        tagName,
        async ($elm, api) => {
            // api.cancel();§
            const define = await import('./define');
            define.default(props, tagName, settings);
        },
        {
            when: settings.when ?? 'nearViewport',
            firstOnly: true,
        },
    );
}

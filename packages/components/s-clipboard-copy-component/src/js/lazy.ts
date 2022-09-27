import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import type TWhenTrigger from '@coffeekraken/sugar/js/dom/detect/when';

interface ILazyDefineSettings {
    when: TWhenTrigger;
}

export function define(
    props = {},
    tagName = 's-clipboard-copy',
    settings: Partial<ILazyDefineSettings> = {},
) {
    __querySelectorLive(
        tagName,
        async ($elm) => {
            const { define } = await import(
                '../../../js/webcomponent/src/js/SClipboardCopyComponent'
            );
            define(props, tagName);
        },
        {
            when: settings.when ?? 'nearViewport',
            firstOnly: true,
        },
    );
}

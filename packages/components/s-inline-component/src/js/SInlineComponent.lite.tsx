// src/components/MyComponent.lite.tsx
import {
    onMount,
    Show,
    useDefaultProps,
    useRef,
    useStore,
} from '@builder.io/mitosis';

import '../../../../../src/css/s-inline.css';
import __SInlineComponentInterface from '../../../../../src/js/interface/SInlineComponentInterface';

/**
 * @name                SInlineComponent
 * @as                  Inline
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SInlineComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-inline
 * @platform            html
 * @status              beta
 *
 * This component represent the inline component that allows you to inline svgs for example.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-inline-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-inline-component/webcomponent';
 * define();
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

type Props = {
    src: string;
};

const DEFAULT_PROPS = __SInlineComponentInterface.defaults();

export default function SInline(props: Props) {
    // default props
    useDefaultProps<Props>(DEFAULT_PROPS);

    const container = useRef<HTMLElement>(null);

    // state
    const state = useStore({
        status: 'idle',
        loaded: false,
        svgCode: null,
        load() {
            (async () => {
                const r = await fetch(props.src);
                const text = await r.text();
                const parser = new DOMParser();
                const svg = parser.parseFromString(text, 'text/html').body
                    .innerHTML;
                state.svgCode = svg;
                state.loaded = true;
                container.innerHTML = svg;
            })();
        },
    });

    // when component is mounting
    onMount(() => {
        __SInlineComponentInterface;
        state.status = 'mounted';

        state.load();
    });

    // component template
    return (
        <div class="s-inline" status={state.status} loaded={state.loaded}>
            <Show when={state.status === 'mounted'}>
                <div ref={container}></div>
            </Show>
        </div>
    );
}

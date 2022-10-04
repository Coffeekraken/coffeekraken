// // @ts-ignore
import __prettier from 'prettier/esm/standalone.mjs';
// @ts-ignore
import __prettierJs from 'prettier/esm/parser-babel.mjs';
// @ts-ignore
import __prettierHtml from 'prettier/esm/parser-html.mjs';
// @ts-ignore
import __prettierPhp from '@prettier/plugin-php/standalone';
import __prettierCss from 'prettier/esm/parser-postcss.mjs';

import __hljs from 'highlight.js/lib/core';

import __langBash from 'highlight.js/lib/languages/bash';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langPhp from 'highlight.js/lib/languages/php';
import __langHtml from 'highlight.js/lib/languages/xml';
import __langCss from '../../../../../src/js/languages/css';

import {
    For,
    onMount,
    onUpdate,
    Show,
    useDefaultProps,
    useMetadata,
    useRef,
    useStore,
} from '@builder.io/mitosis';

import { __decodeHtmlEntities } from '@coffeekraken/sugar/string';

import __SComponent from '@coffeekraken/s-component';
import { __uniqid } from '@coffeekraken/sugar/string';
import '../../../../../src/css/s-inline.css';
import __SCodeExampleComponentInterface from '../../../../../src/js/interface/SCodeExampleComponentInterface';

/**
 * @name                SCodeExampleComponent
 * @as                  Code example
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCodeExampleComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-code-example
 * @platform            html
 * @status              beta
 *
 * This component represent a code example that make sure your passed code(s) is displayed well using under the hood the AMAZING [highlightjs](https://highlightjs.org/) library.
 *
 * @feature           Can display out of the bos codes like `bash`, `shell`, `css`, `js`, `php` and `html`
 * @feature           Possibility to add some languages through the property `languages`
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-code-example-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-code-example-component/webcomponent';
 * define();
 *
 * @example         html
 * <s-code-example>
 *      <template lang="js">
 * function $initHighlight(block, cls) {
 * try {
 *   if (cls.search(/\bno\-highlight\b/) != -1)
 *     return process(block, true, 0x0F) +
 *            ` class="${cls}"`;
 * } catch (e) {
 * }
 * for (var i = 0 / 2; i < classes.length; i++) {
 *   if (checkCondition(classes[i]) === undefined)
 *     console.log('undefined');
 * }
 *      </template>
 * </s-code-example>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-code-example-component/webcomponent';
 * define();
 *
 * @see             https://highlightjs.org/
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
type Props = {
    active: string;
    toolbar: 'copy'[];
    toolbarPosition: 'content' | 'top';
    languages: Record<string, any>;
    lines: number;
    moreLabel: string;
    lessLabel: string;
    moreAction: 'toggle';
    more: boolean;
    scrollOnMore: boolean;
    scrollToSettings: any;
    cssDeps: string | string[];
};

const DEFAULT_PROPS = __SCodeExampleComponentInterface.defaults();

useMetadata({
    isAttachedToShadowDom: true,
});

export default function SCodeExample(props: Props) {
    // default props
    useDefaultProps<Props>(DEFAULT_PROPS);

    // const component = new __SComponent('s-code-example');
    const $container = useRef<HTMLElement>(null),
        $content = useRef<HTMLElement>(null),
        $code = useRef<HTMLElement>(null);

    // state
    const state = useStore({
        status: 'idle',
        id: null,
        noCode: false,
        activeTabId: null,
        activeCode: null,
        component: null,
        more: false,
        lines: null,
        codes: [],
        mount() {
            try {
                state.component.injectStyleInShadowRoot(
                    props.cssDeps ?? [],
                    $container,
                );
            } catch (e) {}

            const $slot = $container.querySelector('slot');
            const $templates = $slot
                .assignedNodes()
                .filter((n) => n.tagName === 'TEMPLATE');

            if (!$templates.length) {
                state.noCode = true;
                return;
            }

            const languages = {
                html: __langHtml,
                javascript: __langJavascript,
                js: __langJavascript,
                php: __langPhp,
                bash: __langBash,
                shell: __langBash,
                css: __langCss,
                scss: __langCss,
                ...(props.languages ?? {}),
            };

            Object.keys(languages).forEach((lang) => {
                __hljs.registerLanguage(lang, languages[lang]);
            });

            $templates.forEach(($template, i) => {
                let lang = $template.getAttribute('lang'),
                    codeId = `s-code-example-${__uniqid()}`,
                    code = __decodeHtmlEntities($template.innerHTML);

                const codeObj = {
                    id: codeId,
                    lang,
                    code,
                };

                state.codes = [...state.codes, codeObj];
            });

            // set initial active tab
            setTimeout(() => {
                state.setActiveTabById(state.codes?.[0]?.id);
            });
        },
        setActiveTabById(codeId) {
            state.activeTabId = codeId;
            state.activeCode = state.codes.filter(
                (code) => code.id === codeId,
            )[0];

            state.activeCode = state.prepareCode(state.activeCode);

            if ($code) {
                $code.innerHTML = state.activeCode.code;
            }
        },
        prepareCode(code) {
            if (code._inited) {
                return code;
            }
            code._inited = true;

            let parser = 'babel';
            switch (code.lang) {
                case 'html':
                case 'xml':
                    parser = 'html';
                    break;
                case 'css':
                case 'scss':
                case 'postcss':
                    parser = 'css';
                    break;
            }

            try {
                code.code = __prettier.format(code.code, {
                    parser,
                    plugins: [
                        __prettierCss,
                        __prettierHtml,
                        __prettierJs,
                        __prettierPhp,
                    ],
                });
            } catch (e) {
                console.log(e);
            }

            let highlightedCode;
            try {
                const codeToHighlight = __decodeHtmlEntities(
                    code.code.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ''),
                );
                highlightedCode = __hljs.highlight(codeToHighlight, {
                    language: code.lang,
                })?.value;
                code.code = highlightedCode;
            } catch (e) {
                console.log(e);
            }

            return code;
        },
    });

    onUpdate(() => {
        // update max-lines property
        $content?.style.setProperty('--max-lines', props.lines ?? 999999);
    });

    // when component is mounting
    onMount(() => {
        __SCodeExampleComponentInterface;
        state.component = new __SComponent('s-code-example', {
            bare: false,
        });
        state.id = `s-code-example-${__uniqid()}`;
        state.mount();
        state.status = 'mounted';
    });

    // component template
    return (
        <div
            id={state.id}
            ref={$container}
            class={state.component?.className('', null, 's-bare')}
            status={state.status}
        >
            {props.children}
            <Show when={state.noCode}>
                <p
                    class={state.component.className(
                        '__no-code',
                        's-typo s-typo--p',
                    )}
                >
                    Sorry but no codes have been specified using the "template"
                    tag...
                </p>
            </Show>
            <Show when={state.component && state.activeTabId && !state.noCode}>
                <div
                    class={[
                        state.component?.className('__root'),
                        props.more ? state.component.className('more') : '',
                    ].join(' ')}
                    lines={props.lines}
                    toolbar-position={props.toolbarPosition}
                >
                    <header class={state.component.className('__nav')}>
                        <div
                            class={state.component.className(
                                '__tabs',
                                's-tabs',
                            )}
                        >
                            <For each={state.codes}>
                                {(code, idx) => (
                                    <div
                                        class={[
                                            state.component.className('__tab'),
                                            state.activeTabId === code.id
                                                ? 'active'
                                                : '',
                                        ].join(' ')}
                                        id={code.id}
                                        onclick={() =>
                                            state.setActiveTabById(code.id)
                                        }
                                    >
                                        {code.lang}
                                    </div>
                                )}
                            </For>
                        </div>
                        <Show
                            when={
                                props.toolbarPosition === 'nav' &&
                                state.activeTabId
                            }
                        >
                            <div class={state.component.className('__toolbar')}>
                                {/* <s-clipboard-copy></s-clipboard-copy> */}
                            </div>
                        </Show>
                    </header>
                    <div
                        class={state.component.className('__content')}
                        ref={$content}
                    >
                        <Show
                            when={
                                props.toolbarPosition !== 'nav' &&
                                state.activeTabId
                            }
                        >
                            <div class={state.component.className('__toolbar')}>
                                {/* <s-clipboard-copy></s-clipboard-copy> */}
                            </div>
                        </Show>
                        <Show when={state.activeCode}>
                            <pre
                                class={state.component.className('__code')}
                                css={{ lineHeight: 0 }}
                                id={state.activeCode.id}
                            >
                                <code
                                    ref={$code}
                                    class={`language-${state.activeCode.lang} ${state.activeCode.lang} hljs`}
                                ></code>
                            </pre>
                        </Show>
                    </div>
                </div>
            </Show>
        </div>
    );
}

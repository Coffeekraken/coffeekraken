import {
    For,
    onMount,
    onUpdate,
    Show,
    useDefaultProps,
    useRef,
    useStore,
} from '@builder.io/mitosis';

import __css from '%packageRootDir/src/css/s-specs-editor-component.css';
import __SSpecsEditorComponentInterface from '%packageRootDir/src/js/interface/SSpecsEditorComponentInterface';
import __SComponent from '@coffeekraken/s-component';
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name                SSpecsEditor
 * @as                  SSpecsEditor
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSpecsEditorInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-specs-editor
 * @platform            html
 * @status              beta
 *
 * This component allows you to display an editor interface for an SSpecs resulting json
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install          bash
 * npm i @coffeekraken/s-specs-editor-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-specs-editor-component/webcomponent';
 * define();
 *
 * @example         html            Simple example
 * <s-specs-editor></s-specs-editor>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
type Props = {
    id: string;
    specs: Any;
    lnf: string;
    cssDeps: string[];
};

// useMetadata({
//     isAttachedToShadowDom: true,
// });

export const DEFAULT_PROPS = __SSpecsEditorComponentInterface.defaults();
export const metas = {
    interface: __SSpecsEditorComponentInterface,
    preview: `No preview`,
};

export default function SSpecsEditor(props: Props) {
    // default props
    useDefaultProps<Props>(DEFAULT_PROPS);

    // const component = new __SComponent('s-code-example');
    const $container = useRef<HTMLElement>(null);

    // state
    const state = useStore({
        _status: 'idle',
        _id: null,
        _specs: {},
        _specArray: [],
        _propsValues: {},
        _component: null,
        mount() {
            try {
                state._component.injectStyleInShadowRoot(
                    [__css, ...(props.cssDeps ?? [])],
                    $container,
                );
            } catch (e) {}

            // restore the props values
            state._propsValues = state._component.restoreState() ?? {};

            // cast specs
            state._specs = JSON.parse(props.specs);

            Object.keys(state._specs.props).forEach((key) => {
                state._specArray.push({
                    id: key,
                    ...state._specs.props[key],
                    value:
                        state._propsValues[key] ??
                        state._specs.props[key].value ??
                        state._specs.props[key].default,
                });
            });

            setTimeout(() => {
                const initialSpecsJson = {};
                state._specArray.forEach((prop) => {
                    initialSpecsJson[prop.id] = prop.value;
                });

                $container.dispatchEvent(
                    new CustomEvent('s-specs-editor.change', {
                        bubbles: true,
                        composed: true,
                        detail: initialSpecsJson,
                    }),
                );
            });
        },
        update(event, prop) {
            // update the property value
            if (event.target.type === 'checkbox') {
                prop.value = event.target.checked;
            } else {
                prop.value = event.target.value;
            }

            // update the prop value if different than the default
            if (prop.value !== prop.default) {
                state._propsValues[prop.id] = prop.value;
            } else {
                delete state._propsValues[prop.id];
            }

            // dispatch an event
            $container.dispatchEvent(
                new CustomEvent('s-specs-editor.change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        [prop.id]: prop.value,
                    },
                }),
            );

            // save the props values
            state._component.saveState(state._propsValues);
        },
    });

    onUpdate(() => {
        // checkbox
        Array.from(
            $container.querySelectorAll('input[type="checkbox"'),
        ).forEach(($checkbox) => {
            if ($checkbox._inited) {
                return;
            }
            $checkbox._inited = true;
            const _p = JSON.parse($checkbox.getAttribute('prop'));
            if (_p.value) {
                $checkbox.setAttribute('checked', 'true');
            } else {
                $checkbox.removeAttribute('checked');
            }
        });

        // select
        Array.from($container.querySelectorAll('select')).forEach(($select) => {
            if ($select._inited) {
                return;
            }
            $select._inited = true;
            const _p = JSON.parse($select.getAttribute('prop'));
            _p.options.forEach((opt) => {
                const $option = document.createElement('option');
                $option.setAttribute('value', opt.value);
                if (_p.value === opt.value) {
                    $option.setAttribute('selected', true);
                }
                $option.innerHTML = opt.name;
                $select.appendChild($option);
            });
        });
    });

    // when component is mounting
    onMount(() => {
        __SSpecsEditorComponentInterface;
        state._component = new __SComponent('s-specs-editor', {
            id: props.id,
            bare: false,
        });
        state._id = props.id ?? `s-specs-editor-${__uniqid()}`;
        state.mount();
        state._status = 'mounted';
    });

    // component template
    return (
        <Show when={state._specArray.length}>
            <div
                id={state._id}
                ref={$container}
                class={state._component?.className('', null, 's-bare')}
                status={state._status}
                lnf={props.lnf ?? 'default'}
                {...{}}
            >
                <For each={state._specArray}>
                    {(v, index) => (
                        <div
                            prop={v.id}
                            class={state._component.className('__prop')}
                        >
                            <Show when={v.type.toLowerCase() === 'text'}>
                                <div
                                    class={state._component.className(
                                        '__prop--text',
                                    )}
                                >
                                    <label
                                        class={state._component.className(
                                            '__label',
                                            's-label s-label--block',
                                        )}
                                    >
                                        <input
                                            onChange={(e) => state.update(e, v)}
                                            type="text"
                                            name={v.id}
                                            class={state._component.className(
                                                '__input',
                                                's-input',
                                            )}
                                            placeholder={
                                                v.default ?? v.title ?? v.id
                                            }
                                            value={v.value}
                                        />
                                        <span>
                                            <Show when={v.description}>
                                                <span class="s-tooltip-container">
                                                    <i class="fa-solid fa-circle-question"></i>
                                                    <div class="s-tooltip s-tooltip--right">
                                                        {v.description}
                                                    </div>
                                                </span>
                                            </Show>
                                            {v.title ?? v.id}
                                        </span>
                                    </label>
                                </div>
                            </Show>

                            <Show when={v.type.toLowerCase() === 'select'}>
                                <div
                                    class={state._component.className(
                                        '__prop--select',
                                    )}
                                >
                                    <label
                                        class={state._component.className(
                                            '__label',
                                            's-label s-label--block',
                                        )}
                                    >
                                        <select
                                            onChange={(e) => state.update(e, v)}
                                            name={v.id}
                                            class={state._component.className(
                                                '__select',
                                                's-select',
                                            )}
                                            placeholder={
                                                v.default ?? v.title ?? v.id
                                            }
                                            prop={JSON.stringify(v)}
                                        ></select>
                                        <span>
                                            <Show when={v.description}>
                                                <span class="s-tooltip-container">
                                                    <i class="fa-solid fa-circle-question"></i>
                                                    <div class="s-tooltip s-tooltip--right">
                                                        {v.description}
                                                    </div>
                                                </span>
                                            </Show>
                                            {v.title ?? v.id}
                                        </span>
                                    </label>
                                </div>
                            </Show>

                            <Show when={v.type.toLowerCase() === 'checkbox'}>
                                <div
                                    class={`${state._component.className(
                                        '__prop--checkbox',
                                    )}`}
                                >
                                    <label
                                        class={state._component.className(
                                            '__label',
                                            's-label',
                                        )}
                                    >
                                        <input
                                            onChange={(e) => state.update(e, v)}
                                            type="checkbox"
                                            name={v.id}
                                            class={state._component.className(
                                                '__checkbox',
                                                's-switch',
                                            )}
                                            prop={JSON.stringify(v)}
                                        />
                                        <span>
                                            <Show when={v.description}>
                                                <span class="s-tooltip-container">
                                                    <i class="fa-solid fa-circle-question"></i>
                                                    <div class="s-tooltip s-tooltip--right">
                                                        {v.description}
                                                    </div>
                                                </span>
                                            </Show>
                                            {v.title ?? v.id}
                                        </span>
                                    </label>
                                </div>
                            </Show>
                        </div>
                    )}
                </For>
            </div>
        </Show>
    );
}

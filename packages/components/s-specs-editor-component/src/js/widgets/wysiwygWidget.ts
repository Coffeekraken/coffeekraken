import { html } from 'lit';

import __SFrontspec from '@coffeekraken/s-frontspec';
import __STheme from '@coffeekraken/s-theme';

import type { ISWysiwygData } from '@specimen/types';

import {
    __htmlTagToHtmlClassMap,
    __querySelectorLive,
} from '@coffeekraken/sugar/dom';

import __EditorJS from '@editorjs/editorjs';

export default class SSpecsEditorComponentWysiwygWidget {
    _error;
    _warning;
    _component;
    _propObj;
    _path;

    _editorJs;
    _frontspec;

    static isActive() {
        return true;
    }

    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;

        __querySelectorLive('.ce-block__content', ($elm) => {
            $elm.classList.add('s-rhythm', 's-rhythm--vertical');
        });

        __querySelectorLive('.ce-block__content textarea', ($textarea) => {
            $textarea.addEventListener('keyup', (e) => {});
        });
    }

    async firstUpdated() {
        const tools = {};

        if (this._propObj.frontspec) {
            this._frontspec = new __SFrontspec();

            for (let [typo, typoObj] of Object.entries(
                this._frontspec.get('typo') ?? {},
            )) {
                tools[typo] = {
                    inlineToolbar: true,
                    class: this._createEditorJsBlockClass(typo, typoObj),
                };
            }
        }

        this._editorJs = new __EditorJS({
            holder: `editor-js-${this._path.join('-')}`,
            onChange: async (api, event) => {
                const result = await this._editorJs.save();
                _console.log('SAVED', result);
                // const result = await api.saver.save();
                // _console.log('SAVC', result);
            },
            tools,
        });
        await this._editorJs.isReady;
    }

    _createEditorJsBlockClass(typo: string, typoObj: any): class {
        if (typoObj.style?.display === 'block') {
            return class EditorJsBlockClass {
                static get isInline() {
                    return false;
                }

                static get toolbox() {
                    return {
                        title: typo,
                        //   icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
                    };
                }

                _isTypoTag = false;
                _tag = 'SPAN';

                state = false;
                api;

                constructor({ api }) {
                    this.api = api;
                    this._isTypoTag =
                        __htmlTagToHtmlClassMap[typo] !== undefined;
                    this._tag = this._isTypoTag
                        ? typo.toUpperCase()
                        : this._tag;
                }

                render() {
                    const $div = document.createElement(this._tag);
                    $div.contentEditable = true;
                    $div.innerHTML = '';
                    $div.setAttribute('wysiwyg-typo', typo);
                    $div.classList.add('s-typo', `s-typo--${typo}`);
                    return $div;

                    // return this.wrapper;

                    // const $input = document.createElement('input');
                    // $input.classList.add(`s-typo`, `s-typo--${typo}`, typo);
                    // // __autoResize($input);
                    // return $input;
                }

                save(blockContent) {
                    Array.from(blockContent.children).forEach(($child) => {
                        _console.log('Chilf', $child);
                    });

                    return {
                        value: blockContent,
                    };
                }
            };
        } else {
            return class EditorJsInlineClass {
                static get isInline() {
                    return true;
                }

                _isTypoTag = false;
                _tag = 'SPAN';

                state = false;
                api;

                constructor({ api }) {
                    this.api = api;
                    this._isTypoTag =
                        __htmlTagToHtmlClassMap[typo] !== undefined;
                    this._tag = this._isTypoTag
                        ? typo.toUpperCase()
                        : this._tag;
                }

                // save(blockContent) {
                //     _console.log('COntent', blockContent);
                //     return {
                //         value: blockContent.value,
                //     };
                // }

                render() {
                    const $button = document.createElement('button');
                    $button.type = 'button';

                    if (typoObj.type === 'color') {
                        $button.classList.add('_color');
                        $button.textContent = 'Ab';
                        $button.classList.add('s-typo', `s-typo--${typo}`);
                        $button.style.setProperty(
                            '--s-wysiwyg-color',
                            typoObj.style.color,
                        );
                        $button.style.fontWeight = 'bold';
                        // $button.style.color =
                        //     typoObj.style.backgroundImage ??
                        //     typoObj.style.color;
                    } else {
                        const label = typoObj.button?.label ?? typo;
                        if (label.match(/^\<[a-zA-Z0-9]/)) {
                            $button.innerHTML = label;
                        } else {
                            $button.textContent = label;
                        }
                        const style = __STheme.jsObjectToCssProperties(
                            typoObj.button?.style ?? {},
                        );
                        $button.style = style;
                    }

                    return $button;
                }

                surround(range) {
                    if (!range) {
                        return;
                    }

                    let termWrapper = this.api.selection.findParentTag(
                        this._tag,
                    );

                    _console.log('Wrapper', termWrapper);

                    if (termWrapper) {
                        this.unwrap(termWrapper);
                    } else {
                        this.wrap(range);
                    }
                }

                wrap(range) {
                    let span = document.createElement(this._tag);
                    span.classList.add('s-typo', `s-typo--${typo}`);
                    span.appendChild(range.extractContents());
                    range.insertNode(span);
                    this.api.selection.expandToTag(span);
                }

                unwrap(termWrapper) {
                    this.api.selection.expandToTag(termWrapper);

                    let sel = window.getSelection();
                    let range = sel.getRangeAt(0);

                    let unwrappedContent = range.extractContents();

                    termWrapper.parentNode.removeChild(termWrapper);

                    range.insertNode(unwrappedContent);

                    sel.removeAllRanges();
                    sel.addRange(range);
                }

                /**
                 * Check and change Term's state for current selection
                 */
                checkState() {
                    _console.log('Check', typo);

                    const termTag = this.api.selection.findParentTag(this._tag);

                    this.state = !!termTag;

                    // this.button.classList.toggle(this.iconClasses.active, !!termTag);
                }
            };
        }
    }

    render({ propObj, values, path }) {
        if (!values) {
            values = <ISWysiwygData>{
                value: propObj.default,
            };
        }

        return {
            error: this._error,
            warning: this._warning,
            html: html`
                <div class="${this._component.utils.cls('_wysiwyg-widget')}">
                    <label
                        class="${this._component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        ${this._component.renderLabel(propObj, path)}
                    </label>
                    <div class="_editor" id="editor-js-${path.join('-')}"></div>
                </div>
            `,
        };
    }
}

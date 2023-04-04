// @ts-nocheck

import __SLitComponent, {
    ISLitComponentDefaultProps,
} from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SWysiwygComponentInterface from './interface/SWysiwygComponentInterface';

import type { ISWysiwygData } from '@specimen/types';

import { __i18n } from '@coffeekraken/s-i18n';

import __SFrontspec from '@coffeekraken/s-frontspec';
import __STheme from '@coffeekraken/s-theme';

import { __querySelectorLive } from '@coffeekraken/sugar/dom';

import { __htmlTagToHtmlClassMap } from '@coffeekraken/sugar/dom';

import __EditorJS from '@editorjs/editorjs';

// @ts-ignore
import __css from '../../../../src/css/s-wysiwyg-component.css'; // relative to /dist/pkg/esm/js

/**
 * @name                SWysiwygComponent
 * @as                  Wysiwyg
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SWysiwygComponentInterface.ts
 * @menu                Styleguide / Forms              /styleguide/form/s-wysiwyg
 * @platform            html
 * @status              beta
 *
 * Create a nice wysiwyg component that let you specify the tools/styles you want as well as getting back a well structured AST like json of your content. This make use of the AMAZING editorjs library
 *
 * @feature         Support for sugar theming system when activate default style
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           s-wysiwyg.change            Dispatched when the editor has had a change
 *
 * @import          import { define as __SWysiwygComponentDefine } from '@coffeekraken/s-range-component';
 *
 * @snippet         __SWysiwygComponentDefine($1)
 *
 * @install          bash
 * npm i @coffeekraken/s-range-component
 *
 * @install         js
 * import { define as __SWysiwygComponentDefine } from '@coffeekraken/s-wysiwyg-component';
 * __SWysiwygComponentDefine();
 *
 * @example         html        Simple editor
 * <s-wysiwyg></s-wysiwyg>
 *
 * @see             https://editorjs.io/
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISWysiwygComponentProps extends ISLitComponentDefaultProps {
    frontspec: boolean;
}

export default class SWysiwygComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SWysiwygComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    _editorJs;
    _frontspec;
    _$editor;
    _$add;

    constructor() {
        super(
            __deepMerge({
                name: 's-wysiwyg',
                interface: __SWysiwygComponentInterface,
            }),
        );

        __querySelectorLive(
            '.ce-block__content',
            ($elm) => {
                $elm.classList.add('s-rhythm', 's-rhythm--vertical');
            },
            {
                rootNode: this,
            },
        );
    }
    async firstUpdated() {
        const tools = {};

        let defaultBlock;

        if (this.props.frontspec) {
            this._frontspec = new __SFrontspec();

            for (let [typo, typoObj] of Object.entries(
                this._frontspec.get('typo') ?? {},
            )) {
                tools[typo] = {
                    inlineToolbar: true,
                    class: this._createEditorJsBlockClass(typo, typoObj),
                };
                // default tool
                if (typoObj.default) {
                    defaultBlock = typo;
                }
            }
        }

        this._$editor = this.querySelector(`.${this.utils.cls('_editor')}`);

        this._editorJs = new __EditorJS({
            holder: this._$editor,
            onChange: async (api, event) => {
                const result = await this._editorJs.save();

                const finalData = {
                    type: 'root',
                    nodes: [],
                };

                result.blocks.forEach((block) => {
                    finalData.nodes.push(block.data.data);
                });

                // dispatch the change event
                this.utils.dispatchEvent('change', {
                    bubbles: true,
                    detail: <ISWysiwygData>{
                        value: finalData,
                    },
                });
            },
            // @ts-ignore
            logLevel: 'ERROR',
            tools,
            defaultBlock,
        });
        await this._editorJs.isReady;

        this._$add = this._$editor.querySelector('.ce-toolbar__plus');
    }

    _createEditorJsBlockClass(typo: string, typoObj: any): class {
        const _this = this;

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
                    // @ts-ignore
                    $div.contentEditable = true;
                    $div.innerHTML = '';
                    $div.setAttribute('wysiwyg-typo', typo);
                    $div.setAttribute(
                        'placeholder',
                        __i18n('Enter / to start...', {
                            id: 's-wysiwyg.start',
                        }),
                    );

                    $div.addEventListener('keyup', (e) => {
                        if (e.target.innerText.trim() === '/') {
                            e.target.innerText = '';
                            _this._$add.click();
                        } else {
                            const $active = document.activeElement;
                            $active?.blur?.();
                            $active?.focus?.();
                        }
                    });

                    $div.classList.add('s-typo', `s-typo--${typo}`);
                    return $div;
                }

                save(blockContent) {
                    const data = {
                        type: typo,
                        block: true,
                        nodes: [],
                    };

                    let currentData = data;

                    function traverseTree($from) {
                        Array.from($from.childNodes).forEach(($node) => {
                            if ($node.nodeType === Node.TEXT_NODE) {
                                currentData.nodes.push({
                                    type: 'text',
                                    text: $node.data,
                                });
                            } else if ($node.tagName === 'BR') {
                                currentData.nodes.push({
                                    type: 'br',
                                });
                            } else {
                                const newNode = {
                                    typo: $node.getAttribute('wysiwyg-type'),
                                    nodes: [],
                                };

                                const oldData = currentData;
                                currentData.nodes.push(newNode);
                                currentData = newNode;
                                traverseTree($node);
                                currentData = oldData;
                            }
                        });
                    }

                    traverseTree(blockContent);

                    return {
                        data,
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
                _selection;
                _$button;

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
                    const $button = document.createElement('button');
                    $button.type = 'button';
                    this._$button = $button;

                    if (typoObj.type === 'color') {
                        $button.classList.add('_color');
                        $button.textContent = 'Ab';
                        $button.classList.add('s-typo', `s-typo--${typo}`);
                        $button.style.setProperty(
                            '--s-wysiwyg-color',
                            typoObj.style.color,
                        );
                        $button.style.fontWeight = 'bold';
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
                    const selectedText = range.extractContents();

                    const text = this._selection?.anchorNode,
                        $encloser =
                            text instanceof Element ? text : text.parentElement;

                    const $wrapper = $encloser.closest(
                        `[wysiwyg-type="${typo}"]`,
                    );

                    if ($wrapper) {
                        $wrapper.parentNode.removeChild($wrapper);
                        range.insertNode(selectedText);
                    } else {
                        const mark = document.createElement(this._tag);
                        mark.classList.add('s-typo', `s-typo--${typo}`);
                        mark.setAttribute('wysiwyg-type', typo);

                        mark.appendChild(selectedText);
                        range.insertNode(mark);
                        this.api.selection.expandToTag(mark);
                    }
                }

                checkState(selection) {
                    this._selection = selection;
                    const text = selection.anchorNode;
                    if (!text) {
                        return;
                    }

                    const $encloser =
                        text instanceof Element ? text : text.parentElement;
                    this.state = !!$encloser.closest(
                        `[wysiwyg-type="${typo}"]`,
                    );

                    if (this.state) {
                        this._$button?.classList.add('active');
                    } else {
                        this._$button?.classList.remove('active');
                    }
                }
            };
        }
    }

    render() {
        return html` <div class="${this.utils.cls('_editor')}"></div> `;
    }
}

/**
 * @name            webcomponent
 * @type            Function
 *
 * This function allows you to define (register) your webcomponent with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your webcomponent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export function define(
    props: Partial<ISWysiwygComponentProps> = {},
    tagName = 's-wysiwyg',
) {
    __SLitComponent.define(tagName, SWysiwygComponent, props);
}

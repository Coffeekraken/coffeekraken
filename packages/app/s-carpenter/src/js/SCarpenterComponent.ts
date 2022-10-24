import __SLitComponent from '@coffeekraken/s-lit-component';

import { define as __sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';

import { __querySelectorLive } from '@coffeekraken/sugar/dom';

import __SSugarConfig from '@coffeekraken/s-sugar-config';

import __define from './define';

// @ts-ignore
import __css from '../../../../src/css/s-carpenter-component.css'; // relative to /dist/pkg/esm/js

// @ts-ignore

export interface ISCarpenterComponentProps {
    source: string;
}

// define components
__sSpecsEditorComponentDefine();

/**
 * @name                SCarpenterComponent
 * @as                  Carpenter
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCarpenterComponentInterface.ts
 * @platform            html
 * @status              beta
 *
 * This component represent a carpenter UI that display some components/section/etc... and let you change their properties
 * on the fly to see how it behave
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-carpenter
 *
 * @install           js
 * import { define } from '@coffeekraken/s-carpenter';
 * define();
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SCarpenterComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SCarpenterComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    state = {
        data: null,
        currentSpecs: null,
        hoveredDotpath: null,
        $currentElement: null,
    };

    _$toolbar;

    constructor() {
        super(
            __deepMerge({
                name: 's-carpenter',
                interface: __SCarpenterComponentInterface,
                carpenter: __SSugarConfig.get('carpenter'),
            }),
        );
    }

    async mount() {
        // get the data
        this.state.data = await this._getData(this.props.source);

        // create the toolbar element
        this._createToolbarElement();

        // watch for hover on carpenter elements
        __querySelectorLive(`[s-carpenter]`, ($elm) => {
            $elm.addEventListener('pointerover', (e) => {
                if (this._$toolbar?.parent) {
                    return;
                }
                this._activateElement(e.currentTarget);

                // set the hovered dotpath
                this.state.hoveredDotpath = $elm.getAttribute('s-carpenter');
            });
        });

        // listen spec editor update
        this.addEventListener('s-specs-editor.update', (e) => {
            console.log('SPecs up', e.detail);
        });

        // listen on click
        this._$toolbar.addEventListener('pointerup', (e) => {
            // try to get the spec from the data fetched at start
            let potentialDotpath = this.state.hoveredDotpath;
            if (this.state.data.specsMap[potentialDotpath]) {
                this.state.currentSpecs =
                    this.state.data.specsMap[potentialDotpath];
            } else {
                potentialDotpath = `${potentialDotpath}.${
                    potentialDotpath.split('.').slice(-1)[0]
                }`;
                if (this.state.data.specsMap[potentialDotpath]) {
                    this.state.currentSpecs =
                        this.state.data.specsMap[potentialDotpath];
                }
            }

            if (!this.state.currentSpecs) {
                return;
            }

            // open the editor
            this._openEditor();

            // get the current values from the component directly in the HTML
            const $dataElements = this.state.$currentElement.querySelectorAll(
                `[s-carpenter-editable]`,
            );

            // update the UI
            this.requestUpdate();
        });
    }

    /**
     * Get the current component data
     */
    _getCurrentData() {}

    /**
     * open the editor
     */
    _openEditor() {
        document.body.classList.add('s-carpenter--editor');
    }

    /**
     * close the editor
     */
    _closeEditor() {
        // reset the current specs
        this.state.currentSpecs = null;

        // reset the current element
        this.state.$currentElement = null;
    }

    /**
     * Create the toolbar element
     */
    _createToolbarElement(): HTMLElement {
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = document.createElement('div');
        $toolbar.classList.add('s-carpenter-toolbar');
        this._$toolbar = $toolbar;

        return $toolbar;
    }

    /**
     * Add the "editor" micro menu to the element
     */
    _activateElement($elm: HTMLElement): void {
        const $toolbar = this._createToolbarElement();
        const targetRect = $elm.getBoundingClientRect();
        $toolbar.style.top = `${targetRect.top + window.scrollY}px`;
        $toolbar.style.left = `${
            targetRect.left + targetRect.width + window.scrollX
        }px`;

        // set the current element
        this.state.$currentElement = $elm;

        // get the nested components
        const $nestedElements = $elm.querySelectorAll('[s-carpenter]');
        if ($nestedElements) {
            this.state.$nestedElements = Array.from($nestedElements);
            console.log('state', this.state);
        }

        document.body.appendChild($toolbar);
    }

    /**
     * Grab the data depending on the passed source.
     * Can be a url where to fetch the data or an id pointing to an HTMLTemplateElement that
     * store the JSON data
     */
    async _getData(source: string): any {
        let data;

        try {
            if (source.startsWith('/') || source.match(/^http?s\:\/\//)) {
                data = await fetch(source).then((response) => response.json());
            } else {
                const $template = document.querySelectorAll(
                    `template#${source}`,
                );
                if ($template) {
                    data = JSON.parse($template.content.textContent);
                }
            }
        } catch (e) {}

        // warn if no data
        if (!data) {
            throw new Error(
                `[SCarpenterComponent] The passed source "${source}" does not provide any valid data...`,
            );
        }

        return data;
    }

    render() {
        if (!this.state.data) {
            return '';
        }

        return html`
            <div class="${this.componentUtils.className('', null, 's-bare')}">
                <nav class="__navigation">
                    <ul class="s-fs-tree">
                        ${Object.keys(this.state.data.specsBySources).map(
                            (sourceId) => {
                                const sourceObj =
                                    this.state.data.specsBySources[sourceId];
                                if (typeof sourceObj === 'function') {
                                    return '';
                                }
                                return html`
                                    <li class="active">
                                        <div>
                                            <i class="fa-regular fa-folder"></i>
                                            <span tabindex="0"
                                                >${sourceObj.title ??
                                                sourceId}</span
                                            >
                                        </div>
                                        <ul>
                                            ${Object.keys(sourceObj.specs).map(
                                                (dotpath) => {
                                                    const specObj =
                                                        sourceObj.specs[
                                                            dotpath
                                                        ];
                                                    return html`
                                                        <li class="active">
                                                            <div>
                                                                <i
                                                                    class="fa-regular fa-file"
                                                                ></i>
                                                                <a tabindex="0"
                                                                    >${specObj.title ??
                                                                    specObj.name}</a
                                                                >
                                                            </div>
                                                        </li>
                                                    `;
                                                },
                                            )}
                                        </ul>
                                    </li>
                                `;
                            },
                        )}
                    </ul>
                </nav>

                <nav
                    class="__editor ${this.state.currentSpecs ? 'active' : ''}"
                >
                    ${this.state.currentSpecs
                        ? html`
                              <s-specs-editor
                                  specs="${JSON.stringify(
                                      this.state.currentSpecs,
                                  )}"
                              >
                              </s-specs-editor>
                          `
                        : ''}
                </nav>
            </div>
        `;
    }
}

export { __define as define };

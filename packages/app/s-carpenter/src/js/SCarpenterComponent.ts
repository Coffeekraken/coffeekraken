import __SLitComponent from '@coffeekraken/s-lit-component';

import { define as __sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';

import { __wait } from '@coffeekraken/sugar/datetime';
import { __injectIframeContent, __isInIframe } from '@coffeekraken/sugar/dom';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';

import { __querySelectorLive } from '@coffeekraken/sugar/dom';

import __SSugarConfig from '@coffeekraken/s-sugar-config';

import __define from './define';

import __ajaxAdapter from './adapters/ajaxAdapter';

// @ts-ignore
import __css from '../../../../src/css/s-carpenter-component.css'; // relative to /dist/pkg/esm/js

export interface ISCarpenterComponentIconsProp {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
    folderOpen: string;
    folderClose: string;
}

export interface ISCarpenterComponentProps {
    specs: string;
    adapter: 'ajax';
    nav: boolean;
    pagesLink: string;
    iframe: boolean;
    logo: string;
    icons: ISCarpenterComponentIconsProp;
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
 * @todo               documentation
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

export interface ISCarpenterComponentAdapterParams {
    $elm?: HTMLElement;
    dotpath?: string;
    props: specs;
    component: SCarpenterComponent;
}

export interface ISCarpenterComponentAdapter {
    setProps(params: ISCarpenterComponentAdapterParams): Promise<HTMLElement>;
    change(params: ISCarpenterComponentAdapterParams): Promise<HTMLElement>;
}

export default class SCarpenterComponent extends __SLitComponent {
    static create(attributes: any = {}, to: HTMLElement = document.body) {
        if (__isInIframe() || document.querySelector('s-carpenter')) {
            return;
        }

        const domParser = new DOMParser(),
            $carpenter = domParser.parseFromString(
                `<s-carpenter ${Object.keys(attributes).map((attr) => {
                    const value = attributes[attr];
                    return ` ${attr}="${value}" `;
                })}></s-carpenter>`,
                'text/html',
            );

        to.appendChild($carpenter.body.children[0]);
    }

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

    static _registeredAdapters: Record<string, ISCarpenterComponentAdapter> = {
        ajax: __ajaxAdapter,
    };
    static registerAdapter(
        id: string,
        adapter: ISCarpenterComponentAdapter,
    ): void {
        if (SCarpenterComponent._registeredAdapters[id]) {
            throw new Error(
                `[SCarpenterComponent] Sorry but the "${id}" adapter already exists...`,
            );
        }
        SCarpenterComponent._registeredAdapters[id] = adapter;
    }

    static state = {
        activeNavigationFolders: [],
        hoveredDotpath: null,
        $currentElement: null,
        $hoveredElement: null,
        activeMedia: null,
    };

    currentSpecs = null;

    _values = {};

    _data;
    _$document;
    _$iframe;
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
        // do not mount if is in an iframe
        if (__isInIframe()) {
            return;
        }

        // get the data
        this._data = await this._getData(this.props.specs);
        if (!this._data) {
            throw new Error(
                `[SCarpenter] Sorry but no valid specs have been specified...`,
            );
        }

        // active the default media if not set
        if (!this.state.activeMedia) {
            this.state.activeMedia = this._data.frontspec.media.defaultMedia;
        }

        // check the specified adapter
        if (!SCarpenterComponent._registeredAdapters[this.props.adapter]) {
            throw new Error(
                `[SCarpenterComponent] Sorry but the specified "${this.props.adapter}" is not registered...`,
            );
        }

        // set the document in which to search for items (s-specs) etc...
        this._$document = document;

        // create the iframe if needed
        if (this.props.iframe) {
            if (typeof this.props.iframe === 'string') {
                this._$iframe = document.querySelector(this.props.iframe);
                if (!this._$iframe) {
                    throw new Error(
                        `[SCarpenterComponent] You've set an iframe selector to be used but it resolves to nothing...`,
                    );
                }
            } else {
                this._$iframe = document.createElement('iframe');
            }

            // inject the current page content inside the iframe
            const iframeHtml = document.documentElement.outerHTML
                .replace(/<s-carpenter/gm, '<s-nothing')
                .replace(/<\/s-carpenter>/gm, '</s-nothing>');

            // add the correct class on the iframe
            this._$iframe.classList.add(this.cu.cls('__iframe'));

            // make sure we don't have any src on the iframe
            this._$iframe.setAttribute('src', 'about:blank');

            // manage to add the iframe inside the body
            // alongside with the s-carpenter component
            this.remove();
            document.body.innerHTML = '';
            document.body.appendChild(this._$iframe);
            document.body.appendChild(this);

            // wait for the iframe to be ready
            // @TODO        check for better solution
            await __wait(500);

            // inject the iframe content
            __injectIframeContent(this._$iframe, iframeHtml);

            // set the document to search in
            // which will be the iframe document
            this._$document = this._$iframe.contentWindow.document;

            // listen for escape in the iframe
            this._$document.addEventListener('keyup', (e) => {
                if (e.keyCode == 27) {
                    this._closeEditor();
                }
            });

            // add the "in-iframe" class
            this._$document.body.classList.add(this.cu.cls('-in-iframe'));
        }

        // get the first s-spec element that we can find
        // or get the first item in the body
        // and set it to the state.$currentElement to be sure we have something to
        // work with in the adapter, etc...
        let $firstSpecsElement = this._$document.querySelector('[s-specs]');
        if (!$firstSpecsElement) {
            $firstSpecsElement = this._$document.body.children[0];
        }
        this.state.$currentElement = $firstSpecsElement;

        // listen for escape key press to close editor
        __hotkey('escape').on('press', () => {
            this._closeEditor();
        });

        // create the toolbar element
        this._getToolbarElement();

        // watch for hover on carpenter elements
        __querySelectorLive(
            `[s-specs]`,
            ($elm) => {
                $elm.addEventListener('pointerover', (e) => {
                    // position toolbar
                    this._setToolbarPosition(e.currentTarget);

                    // do nothing more if already activated
                    if (
                        e.currentTarget.id &&
                        e.currentTarget.id === this.state.$currentElement?.id
                    ) {
                        return;
                    }
                    if (this._$toolbar?.parent) {
                        return;
                    }

                    // activate the element if needed
                    this._positionToolbarOnElement(e.currentTarget);

                    // set the "pre" activate element
                    this.state.hoveredElement = $elm;

                    // set the hovered dotpath
                    this.state.hoveredDotpath = $elm.getAttribute('s-specs');
                });
            },
            {
                rootNode: this._$document.body,
            },
        );

        // listen spec editor update
        this.addEventListener('s-specs-editor.update', async (e) => {
            // make use of the specified adapter to update the component/section/etc...
            const adapterResult = await SCarpenterComponent._registeredAdapters[
                this.props.adapter
            ].setProps({
                $elm: this.state.$currentElement,
                props: e.detail.values ?? {},
                component: this,
            });

            // save current values in "_values" stack
            this._values[this.state.$currentElement.id] = e.detail.values ?? {};

            if (adapterResult) {
                this.state.$currentElement = adapterResult;
            }
        });

        // listen for media change in the specs editor
        this.addEventListener('s-specs-editor.changeMedia', (e) => {
            // change the media internaly
            this._activateMedia(e.detail);
        });

        // listen on click
        this._$toolbar.addEventListener('pointerup', async (e) => {
            // do not activate 2 times the same element
            if (
                this.state.$currentElement.id?.trim() &&
                this.state.$currentElement.id === this.state.$hoveredElement.id
            ) {
                this._openEditor();
                return;
            }

            // force reset the specs editor
            this.currentSpecs = null;
            this.requestUpdate();
            await __wait();

            // try to get the spec from the data fetched at start
            let potentialDotpath = this.state.hoveredDotpath;
            if (this._data.specsMap[potentialDotpath]) {
                this.currentSpecs = this._data.specsMap[potentialDotpath];
            } else {
                potentialDotpath = `${potentialDotpath}.${
                    potentialDotpath.split('.').slice(-1)[0]
                }`;
                if (this._data.specsMap[potentialDotpath]) {
                    this.currentSpecs = this._data.specsMap[potentialDotpath];
                }
            }

            if (!this.currentSpecs) {
                return;
            }

            // set the current element
            this._setCurrentElement(this.state.$hoveredElement);

            // open the editor
            this._openEditor();

            // request new UI update
            this.requestUpdate();
        });

        // handle popstate
        window.addEventListener('popstate', (e) => {
            this._changePage(e.state.dotpath, false);
        });
    }

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
        document.body.classList.remove('s-carpenter--editor');
    }

    /**
     * Create the toolbar element
     */
    _getToolbarElement(): HTMLElement {
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = document.createElement('div');
        $toolbar.classList.add('s-carpenter-toolbar');
        this._$toolbar = $toolbar;

        const $i = document.createElement('i');
        $i.classList.add('fa-regular', 'fa-pen-to-square');
        $toolbar.appendChild($i);

        // append toolbar to viewport
        this._$document.body.appendChild($toolbar);

        // return the created toolbar
        return $toolbar;
    }

    /**
     * Activate the element when toolbar has been clicked
     */
    async _setCurrentElement($elm: HTMLElement): void {
        // ensure we have an id
        if (!$elm.id.trim()) {
            $elm.setAttribute('id', __uniqid());
        }

        // do not activate 2 times the same element
        if (this.state.$currentElement.id === $elm.id) {
            return;
        }

        // get values
        const values =
            this._values[$elm.id] ??
            (await SCarpenterComponent._registeredAdapters[
                this.props.adapter
            ].getProps({
                $elm,
                component: this,
            }));

        // save the getted values
        if (values) {
            this.currentSpecs.values = values;
        }

        // set the current element
        this.state.$currentElement = $elm;
    }

    /**
     * Add the "editor" micro menu to the element
     */
    _positionToolbarOnElement($elm: HTMLElement): void {
        if ($elm.id && this.state.$currentElement?.id === $elm.id) {
            return;
        }

        // set the hovered element
        this.state.$hoveredElement = $elm;

        // position toolbar
        this._setToolbarPosition($elm);
    }

    /**
     * Set the toolbar position
     */
    _setToolbarPosition($from) {
        const $toolbar = this._getToolbarElement();
        const targetRect = $from.getBoundingClientRect();
        $toolbar.style.top = `${targetRect.top + window.scrollY}px`;
        $toolbar.style.left = `${
            targetRect.left + targetRect.width + window.scrollX
        }px`;
    }

    /**
     * Activate a particular media query
     */
    _activateMedia(media) {
        this.state.activeMedia = media;
    }

    /**
     * Change page with the dotpath
     */
    async _changePage(dotpath: string, pushState: boolean = true): void {
        const adapterResult = await SCarpenterComponent._registeredAdapters[
            this.props.adapter
        ].change({
            dotpath,
            $elm: this.props.specs
                ? this._$document.body.children[0]
                : this.state.$currentElement,
            props: this.props,
            component: this,
        });
        if (adapterResult) {
            this.state.$currentElement = adapterResult;
        }

        // save arrival state
        if (pushState) {
            window.history.pushState(
                {
                    dotpath,
                },
                document.title,
                this.props.pagesLink.replace('%dotpath', dotpath),
            );
        }

        // update the currentSpecs
        const newSpecs = this._data.specsMap[dotpath];
        if (newSpecs !== this.currentSpecs) {
            this.currentSpecs = null;
            this.requestUpdate();
            await __wait();
            this.currentSpecs = newSpecs;
            this.requestUpdate();
        }
    }

    _toggleNavigationFolder(folderId) {
        if (this.state.activeNavigationFolders.includes(folderId)) {
            this.state.activeNavigationFolders.splice(
                this.state.activeNavigationFolders.indexOf(folderId),
                1,
            );
        } else {
            this.state.activeNavigationFolders.push(folderId);
        }
        this.requestUpdate();
    }

    /**
     * Grab the data depending on the passed source.
     * Can be a url where to fetch the data or an id pointing to an HTMLTemplateElement that
     * store the JSON data
     */
    async _getData(source: string): any {
        let data;

        try {
            if (source.startsWith('{')) {
                data = JSON.parse(source);
            } else if (
                source.startsWith('/') ||
                source.match(/^https?\:\/\//)
            ) {
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
        if (!this._data) {
            return '';
        }

        return html`
            <div class="${this.cu.cls('', null, 's-bare')}">
                ${this.props.sidebar
                    ? html`
                          <nav class="${this.cu.cls('__sidebar')}">
                              <div class="${this.cu.cls('__logo')}">
                                  ${unsafeHTML(this.props.logo)}
                              </div>

                              <div class="${this.cu.cls('__navigation')}">
                                  <ul class="s-fs-tree">
                                      ${Object.keys(
                                          this._data.specsBySources,
                                      ).map((sourceId) => {
                                          const sourceObj =
                                              this._data.specsBySources[
                                                  sourceId
                                              ];
                                          if (typeof sourceObj === 'function') {
                                              return '';
                                          }
                                          return html`
                                              <li
                                                  class="${this.state.activeNavigationFolders.includes(
                                                      sourceId,
                                                  )
                                                      ? 'active'
                                                      : ''}"
                                              >
                                                  <div
                                                      @pointerup=${() =>
                                                          this._toggleNavigationFolder(
                                                              sourceId,
                                                          )}
                                                  >
                                                      ${this.state.activeNavigationFolders.includes(
                                                          sourceId,
                                                      )
                                                          ? html`
                                                                ${unsafeHTML(
                                                                    this.props
                                                                        .icons
                                                                        .folderOpen,
                                                                )}
                                                            `
                                                          : html`
                                                                ${unsafeHTML(
                                                                    this.props
                                                                        .icons
                                                                        .folderClose,
                                                                )}
                                                            `}
                                                      <span tabindex="0"
                                                          >${sourceObj.title ??
                                                          sourceId}</span
                                                      >
                                                  </div>
                                                  <ul>
                                                      ${Object.keys(
                                                          sourceObj.specs,
                                                      ).map((dotpath) => {
                                                          const specObj =
                                                              sourceObj.specs[
                                                                  dotpath
                                                              ];
                                                          return html`
                                                              <li
                                                                  class="${document.location.href.includes(
                                                                      specObj
                                                                          .metas
                                                                          .dotpath,
                                                                  )
                                                                      ? 'active'
                                                                      : ''}"
                                                                  tabindex="0"
                                                                  @pointerup=${() =>
                                                                      this._changePage(
                                                                          specObj
                                                                              .metas
                                                                              .dotpath,
                                                                      )}
                                                              >
                                                                  <div>
                                                                      <i
                                                                          class="fa-regular fa-file"
                                                                      ></i>
                                                                      <a
                                                                          >${specObj.title ??
                                                                          specObj.name}</a
                                                                      >
                                                                  </div>
                                                              </li>
                                                          `;
                                                      })}
                                                  </ul>
                                              </li>
                                          `;
                                      })}
                                  </ul>
                              </div>
                          </nav>
                      `
                    : ''}

                <nav class="__editor ${this.currentSpecs ? 'active' : ''}">
                    ${this.currentSpecs
                        ? html`
                              <s-specs-editor
                                  media="${this.state.activeMedia}"
                                  specs="${JSON.stringify(this.currentSpecs)}"
                                  frontspec="${JSON.stringify(
                                      this._data.frontspec ?? {},
                                  )}"
                              >
                              </s-specs-editor>
                          `
                        : ''}
                </nav>

                ${this._data.frontspec?.media?.queries && this.props.iframe
                    ? html`
                          <style>
                              :root {
                                  --s-carpenter-content-width: ${this._data
                                      .frontspec.media.queries[
                                      this.state.activeMedia
                                  ].maxWidth
                                      ? `${
                                            (this._data.frontspec.media.queries[
                                                this.state.activeMedia
                                            ].maxWidth /
                                                100) *
                                            75
                                        }px`
                                      : '100vw'};
                              }
                          </style>
                          <nav class="${this.cu.cls('__media')}">
                              <ul
                                  class="${this.cu.cls(
                                      '__queries',
                                      's-tabs',
                                      's-bare',
                                  )}"
                              >
                                  ${Object.keys(
                                      this._data.frontspec.media.queries,
                                  ).map((query) => {
                                      return html`
                                          <li
                                              @pointerup=${() =>
                                                  this._activateMedia(query)}
                                              class="s-color s-color--accent ${query ===
                                              this.state.activeMedia
                                                  ? 'active'
                                                  : ''} ${this.cu.cls(
                                                  '__query __item',
                                              )}"
                                          >
                                              ${unsafeHTML(
                                                  this.props.specs[query],
                                              )}
                                              ${__upperFirst(query)}
                                          </li>
                                      `;
                                  })}
                              </ul>
                          </nav>
                      `
                    : ''}
            </div>
        `;
    }
}

export { __define as define };

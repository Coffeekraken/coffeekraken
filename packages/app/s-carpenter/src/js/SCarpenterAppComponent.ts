import __SLitComponent from '@coffeekraken/s-lit-component';

import { define as __sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';

import { __wait } from '@coffeekraken/sugar/datetime';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';

import {
    __injectStyle,
    __querySelectorLive,
    __whenIframeReady,
} from '@coffeekraken/sugar/dom';

import __SSugarConfig from '@coffeekraken/s-sugar-config';

import __define from './defineApp';

import { __injectIframeContent } from '@coffeekraken/sugar/dom';
import __ajaxAdapter from './adapters/ajaxAdapter';

// @ts-ignore
// import __css from '../css/index.css';
// import __css from '../../../../src/css/s-carpenter-component.css'; // relative to /dist/pkg/esm/js

export interface ISCarpenterAppComponentIconsProp {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
    folderOpen: string;
    folderClose: string;
}

export interface ISCarpenterAèèComponentProps {
    window: Window;
    specs: string;
    adapter: 'ajax';
    viewportElm: HTMLElement;
    nav: boolean;
    pagesLink: string;
    iframe: boolean;
    logo: string;
    icons: ISCarpenterAppComponentIconsProp;
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
 * @snippet             __defineSCarpenterComponent()
 *
 * @example           js
 * import { define as __defineSCarpenterComponent } from '@coffeekraken/s-carpenter';
 * __defineSCarpenterComponent();
 *
 * @install           js
 * import { define as __defineSCarpenterComponent } from '@coffeekraken/s-carpenter';
 * __defineSCarpenterComponent();
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
        return css``;
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
    _websiteWindow;
    _$websiteDocument; // store the document
    _$websiteIframe; // store the website iframe if the "media" method stored in the frontspec.json file is not set to "container". In this case, we must wrap the website into a proper iframe for the @media queries to work
    _$websiteViewport; // store the viewport element in the website that will be used to resize it with media

    _$editor; // store the actual editor "panel"
    _$editorIframe; // store the iframe in which the carpenter is inited if is one
    _$toolbar; // store the toolbar displayed on the website elements when hovering them

    _rootWindow;
    _$rootDocument;

    constructor() {
        super(
            __deepMerge({
                name: 's-carpenter-app',
                interface: __SCarpenterComponentInterface,
                carpenter: __SSugarConfig.get('carpenter'),
            }),
        );
        this._$editorIframe = window.top?.document?.querySelector(
            'iframe.s-carpenter_editor-iframe',
        );

        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.href = '/dist/css/carpenter.css';
        document.body.appendChild($style);
    }

    async mount() {
        // get the data
        this._data = await this._getData(this.props.specs);
        if (!this._data) {
            throw new Error(
                `[SCarpenter] Sorry but no valid specs have been specified...`,
            );
        }

        // active the default media if not set
        if (!this.state.activeMedia) {
            this.state.activeMedia = this._data.frontspec?.media?.defaultMedia;
        }

        // check the specified adapter
        if (!SCarpenterComponent._registeredAdapters[this.props.adapter]) {
            throw new Error(
                `[SCarpenterComponent] Sorry but the specified "${this.props.adapter}" is not registered...`,
            );
        }

        // set the root document and window
        this._$rootDocument = this.props.window.document;
        this._rootWindow = this.props.window;

        // set the document in which to search for items (s-specs) etc...
        this._$websiteDocument = this.props.window.document;
        this._websiteWindow = this.props.window;

        // get the first s-spec element that we can find
        // or get the first item in the body
        // and set it to the state.$currentElement to be sure we have something to
        // work with in the adapter, etc...
        let $firstSpecsElement =
            this._$websiteDocument.querySelector('[s-specs]');
        if (!$firstSpecsElement) {
            $firstSpecsElement = this._$websiteDocument.body.children[0];
        }
        this.state.$currentElement = $firstSpecsElement;
    }

    async firstUpdated() {
        // getting the editor element
        this._$editor = document.querySelector(`.${this.utils.cls('_editor')}`);
        if (!this._$editor) {
            throw new Error(
                `<red>[SCarpenterAppComponent]</red> Something goes wrong. No ".${this.utils.cls(
                    '_editor',
                )}" element found...`,
            );
        }

        // const $backdrop = document.createElement('div');
        // $backdrop.classList.add(this.utils.cls('_backdrop'));
        // this.prepend($backdrop);
        // $backdrop.addEventListener('pointerover', (e) => {
        //     console.log('SS', e);
        // });
        // $backdrop.addEventListener('pointerout', (e) => {
        //     console.log('OUT', e);
        // });

        // handle media method
        await this._handleMediaMethod();

        // create the toolbar element
        this._initToolbar();

        // listen for escape key press to close editor
        __hotkey('escape').on('press', () => {
            this._closeEditor();
        });
        __hotkey('escape', {
            // from the website itself
            element: this._$websiteDocument,
        }).on('press', () => {
            this._closeEditor();
        });

        // listen for toolbar actions
        this._listenToolbarActions();

        // watch for hover on carpenter elements
        this._watchHoverOnSpecElements();

        // listen spec editor update
        this._listenSpecsEditorUpdate();

        // handle popstate
        this._websiteWindow.addEventListener('popstate', (e) => {
            this._changePage(e.state.dotpath, false);
        });

        // handle "scrolled" class on the editor
        this._handleScrolledClassOnEditor();

        // Create UI placeholders
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 200);
    }

    /**
     * Create some "placeholders" of the editor UI to inject them into the actual website.
     * This is used to detect when the user is overing an actual UI and remove the "pointer-events: none"
     * on the editor iframe
     * If someone has a better idea.... :)
     */
    _$uiPlaceholders;
    _updateUiPlaceholders() {
        if (!this._$uiPlaceholders) {
            this._$uiPlaceholders = document.createElement('div');
            this._$uiPlaceholders.classList.add(
                's-carpenter_ui-placeholders',
                'active',
            );
            let outTimeout,
                isActive = false;
            this._$uiPlaceholders.addEventListener('pointermove', (e) => {
                if (isActive) return;
                isActive = true;
                clearTimeout(outTimeout);
                this._$editorIframe.classList.add('active');
                this._$uiPlaceholders.classList.remove('active');
            });
            this.addEventListener('pointerout', (e) => {
                if (!isActive) return;
                isActive = false;
                outTimeout = setTimeout(() => {
                    this._$editorIframe.classList.remove('active');
                    this._$uiPlaceholders.classList.add('active');
                }, 100);
            });
        }

        const $uis = this.querySelectorAll('[s-ui]');
        Array.from($uis).forEach(($ui) => {
            // create if needed
            if (!$ui._placeholder) {
                $ui._placeholder = document.createElement('div');
                $ui._placeholder.classList.add('s-carpenter_ui-placeholder');
                this._$uiPlaceholders.appendChild($ui._placeholder);
            }

            // set position
            const uiBounds = $ui.getBoundingClientRect();
            $ui._placeholder.style.top = `${uiBounds.top}px`;
            $ui._placeholder.style.left = `${uiBounds.left}px`;
            $ui._placeholder.style.width = `${uiBounds.width}px`;
            $ui._placeholder.style.height = `${uiBounds.height}px`;
        });

        // add the placeholders into the website
        if (!this._$uiPlaceholders.parent) {
            window.top.document.body.appendChild(this._$uiPlaceholders);
        }
    }

    /**
     * Handle media method.
     * Media is the media queries and his method is either "container" (@container queries), or "media" (plain old media queries).
     * It the method is "media", we need to wrap the website into an iframe to make the responsive preview work fine.
     */
    async _handleMediaMethod(): Promise<void> {
        const mediaMethod = this._data.frontspec?.media?.method;
        if (mediaMethod === 'container') {
            // getting the viewport element
            if (typeof this.props.viewportElm === HTMLElement) {
                this._$websiteViewport = this.props.viewportElm;
            } else if (typeof this.props.viewportElm === 'string') {
                this._$websiteViewport =
                    this._websiteWindow.document.querySelector(
                        this.props.viewportElm,
                    );
            }
        } else if (this._data.frontspec?.media?.queries) {
            // create the wrapping iframe
            this._$websiteIframe = document.createElement('iframe');
            this._$websiteIframe.classList.add('s-carpenter_website-iframe');

            // get the actual page html to inject into the iframe
            const html = this._$websiteDocument.documentElement.innerHTML;

            // prepend the website iframe in the body
            this._$websiteDocument.body.prepend(this._$websiteIframe);

            // wait until the iframe is ready
            await __whenIframeReady(this._$websiteIframe);

            // injecting the whole website into the iframe
            __injectIframeContent(this._$websiteIframe, html);

            // wait until the iframe is ready
            await __whenIframeReady(this._$websiteIframe);

            // empty the document of all the nodes
            // unless the iframes
            ['body'].forEach((container) => {
                Array.from(
                    this._$websiteDocument.querySelectorAll(`${container} > *`),
                ).forEach((node) => {
                    if (node.tagName?.toLowerCase?.() === 'iframe') {
                        return;
                    }
                    node.remove();
                });
            });

            // reset the _window and _$websiteDocument references
            this._websiteWindow = this._$websiteIframe.contentWindow;
            this._$websiteDocument =
                this._$websiteIframe.contentWindow.document;

            // the "viewport" is not the website iframe
            this._$websiteViewport = this._$websiteIframe;

            // inject the scrollbat styling
            __injectStyle(
                `
                body::-webkit-scrollbar {
                    width: 2px;
                    height: 2px;
                }
                body::-webkit-scrollbar-track {                
                    background-color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0)) * 1%),0.1);                                        
                }
                body::-webkit-scrollbar-thumb {
                    background-color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0)) * 1%),var(--s-theme-color-accent-a, 1));            
                }
                .s-wireframe body::-webkit-scrollbar-track{
                    background-color: rgba(0,0,0,0.05);
                }    
            `,
                {
                    rootNode: this._$websiteDocument.body,
                },
            );
        }
    }

    /**
     * Listen for specs editor updates
     */
    _listenSpecsEditorUpdate() {
        // listen for actual updated
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
    }

    /**
     * Watch hover on specs element to position the toolbar
     */
    _watchHoverOnSpecElements() {
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
                rootNode: this._$websiteDocument.body,
            },
        );
    }

    /**
     * Handle "scrolled" class on the editor
     */
    _handleScrolledClassOnEditor() {
        this._$editor.addEventListener('scroll', (e) => {
            if (Math.abs(this._$editor.scrollTop) >= 100) {
                this._$editor.classList.add('scrolled');
            } else {
                this._$editor.classList.remove('scrolled');
            }
        });
    }

    /**
     * open the editor
     */
    _openEditor() {
        document.body.classList.add('s-carpenter-app--open');
        this._$editorIframe?.classList.add('s-carpenter--open');
        this._$rootDocument.body.classList.add('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
    }

    /**
     * close the editor
     */
    _closeEditor() {
        document.body.classList.remove('s-carpenter-app--open');
        this._$editorIframe?.classList.remove('s-carpenter--open');
        this._$rootDocument.body.classList.remove('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
    }

    /**
     * Create the toolbar element
     */
    _initToolbar(): HTMLElement {
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = this._$websiteDocument.createElement('div');
        $toolbar.classList.add('s-carpenter-toolbar');
        this._$toolbar = $toolbar;

        const $i = this._$websiteDocument.createElement('i');
        $i.classList.add('fa-regular', 'fa-pen-to-square');
        $toolbar.appendChild($i);

        // append toolbar to viewport
        this._$websiteDocument.body.appendChild($toolbar);

        return this._$toolbar;
    }

    /**
     * Listen for toolbar actions
     */
    _listenToolbarActions() {
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
        const targetRect = $from.getBoundingClientRect();
        this._$toolbar.style.top = `${
            targetRect.top + this._websiteWindow.scrollY
        }px`;
        this._$toolbar.style.left = `${
            targetRect.left + targetRect.width + this._websiteWindow.scrollX
        }px`;
    }

    /**
     * Activate a particular media query
     */
    _activateMedia(media) {
        this.state.activeMedia = media;
        this._setViewportSize();
    }

    /**
     * Set the "viewport" his correct size
     */
    _setViewportSize() {
        const width = `${
            this._data.frontspec.media.queries[this.state.activeMedia].maxWidth
                ? `${
                      (this._data.frontspec.media.queries[
                          this.state.activeMedia
                      ].maxWidth /
                          100) *
                      75
                  }px`
                : '100vw'
        }`;
        this._$websiteViewport.style.width = width;
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
                ? this._$websiteDocument.body.children[0]
                : this.state.$currentElement,
            props: this.props,
            component: this,
        });
        if (adapterResult) {
            this.state.$currentElement = adapterResult;
        }

        // save arrival state
        if (pushState) {
            this._websiteWindow.history.pushState(
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
            ${this.props.sidebar
                ? html`
                      <nav class="${this.utils.cls('_sidebar')}">
                          <div class="${this.utils.cls('_logo')}">
                              ${unsafeHTML(this.props.logo)}
                          </div>

                          <div class="${this.utils.cls('_navigation')}">
                              <ul class="s-fs-tree">
                                  ${Object.keys(this._data.specsBySources).map(
                                      (sourceId) => {
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
                                      },
                                  )}
                              </ul>
                          </div>
                      </nav>
                  `
                : ''}

            <nav
                class="${this.utils.cls('_editor')} ${this.currentSpecs
                    ? 'active'
                    : ''}"
                s-ui
            >
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

            ${this._data.frontspec?.media?.queries
                ? html`
                      <nav class="${this.utils.cls('_media')}" s-ui>
                          <ul
                              class="${this.utils.cls(
                                  '_queries',
                                  's-tabs',
                                  's-bare',
                              )}"
                          >
                              ${Object.keys(
                                  this._data.frontspec?.media?.queries ?? {},
                              ).map((query) => {
                                  return html`
                                      <li
                                          @pointerup=${() =>
                                              this._activateMedia(query)}
                                          class="s-color s-color--accent ${query ===
                                          this.state.activeMedia
                                              ? 'active'
                                              : ''} ${this.utils.cls(
                                              '_query _item',
                                          )}"
                                      >
                                          ${unsafeHTML(this.props.specs[query])}
                                          ${__upperFirst(query)}
                                      </li>
                                  `;
                              })}
                          </ul>
                      </nav>
                  `
                : ''}
        `;
    }
}

export { __define as define };

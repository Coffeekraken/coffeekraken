var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';
import { define as __sSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';
import { __injectStyle, __querySelectorLive, __traverseUp, __whenIframeReady, } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './defineApp';
import { __injectIframeContent } from '@coffeekraken/sugar/dom';
import __ajaxAdapter from './adapters/ajaxAdapter';
// @ts-ignore
import __indexCss from '../css/index.css';
import __websiteUiCss from '../css/s-carpenter-app-website-ui.css';
// define components/features
__sSpecsEditorComponentDefine();
document.body.setAttribute('s-sugar', 'true');
__sSugarFeatureDefine();
export default class SCarpenterAppComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SCarpenterComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__indexCss)}
        `;
    }
    static registerAdapter(id, adapter) {
        if (SCarpenterAppComponent._registeredAdapters[id]) {
            throw new Error(`[SCarpenterAppComponent] Sorry but the "${id}" adapter already exists...`);
        }
        SCarpenterAppComponent._registeredAdapters[id] = adapter;
    }
    constructor() {
        var _a, _b;
        super(__deepMerge({
            name: 's-carpenter-app',
            interface: __SCarpenterComponentInterface,
            carpenter: __SSugarConfig.get('carpenter'),
        }));
        this.currentSpecs = null;
        this._values = {};
        this._$editorIframe = (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.querySelector('iframe.s-carpenter_editor-iframe');
        this._editorWindow = window;
        this._$editorDocument = document;
        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.href = '/dist/css/carpenter.css';
        document.body.appendChild($style);
    }
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // get the data
            this._data = yield this._getData(this.props.specs);
            if (!this._data) {
                throw new Error(`[SCarpenter] Sorry but no valid specs have been specified...`);
            }
            // active the default media if not set
            if (!this.state.activeMedia) {
                this.state.activeMedia = (_b = (_a = this._data.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.defaultMedia;
            }
            // check the specified adapter
            if (!SCarpenterAppComponent._registeredAdapters[this.props.adapter]) {
                throw new Error(`[SCarpenterAppComponent] Sorry but the specified "${this.props.adapter}" is not registered...`);
            }
            // set the root document and window
            this._$rootDocument = this.props.window.document;
            this._rootWindow = this.props.window;
            // set the document in which to search for items (s-specs) etc...
            this._$websiteDocument = this.props.window.document;
            this._websiteWindow = this.props.window;
            // get the initial carpenter component
            this._$carpenterComponent =
                this._$rootDocument.querySelector('s-carpenter');
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // getting the editor element
            this._$editor = document.querySelector(`.${this.utils.cls('_editor')}`);
            if (!this._$editor) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Something goes wrong. No ".${this.utils.cls('_editor')}" element found...`);
            }
            // handle media method
            yield this._init();
            // listen for escape key press to close editor
            __hotkey('escape').on('press', () => {
                this._closeEditor();
            });
            // register shortcuts in the editor iframe
            this._registerShortcuts(this._$editorDocument);
            // listen spec editor update
            this._listenSpecsEditorUpdate();
            // handle popstate
            this._websiteWindow.addEventListener('popstate', (e) => {
                this._changePage(e.state.dotpath, false);
            });
            // handle "scrolled" class on the editor
            this._handleScrolledClassOnEditor();
            yield __wait(2000);
            // Create UI placeholders
            this._updateUiPlaceholders();
            // remove the "scrolling='no'" attribute on website iframe
            this._$websiteIframe.removeAttribute('scrolling');
            // reset the activate media
            this.state.activeMedia && this._activateMedia(this.state.activeMedia);
            // emit the "s-carpenter-app.ready" event in the root document
            this._$rootDocument.dispatchEvent(new CustomEvent('s-carpenter-app.ready', {
                bubbles: true,
                detail: this,
            }));
        });
    }
    /**
     * Reguster keyboard shortcuts in a particular "scope".
     * The "scope" is the different document like the _$websiteDocument,
     * _$rootDocument, etc...
     */
    _registerShortcuts($scope) {
        let isEditorHided = false;
        $scope.addEventListener('keydown', (e) => {
            if (isEditorHided)
                return;
            if (!this.isEditorOpen())
                return;
            if (e.key === '§') {
                isEditorHided = true;
                this._closeEditor();
            }
        });
        $scope.addEventListener('keyup', (e) => {
            if (!isEditorHided)
                return;
            isEditorHided = false;
            this._openEditor();
        });
    }
    /**
     * Init the interactivity things on the iframed website.
     * This contains things like the toolbar, the hover to display it, etc...
     */
    _initWebsiteIframeContent() {
        // inject the scrollbat styling
        __injectStyle(`
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
            ${__websiteUiCss}  
        `, {
            rootNode: this._$websiteDocument.body,
        });
        // create the toolbar element
        this._initToolbar();
        // listen for toolbar actions
        this._listenToolbarActions();
        // watch for hover on carpenter elements
        this._watchHoverOnSpecElements();
        // listen for click on links in the iframe to close the editor
        this._$websiteDocument.addEventListener('click', (e) => {
            // check the clicked item
            if (e.target.tagName === 'A' && e.target.hasAttribute('href')) {
                this._closeEditor();
                return;
            }
            // traverse up to see if clicked element is in a link
            const $link = __traverseUp(e.target, ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'));
            if ($link) {
                this._closeEditor();
            }
        });
        __hotkey('escape', {
            // from the website itself
            element: this._$websiteDocument,
        }).on('press', () => {
            this._closeEditor();
        });
    }
    _updateUiPlaceholders() {
        if (!this._$uiPlaceholders) {
            this._$uiPlaceholders = document.createElement('div');
            this._$uiPlaceholders.classList.add('s-carpenter_ui-placeholders', 'active');
            let outTimeout, isActive = false;
            this._$uiPlaceholders.addEventListener('pointerover', (e) => {
                if (isActive)
                    return;
                isActive = true;
                clearTimeout(outTimeout);
                this._$editorIframe.classList.add('active');
                this._$uiPlaceholders.classList.remove('active');
            });
            this.addEventListener('pointerout', (e) => {
                if (!isActive)
                    return;
                isActive = false;
                outTimeout = setTimeout(() => {
                    this._$editorIframe.classList.remove('active');
                    this._$uiPlaceholders.classList.add('active');
                }, 100);
            });
        }
        const $uis = this.querySelectorAll('[s-carpenter-ui]');
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
    _init() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // create the wrapping iframe or get it from the content directly
            this._$websiteIframe = document.createElement('iframe');
            this._$websiteIframe.classList.add('s-carpenter_website-iframe');
            this._$websiteIframe.setAttribute('src', 'about:blank');
            this._$websiteIframe.setAttribute('scrolling', 'no');
            this._$websiteIframe.style.opacity = 0;
            // set the website viewport to be able to resize it using the media controls
            this._$websiteViewport = this._$websiteIframe;
            // get the actual page html to inject into the iframe
            const html = this._$websiteDocument.documentElement.innerHTML;
            const parser = new DOMParser();
            const $html = parser.parseFromString(html, 'text/html');
            // remove initial carpenter component
            (_b = (_a = $html.querySelector('s-carpenter')) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
            // prepend the website iframe in the body
            this._$websiteDocument.body.prepend(this._$websiteIframe);
            // wait until the iframe is ready
            yield __whenIframeReady(this._$websiteIframe);
            // injecting the whole website into the iframe
            __injectIframeContent(this._$websiteIframe, $html.documentElement.innerHTML);
            // listen when the iframe is loaded to init correctly the
            // carpenter stuffs like _websiteWindow, _$websiteDocument, etc...
            this._$websiteIframe.addEventListener('load', (e) => __awaiter(this, void 0, void 0, function* () {
                // clean the root document body
                this._cleanRootDocument();
                // reset the loading state
                this.state.loadingStack = {};
                this.state.isLoading = false;
                // reset the toolbar
                this._$toolbar = null;
                // reset state
                this._$preselectedElm = null;
                // wait until iframe is ready
                yield __whenIframeReady(this._$websiteIframe);
                // reset the _window and _$websiteDocument references
                this._websiteWindow = this._$websiteIframe.contentWindow;
                this._$websiteDocument =
                    this._$websiteIframe.contentWindow.document;
                // get the first element in the iframe
                const $firstElm = this._$websiteDocument.querySelector('[s-specs]');
                if ($firstElm) {
                    yield this._setCurrentElement($firstElm);
                }
                // register shortcuts in the website iframe
                this._registerShortcuts(this._$websiteDocument);
                // init the interactivity in the website iframe
                this._initWebsiteIframeContent();
                // "auto-edit" property
                if (this.props.autoEdit) {
                    this._edit($firstElm);
                }
                // show the iframe again (just to avoid weird visual effects...)
                this._$websiteIframe.style.opacity = 1;
                // resolve only if is the first init
                resolve();
            }));
            // wait until the iframe is ready
            yield __whenIframeReady(this._$websiteIframe);
        }));
    }
    /**
     * Clean root document body
     */
    _cleanRootDocument() {
        // empty the document of all the nodes
        // unless the iframes
        ['body'].forEach((container) => {
            Array.from(this._$rootDocument.querySelectorAll(`${container} > *`)).forEach((node) => {
                var _a, _b, _c, _d;
                if (((_b = (_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'iframe' ||
                    ((_d = (_c = node.tagName) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c)) === 's-carpenter') {
                    return;
                }
                // @ts-ignore
                node.remove();
            });
        });
    }
    /**
     * Listen for specs editor updates
     */
    _listenSpecsEditorUpdate() {
        // listen for actual updated
        this.addEventListener('s-specs-editor.change', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // make use of the specified adapter to update the component/section/etc...
            const adapterResult = yield SCarpenterAppComponent._registeredAdapters[this.props.adapter].setProps({
                $elm: this._$currentElm,
                props: (_a = e.detail.values) !== null && _a !== void 0 ? _a : {},
                component: this,
            });
            // save current values in "_values" stack
            this._values[this._$currentElm.id] = (_b = e.detail.values) !== null && _b !== void 0 ? _b : {};
            if (adapterResult) {
                this._$currentElm = adapterResult;
            }
        }));
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
        __querySelectorLive(`[s-specs]`, ($elm) => {
            $elm.addEventListener('pointerover', (e) => {
                var _a, _b;
                // position toolbar
                this._setToolbarPosition(e.currentTarget);
                // do nothing more if already activated
                if (e.currentTarget.id &&
                    e.currentTarget.id === ((_a = this._$currentElm) === null || _a === void 0 ? void 0 : _a.id)) {
                    return;
                }
                if ((_b = this._$toolbar) === null || _b === void 0 ? void 0 : _b.parent) {
                    return;
                }
                // activate the element if needed
                this._positionToolbarOnElement(e.currentTarget);
                // set the "pre" activate element
                this._$preselectedElm = $elm;
            });
        }, {
            rootNode: this._$websiteDocument.body,
        });
    }
    /**
     * Handle "scrolled" class on the editor
     */
    _handleScrolledClassOnEditor() {
        this._$editor.addEventListener('scroll', (e) => {
            if (Math.abs(this._$editor.scrollTop) >= 100) {
                this._$editor.classList.add('scrolled');
            }
            else {
                this._$editor.classList.remove('scrolled');
            }
        });
    }
    /**
     * Check if editor is opened
     */
    isEditorOpen() {
        return document.body.classList.contains('s-carpenter-app--open');
    }
    /**
     * open the editor
     */
    _openEditor() {
        var _a;
        document.body.classList.add('s-carpenter-app--open');
        (_a = this._$editorIframe) === null || _a === void 0 ? void 0 : _a.classList.add('s-carpenter--open');
        this._$rootDocument.body.classList.add('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
    }
    /**
     * close the editor
     */
    _closeEditor() {
        var _a;
        document.body.classList.remove('s-carpenter-app--open');
        (_a = this._$editorIframe) === null || _a === void 0 ? void 0 : _a.classList.remove('s-carpenter--open');
        this._$rootDocument.body.classList.remove('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
    }
    /**
     * Create the toolbar element
     */
    _initToolbar() {
        var _a;
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = this._$websiteDocument.createElement('div');
        $toolbar.classList.add('s-carpenter-toolbar');
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;
        const html = [];
        html.push(`
            <button s-carpenter-app-action="edit" class="s-carpenter-toolbar_edit">
                <i class="fa-regular fa-pen-to-square"></i> <span>Edit</span>
            </button>
        `);
        if ((_a = this.props.features) === null || _a === void 0 ? void 0 : _a.delete) {
            html.push(`
                <button s-carpenter-app-action="delete" class="s-carpenter-toolbar_delete" confirm="Confirm?">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `);
        }
        this._$toolbar.innerHTML = html;
        // append toolbar to viewport
        this._$websiteDocument.body.appendChild($toolbar);
        return this._$toolbar;
    }
    /**
     * Listen for toolbar actions
     */
    _listenToolbarActions() {
        this._$toolbar.addEventListener('pointerup', (e) => __awaiter(this, void 0, void 0, function* () {
            const action = e.target.getAttribute('s-carpenter-app-action');
            if (e.target.needConfirmation) {
                return;
            }
            switch (action) {
                case 'edit':
                    this._edit();
                    break;
                case 'delete':
                    console.log('DELETE');
                    break;
            }
        }));
    }
    /**
     * Edit an item
     */
    _edit($elm) {
        return __awaiter(this, void 0, void 0, function* () {
            // set the current element
            if ($elm || this._$preselectedElm) {
                yield this._setCurrentElement($elm !== null && $elm !== void 0 ? $elm : this._$preselectedElm);
            }
            // open the editor
            this._openEditor();
            // request new UI update
            this.requestUpdate();
        });
    }
    /**
     * Activate the element when toolbar has been clicked
     */
    _setCurrentElement($elm) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!$elm) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Cannot call _setCurrentElement without any args...`);
            }
            // ensure we have an id
            if (!((_b = (_a = $elm.id) === null || _a === void 0 ? void 0 : _a.trim) === null || _b === void 0 ? void 0 : _b.call(_a))) {
                $elm.setAttribute('id', __uniqid());
            }
            // do not activate 2 times the same element
            if (((_c = this._$currentElm) === null || _c === void 0 ? void 0 : _c.id) === $elm.id) {
                return;
            }
            // remove the preselected element
            this._$preselectedElm = null;
            // set the current element
            this._$currentElm = $elm;
            // force reset the specs editor
            this.currentSpecs = null;
            this.requestUpdate();
            yield __wait();
            // try to get the spec from the data fetched at start
            let potentialDotpath = $elm.getAttribute('s-specs');
            if (this._data.specs[potentialDotpath]) {
                this.currentSpecs = this._data.specs[potentialDotpath];
            }
            else {
                potentialDotpath = `${potentialDotpath}.${potentialDotpath.split('.').slice(-1)[0]}`;
                if (this._data.specs[potentialDotpath]) {
                    this.currentSpecs = this._data.specs[potentialDotpath];
                }
            }
            if (!this.currentSpecs) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Sorry but the requested "${potentialDotpath}" specs dotpath does not exists...`);
            }
            // get values
            const values = (_d = this._values[this._$currentElm.id]) !== null && _d !== void 0 ? _d : (yield SCarpenterAppComponent._registeredAdapters[this.props.adapter].getProps({
                $elm: this._$currentElm,
                component: this,
            }));
            // save the getted values
            if (values) {
                this.currentSpecs.values = values;
            }
        });
    }
    /**
     * Add the "editor" micro menu to the element
     */
    _positionToolbarOnElement($elm) {
        var _a;
        if ($elm.id && ((_a = this._$currentElm) === null || _a === void 0 ? void 0 : _a.id) === $elm.id) {
            return;
        }
        // position toolbar
        this._setToolbarPosition($elm);
    }
    /**
     * Set the toolbar position
     */
    _setToolbarPosition($from) {
        const targetRect = $from.getBoundingClientRect();
        this._$toolbar.style.top = `${targetRect.top + this._websiteWindow.scrollY}px`;
        let left = targetRect.left + targetRect.width + this._websiteWindow.scrollX;
        if (this.isEditorOpen() &&
            left >= this._$rootDocument.documentElement.clientWidth - 400) {
            left -= 500;
        }
        else if (targetRect.left + targetRect.width >=
            this._$rootDocument.documentElement.clientWidth - 50) {
            left -= 300;
        }
        left -= 50;
        this._$toolbar.style.left = `${left}px`;
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
        const width = `${this._data.frontspec.media.queries[this.state.activeMedia].maxWidth
            ? `${(this._data.frontspec.media.queries[this.state.activeMedia].maxWidth /
                100) *
                75}px`
            : '100vw'}`;
        this._$websiteViewport.style.setProperty('--s-carpenter-viewport-width', width);
    }
    /**
     * Change page with the dotpath
     */
    _changePage(dotpath, pushState = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // update the loading state
            this.state.loadingStack[dotpath] = true;
            this.state.isLoading = true;
            // change the iframe source
            this._$websiteIframe.src = this.props.pagesLink.replace('%dotpath', dotpath);
            // const adapterResult = await SCarpenterComponent._registeredAdapters[
            //     this.props.adapter
            // ].change({
            //     dotpath,
            //     $elm: this.props.specs
            //         ? this._$websiteDocument.body.children[0]
            //         : this._$currentElm,
            //     props: this.props,
            //     component: this,
            // });
            // if (adapterResult) {
            //     this._$currentElm = adapterResult;
            // }
            // save arrival state
            if (pushState) {
                this._rootWindow.history.pushState({
                    dotpath,
                }, document.title, this.props.pagesLink.replace('%dotpath', dotpath));
            }
            // update UI
            this.requestUpdate();
            // // update the currentSpecs
            // const newSpecs = this._data.specs[dotpath];
            // if (newSpecs !== this.currentSpecs) {
            //     this.currentSpecs = null;
            //     this.requestUpdate();
            //     await __wait();
            //     this.currentSpecs = newSpecs;
            //     this.requestUpdate();
            // }
        });
    }
    _toggleNavigationFolder(folderId) {
        if (this.state.activeNavigationFolders.includes(folderId)) {
            this.state.activeNavigationFolders.splice(this.state.activeNavigationFolders.indexOf(folderId), 1);
        }
        else {
            this.state.activeNavigationFolders.push(folderId);
        }
        this.requestUpdate();
    }
    /**
     * Grab the data depending on the passed source.
     * Can be a url where to fetch the data or an id pointing to an HTMLTemplateElement that
     * store the JSON data
     */
    _getData(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                if (source.startsWith('{')) {
                    data = JSON.parse(source);
                }
                else if (source.startsWith('/') ||
                    source.match(/^https?\:\/\//)) {
                    data = yield fetch(source).then((response) => response.json());
                }
                else {
                    const $template = document.querySelector(`template#${source}, template${source}`);
                    if ($template) {
                        // @ts-ignore
                        data = JSON.parse($template.content.textContent);
                    }
                }
            }
            catch (e) { }
            // warn if no data
            if (!data) {
                throw new Error(`[SCarpenterAppComponent] The passed source "${source}" does not provide any valid data...`);
            }
            data.specsByTypes = {};
            for (let [namespace, specObj] of Object.entries(data.specs)) {
                const parts = namespace.split('.');
                let type;
                parts.forEach((part) => {
                    if (type)
                        return;
                    if (part !== 'views') {
                        type = part;
                    }
                });
                if (!data.specsByTypes[type]) {
                    data.specsByTypes[type] = {};
                }
                data.specsByTypes[type][namespace] = specObj;
            }
            return data;
        });
    }
    _carpenterLogo() {
        return html `
            <svg
                width="62"
                height="64"
                viewBox="0 0 62 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.7641 10.3858V1.70592C13.7641 0.941977 14.5861 0.460164 15.2527 0.833363L36.9359 12.9732C37.2517 13.15 37.4473 13.4837 37.4473 13.8457V38.8719C37.4473 39.6456 36.6064 40.1262 35.9397 39.7335L28.0526 35.0868C27.7475 34.907 27.5602 34.5793 27.5602 34.2252V19.5822C27.5602 19.2266 27.3713 18.8977 27.0641 18.7185L14.2603 11.2496C13.953 11.0704 13.7641 10.7415 13.7641 10.3858Z"
                    fill="black"
                />
                <path
                    d="M9.07011 58.8847L1.48646 63.1071C0.819001 63.4787 -0.00179823 62.995 2.95924e-06 62.231L0.058594 37.3808C0.0594475 37.0188 0.25586 36.6856 0.572132 36.5095L22.4376 24.3353C23.1136 23.9589 23.9426 24.4599 23.9238 25.2334L23.7007 34.3848C23.6921 34.7388 23.4968 35.0619 23.1875 35.2342L10.3939 42.3574C10.0831 42.5304 9.88765 42.8554 9.88052 43.211L9.58345 58.031C9.57632 58.3866 9.38086 58.7117 9.07011 58.8847Z"
                    fill="black"
                />
                <path
                    d="M53.4768 38.5712L60.9938 42.9112C61.6554 43.2931 61.6617 44.2458 61.0052 44.6365L39.6502 57.3448C39.3392 57.53 38.9523 57.5325 38.6388 57.3515L16.9655 44.8384C16.2955 44.4516 16.2997 43.483 16.9732 43.102L24.9409 38.5949C25.2492 38.4205 25.6266 38.4222 25.9333 38.5993L38.6144 45.9207C38.9225 46.0986 39.3018 46.0994 39.6106 45.923L52.4807 38.569C52.7895 38.3925 53.1688 38.3934 53.4768 38.5712Z"
                    fill="black"
                />
            </svg>
        `;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!this._data) {
            return '';
        }
        return html `
            ${this.props.sidebar
            ? html `
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${unsafeHTML(this.props.logo)}
                          </div>

                          <div class="${this.utils.cls('_navigation')}">
                              <ul class="s-fs-tree">
                                  ${Object.keys(this._data.specsByTypes).map((type) => {
                const specsObj = this._data.specsByTypes[type];
                return html `
                                              <li
                                                  class="${this.state.activeNavigationFolders.includes(type)
                    ? 'active'
                    : ''}"
                                              >
                                                  <div
                                                      @pointerup=${() => this._toggleNavigationFolder(type)}
                                                  >
                                                      ${this.state.activeNavigationFolders.includes(type)
                    ? html `
                                                                ${unsafeHTML(this.props
                        .icons
                        .folderOpen)}
                                                            `
                    : html `
                                                                ${unsafeHTML(this.props
                        .icons
                        .folderClose)}
                                                            `}
                                                      <span tabindex="0"
                                                          >${__upperFirst(type)}</span
                                                      >
                                                  </div>
                                                  <ul class="s-fs-tree">
                                                      ${Object.keys(specsObj).map((dotpath) => {
                    var _a;
                    const specObj = specsObj[dotpath];
                    let last;
                    const checkDotPath = specObj.metas.dotpath
                        .split('.')
                        .filter((p) => {
                        if (last &&
                            p ===
                                last) {
                            return false;
                        }
                        last =
                            p;
                        return true;
                    })
                        .join('.');
                    return html `
                                                              <li
                                                                  class="_item ${this._$rootDocument.location.href.includes(checkDotPath)
                        ? 'active'
                        : ''}"
                                                                  tabindex="0"
                                                                  @pointerup=${() => this._changePage(specObj
                        .metas
                        .dotpath)}
                                                              >
                                                                  <div>
                                                                      ${this
                        .state
                        .loadingStack[specObj
                        .metas
                        .dotpath]
                        ? html `
                                                                                <div
                                                                                    class="_loader carpenter-loader-blocks"
                                                                                >
                                                                                    <div
                                                                                        class="_block-1"
                                                                                    ></div>
                                                                                    <div
                                                                                        class="_block-2"
                                                                                    ></div>
                                                                                    <div
                                                                                        class="_block-3"
                                                                                    ></div>
                                                                                </div>
                                                                            `
                        : html `
                                                                                <i
                                                                                    class="fa-regular fa-file"
                                                                                ></i>
                                                                            `}
                                                                      <span>
                                                                          ${(_a = specObj.title) !== null && _a !== void 0 ? _a : specObj.name}
                                                                      </span>
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

            <nav
                class="${this.utils.cls('_editor')} ${this.currentSpecs
            ? 'active'
            : ''}"
                s-carpenter-ui
            >
                ${this.currentSpecs && !this.state.isLoading
            ? html `
                          <s-specs-editor
                              media="${this.state.activeMedia}"
                              specs="${JSON.stringify(this.currentSpecs)}"
                              features="${JSON.stringify(this.props.features)}"
                              frontspec="${JSON.stringify((_a = this._data.frontspec) !== null && _a !== void 0 ? _a : {})}"
                          >
                          </s-specs-editor>
                      `
            : html `
                          <div class="_loader carpenter-loader-blocks">
                              <div class="_block-1"></div>
                              <div class="_block-2"></div>
                              <div class="_block-3"></div>
                          </div>
                      `}
            </nav>

            ${((_c = (_b = this._data.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries)
            ? html `
                      <nav
                          class="${this.utils.cls('_controls')}"
                          s-carpenter-ui
                      >
                          <ul
                              class="${this.utils.cls('_queries', 's-tabs', 's-bare')}"
                          >
                              ${Object.keys((_f = (_e = (_d = this._data.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries) !== null && _f !== void 0 ? _f : {}).map((query) => {
                return html `
                                      <li
                                          @pointerup=${() => this._activateMedia(query)}
                                          class="${query ===
                    this.state.activeMedia
                    ? 'active'
                    : ''} _query _item"
                                      >
                                          ${unsafeHTML(this.props.specs[query])}
                                          ${__upperFirst(query)}
                                      </li>
                                  `;
            })}
                          </ul>

                          ${((_g = this.props.features) === null || _g === void 0 ? void 0 : _g.save)
                ? html ` <button class="_save">Save page</button> `
                : ''}
                      </nav>
                  `
            : ''}
            ${this.state.isLoading
            ? html `
                      <div class="${this.utils.cls('_loading')}">
                          <div class="_loader carpenter-loader-blocks">
                              <div class="_block-1"></div>
                              <div class="_block-2"></div>
                              <div class="_block-3"></div>
                          </div>
                      </div>
                  `
            : ''}
        `;
    }
}
SCarpenterAppComponent._registeredAdapters = {
    ajax: __ajaxAdapter,
};
SCarpenterAppComponent.state = {
    activeNavigationFolders: [],
    activeMedia: null,
    isLoading: true,
    loadingStack: {},
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFaEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFFdEYsT0FBTyxFQUNILGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsWUFBWSxFQUNaLGlCQUFpQixHQUNwQixNQUFNLHlCQUF5QixDQUFDO0FBRWpDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE9BQU8sUUFBUSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLGFBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxhQUFhO0FBQ2IsT0FBTyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxjQUFjLE1BQU0sdUNBQXVDLENBQUM7QUErQm5FLDZCQUE2QjtBQUM3Qiw2QkFBNkIsRUFBRSxDQUFD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
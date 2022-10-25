"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_specs_editor_component_1 = require("@coffeekraken/s-specs-editor-component");
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SCarpenterComponentInterface_1 = __importDefault(require("./interface/SCarpenterComponentInterface"));
const dom_1 = require("@coffeekraken/sugar/dom");
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
const ajaxAdapter_1 = __importDefault(require("./adapters/ajaxAdapter"));
// @ts-ignore
const s_carpenter_component_css_1 = __importDefault(require("../../../../src/css/s-carpenter-component.css")); // relative to /dist/pkg/esm/js
// define components
(0, s_specs_editor_component_1.define)();
class SCarpenterComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-carpenter',
            interface: SCarpenterComponentInterface_1.default,
            carpenter: s_sugar_config_1.default.get('carpenter'),
        }));
        this.state = {
            data: null,
            currentSpecs: null,
            hoveredDotpath: null,
            $currentElement: null,
        };
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCarpenterComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_carpenter_component_css_1.default)}
        `;
    }
    static registerAdapter(id, adapter) {
        if (SCarpenterComponent._registeredAdapters[id]) {
            throw new Error(`[SCarpenterComponent] Sorry but the "${id}" adapter already exists...`);
        }
        SCarpenterComponent._registeredAdapters[id] = adapter;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // get the data
            this.state.data = yield this._getData(this.props.source);
            // check the specified adapter
            if (!SCarpenterComponent._registeredAdapters[this.props.adapter]) {
                console.log(this);
                throw new Error(`[SCarpenterComponent] Sorry but the specified "${this.props.adapter}" is not registered...`);
            }
            // create the toolbar element
            this._createToolbarElement();
            // watch for hover on carpenter elements
            (0, dom_1.__querySelectorLive)(`[s-specs]`, ($elm) => {
                $elm.addEventListener('pointerover', (e) => {
                    var _a;
                    if ((_a = this._$toolbar) === null || _a === void 0 ? void 0 : _a.parent) {
                        return;
                    }
                    this._activateElement(e.currentTarget);
                    // set the hovered dotpath
                    this.state.hoveredDotpath = $elm.getAttribute('s-specs');
                });
            });
            // listen spec editor update
            this.addEventListener('s-specs-editor.update', (e) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                // make use of the specified adapter to update the component/section/etc...
                const adapterResult = yield SCarpenterComponent._registeredAdapters[this.props.adapter].apply(this.state.$currentElement, (_a = e.detail.values) !== null && _a !== void 0 ? _a : {});
                if (adapterResult) {
                    this.state.$currentElement = adapterResult;
                }
            }));
            // listen on click
            this._$toolbar.addEventListener('pointerup', (e) => {
                // try to get the spec from the data fetched at start
                let potentialDotpath = this.state.hoveredDotpath;
                if (this.state.data.specsMap[potentialDotpath]) {
                    this.state.currentSpecs =
                        this.state.data.specsMap[potentialDotpath];
                }
                else {
                    potentialDotpath = `${potentialDotpath}.${potentialDotpath.split('.').slice(-1)[0]}`;
                    if (this.state.data.specsMap[potentialDotpath]) {
                        this.state.currentSpecs =
                            this.state.data.specsMap[potentialDotpath];
                    }
                }
                console.log(potentialDotpath);
                console.log('specs', this.state.data);
                if (!this.state.currentSpecs) {
                    return;
                }
                // open the editor
                this._openEditor();
                // update the UI
                this.requestUpdate();
            });
        });
    }
    /**
     * Get the current component data
     */
    _getCurrentData() { }
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
    _createToolbarElement() {
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
    _activateElement($elm) {
        const $toolbar = this._createToolbarElement();
        const targetRect = $elm.getBoundingClientRect();
        $toolbar.style.top = `${targetRect.top + window.scrollY}px`;
        $toolbar.style.left = `${targetRect.left + targetRect.width + window.scrollX}px`;
        // set the current element
        this.state.$currentElement = $elm;
        // append toolbar to viewport
        document.body.appendChild($toolbar);
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
                if (source.startsWith('/') || source.match(/^http?s\:\/\//)) {
                    data = yield fetch(source).then((response) => response.json());
                }
                else {
                    const $template = document.querySelectorAll(`template#${source}`);
                    if ($template) {
                        data = JSON.parse($template.content.textContent);
                    }
                }
            }
            catch (e) { }
            // warn if no data
            if (!data) {
                throw new Error(`[SCarpenterComponent] The passed source "${source}" does not provide any valid data...`);
            }
            return data;
        });
    }
    render() {
        if (!this.state.data) {
            return '';
        }
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('', null, 's-bare')}">
                <nav class="__navigation">
                    <ul class="s-fs-tree">
                        ${Object.keys(this.state.data.specsBySources).map((sourceId) => {
            var _a;
            const sourceObj = this.state.data.specsBySources[sourceId];
            if (typeof sourceObj === 'function') {
                return '';
            }
            return (0, lit_1.html) `
                                    <li class="active">
                                        <div>
                                            <i class="fa-regular fa-folder"></i>
                                            <span tabindex="0"
                                                >${(_a = sourceObj.title) !== null && _a !== void 0 ? _a : sourceId}</span
                                            >
                                        </div>
                                        <ul>
                                            ${Object.keys(sourceObj.specs).map((dotpath) => {
                var _a;
                const specObj = sourceObj.specs[dotpath];
                return (0, lit_1.html) `
                                                        <li class="active">
                                                            <div>
                                                                <i
                                                                    class="fa-regular fa-file"
                                                                ></i>
                                                                <a tabindex="0"
                                                                    >${(_a = specObj.title) !== null && _a !== void 0 ? _a : specObj.name}</a
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
                </nav>

                <nav
                    class="__editor ${this.state.currentSpecs ? 'active' : ''}"
                >
                    ${this.state.currentSpecs
            ? (0, lit_1.html) `
                              <s-specs-editor
                                  specs="${JSON.stringify(this.state.currentSpecs)}"
                              >
                              </s-specs-editor>
                          `
            : ''}
                </nav>
            </div>
        `;
    }
}
exports.default = SCarpenterComponent;
SCarpenterComponent._registeredAdapters = {
    ajax: ajaxAdapter_1.default,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxxRkFBaUc7QUFFakcsdURBQXlEO0FBQ3pELDZCQUEyQztBQUMzQyw0R0FBc0Y7QUFFdEYsaURBQThEO0FBRTlELGtGQUEwRDtBQUUxRCxzREFBZ0M7QUFvVVgsaUJBcFVkLGdCQUFRLENBb1VZO0FBbFUzQix5RUFBbUQ7QUFFbkQsYUFBYTtBQUNiLDhHQUFrRSxDQUFDLCtCQUErQjtBQVFsRyxvQkFBb0I7QUFDcEIsSUFBQSxpQ0FBNkIsR0FBRSxDQUFDO0FBa0NoQyxNQUFxQixtQkFBb0IsU0FBUSx5QkFBZTtJQXNDNUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsU0FBUyxFQUFFLHNDQUE4QjtZQUN6QyxTQUFTLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FDTCxDQUFDO1FBaEJOLFVBQUssR0FBRztZQUNKLElBQUksRUFBRSxJQUFJO1lBQ1YsWUFBWSxFQUFFLElBQUk7WUFDbEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsZUFBZSxFQUFFLElBQUk7U0FDeEIsQ0FBQztJQVlGLENBQUM7SUE3Q0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0Ysc0NBQThCLENBQ2pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsbUNBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUtELE1BQU0sQ0FBQyxlQUFlLENBQ2xCLEVBQVUsRUFDVixPQUFvQztRQUVwQyxJQUFJLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLEVBQUUs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
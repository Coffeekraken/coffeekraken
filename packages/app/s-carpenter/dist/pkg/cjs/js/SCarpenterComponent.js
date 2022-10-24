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
// @ts-ignore
const s_carpenter_component_css_1 = __importDefault(require("../../../../src/css/s-carpenter-component.css")); // relative to /dist/pkg/esm/js
// define components
(0, s_specs_editor_component_1.define)();
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
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // get the data
            this.state.data = yield this._getData(this.props.source);
            // create the toolbar element
            this._createToolbarElement();
            // watch for hover on carpenter elements
            (0, dom_1.__querySelectorLive)(`[s-carpenter]`, ($elm) => {
                $elm.addEventListener('pointerover', (e) => {
                    var _a;
                    if ((_a = this._$toolbar) === null || _a === void 0 ? void 0 : _a.parent) {
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
                }
                else {
                    potentialDotpath = `${potentialDotpath}.${potentialDotpath.split('.').slice(-1)[0]}`;
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
                const $dataElements = this.state.$currentElement.querySelectorAll(`[s-carpenter-editable]`);
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
        // reset the current specs
        this.state.currentSpecs = null;
        // reset the current element
        this.state.$currentElement = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxxRkFBaUc7QUFFakcsdURBQXlEO0FBQ3pELDZCQUEyQztBQUMzQyw0R0FBc0Y7QUFFdEYsaURBQThEO0FBRTlELGtGQUEwRDtBQUUxRCxzREFBZ0M7QUE0U1gsaUJBNVNkLGdCQUFRLENBNFNZO0FBMVMzQixhQUFhO0FBQ2IsOEdBQWtFLENBQUMsK0JBQStCO0FBUWxHLG9CQUFvQjtBQUNwQixJQUFBLGlDQUE2QixHQUFFLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBcUIsbUJBQW9CLFNBQVEseUJBQWU7SUF1QjVEO1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSxzQ0FBOEI7WUFDekMsU0FBUyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUM3QyxDQUFDLENBQ0wsQ0FBQztRQWhCTixVQUFLLEdBQUc7WUFDSixJQUFJLEVBQUUsSUFBSTtZQUNWLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUM7SUFZRixDQUFDO0lBOUJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHNDQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLG1DQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFxQkssS0FBSzs7WUFDUCxlQUFlO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFB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
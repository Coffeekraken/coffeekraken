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
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './define';
import __ajaxAdapter from './adapters/ajaxAdapter';
// @ts-ignore
import __css from '../../../../src/css/s-carpenter-component.css'; // relative to /dist/pkg/esm/js
// define components
__sSpecsEditorComponentDefine();
export default class SCarpenterComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-carpenter',
            interface: __SCarpenterComponentInterface,
            carpenter: __SSugarConfig.get('carpenter'),
        }));
        this.state = {
            data: null,
            currentSpecs: null,
            hoveredDotpath: null,
            $currentElement: null,
        };
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SCarpenterComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
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
            __querySelectorLive(`[s-specs]`, ($elm) => {
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
        return html `
            <div class="${this.componentUtils.className('', null, 's-bare')}">
                <nav class="__navigation">
                    <ul class="s-fs-tree">
                        ${Object.keys(this.state.data.specsBySources).map((sourceId) => {
            var _a;
            const sourceObj = this.state.data.specsBySources[sourceId];
            if (typeof sourceObj === 'function') {
                return '';
            }
            return html `
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
                return html `
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
            ? html `
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
SCarpenterComponent._registeredAdapters = {
    ajax: __ajaxAdapter,
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVqRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFFdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRWhDLE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQyxDQUFDLCtCQUErQjtBQVFsRyxvQkFBb0I7QUFDcEIsNkJBQTZCLEVBQUUsQ0FBQztBQWtDaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFBb0IsU0FBUSxlQUFlO0lBc0M1RDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixJQUFJLEVBQUUsYUFBYTtZQUNuQixTQUFTLEVBQUUsOEJBQThCO1lBQ3pDLFNBQVMsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUM3QyxDQUFDLENBQ0wsQ0FBQztRQWhCTixVQUFLLEdBQUc7WUFDSixJQUFJLEVBQUUsSUFBSTtZQUNWLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUM7SUFZRixDQUFDO0lBN0NELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsOEJBQThCLENBQ2pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFLRCxNQUFNLENBQUMsZUFBZSxDQUNsQixFQUFVLEVBQ1YsT0FBb0M7UUFFcEMsSUFBSSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3QyxNQUFNLElBQUksS0FBSyxDQUNYLHdDQUF3QyxFQUFFLDZCQUE2QixDQUMxRSxDQUFDO1NBQ0w7UUFDRCxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDMUQsQ0FBQztJQXFCSyxLQUFLOztZQUNQLGVBQWU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV6RCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0RBQWtELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyx3QkFBd0IsQ0FDL0YsQ0FBQzthQUNMO1lBRUQsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBRTdCLHdDQUF3QztZQUN4QyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFOztvQkFDdkMsSUFBSSxNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLE1BQU0sRUFBRTt3QkFDeEIsT0FBTztxQkFDVjtvQkFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUV2QywwQkFBMEI7b0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7O2dCQUN2RCwyRUFBMkU7Z0JBQzNFLE1BQU0sYUFBYSxHQUFHLE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNyQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxNQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxhQUFhLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDO2lCQUM5QztZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFFSCxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDL0MscURBQXFEO2dCQUNyRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUNqRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7d0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUNsRDtxQkFBTTtvQkFDSCxnQkFBZ0IsR0FBRyxHQUFHLGdCQUFnQixJQUNsQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMzQyxFQUFFLENBQUM7b0JBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTt3QkFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZOzRCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztxQkFDbEQ7aUJBQ0o7Z0JBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7b0JBQzFCLE9BQU87aUJBQ1Y7Z0JBRUQsa0JBQWtCO2dCQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRW5CLGdCQUFnQjtnQkFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxlQUFlLEtBQUksQ0FBQztJQUVwQjs7T0FFRztJQUNILFdBQVc7UUFDUCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUJBQXFCO1FBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDekI7UUFDRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFFMUIsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCLENBQUMsSUFBaUI7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDaEQsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQztRQUM1RCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUNsQixVQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQ2hELElBQUksQ0FBQztRQUVMLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFbEMsNkJBQTZCO1FBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0csUUFBUSxDQUFDLE1BQWM7O1lBQ3pCLElBQUksSUFBSSxDQUFDO1lBRVQsSUFBSTtnQkFDQSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDekQsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ2xFO3FCQUFNO29CQUNILE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDdkMsWUFBWSxNQUFNLEVBQUUsQ0FDdkIsQ0FBQztvQkFDRixJQUFJLFNBQVMsRUFBRTt3QkFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUNwRDtpQkFDSjthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUVkLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQ1gsNENBQTRDLE1BQU0sc0NBQXNDLENBQzNGLENBQUM7YUFDTDtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVELE1BQU07UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDOzs7MEJBR2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUM3QyxDQUFDLFFBQVEsRUFBRSxFQUFFOztZQUNULE1BQU0sU0FBUyxHQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtnQkFDakMsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sSUFBSSxDQUFBOzs7OzttREFLUSxNQUFBLFNBQVMsQ0FBQyxLQUFLLG1DQUNsQixRQUFROzs7OzhDQUlWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FDOUIsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7Z0JBQ1IsTUFBTSxPQUFPLEdBQ1QsU0FBUyxDQUFDLEtBQUssQ0FDWCxPQUFPLENBQ1YsQ0FBQztnQkFDTixPQUFPLElBQUksQ0FBQTs7Ozs7Ozt1RUFPUSxNQUFBLE9BQU8sQ0FBQyxLQUFLLG1DQUNoQixPQUFPLENBQUMsSUFBSTs7OztxREFJM0IsQ0FBQztZQUNOLENBQUMsQ0FDSjs7O2lDQUdaLENBQUM7UUFDTixDQUFDLENBQ0o7Ozs7O3NDQUthLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7O3NCQUV2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7WUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7MkNBRWEsSUFBSSxDQUFDLFNBQVMsQ0FDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQzFCOzs7MkJBR1I7WUFDSCxDQUFDLENBQUMsRUFBRTs7O1NBR25CLENBQUM7SUFDTixDQUFDOztBQW5RTSx1Q0FBbUIsR0FBZ0Q7SUFDdEUsSUFBSSxFQUFFLGFBQWE7Q0FDdEIsQ0FBQztBQW9RTixPQUFPLEVBQUUsUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFDIn0=
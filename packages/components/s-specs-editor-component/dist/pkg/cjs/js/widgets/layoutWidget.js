"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_media_1 = __importDefault(require("@coffeekraken/s-media"));
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentLayoutWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        var _a;
        super(deps);
        this._renderedLayouts = {};
        if (!((_a = this.values.layou) === null || _a === void 0 ? void 0 : _a.layout) && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }
        this._sMedia = new s_media_1.default();
    }
    firstUpdated() {
        // _console.log('d');
        // const $select = this.editor.querySelector('.custom-select'),
        //     $dropdown = $select.querySelector('.custom-select_dropdown');
        // __makeFloat($dropdown, $select);
    }
    render() {
        const values = this.values;
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map((media) => (0, lit_1.html) `
                        ${this.renderLabel({
            title: media,
        })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${this._renderLayout(values.layout, media)}
                            </div>
                            <div class="custom-select_dropdown">
                                ${this.propObj.layouts.map((layoutObj) => (0, lit_1.html) `
                                        <div
                                            class="custom-select_item"
                                            tabindex="0"
                                            @pointerup=${(e) => {
            let cells = values.cells;
            const areasCount = this._sMedia.countAreas(layoutObj.layout);
            if (areasCount < cells.length) {
                for (let i = cells.length; i > areasCount; i--) { }
            }
            this.mergeValue({
                media: {
                    [media]: layoutObj,
                },
            });
        }}
                                        >
                                            ${this._renderLayout(layoutObj, media)}
                                        </div>
                                    `)}
                            </div>
                        </div>
                    `)}
            </div>
        `;
    }
    _renderLayout(layoutObj, media) {
        if (!this._renderedLayouts[layoutObj.id]) {
            this._renderedLayouts[layoutObj.id] = this._sMedia.layoutCss(layoutObj.layout, {
                selector: `.s-carpenter-app-layout-widget-${layoutObj.id}`,
            });
        }
        return (0, lit_1.html) `
            <style>
                ${this._renderedLayouts[layoutObj.id].css}
            </style>
            <div
                class="_layout ${`s-carpenter-app-layout-widget-${layoutObj.id}`}"
            >
                ${this._renderedLayouts[layoutObj.id].areas.map((areaId) => (0, lit_1.html) `
                            <div class="_area _area-${areaId}">${areaId}</div>
                        `)}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentLayoutWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBSTNCLG9FQUE2QztBQUU3QywrRUFBeUQ7QUFPekQsTUFBcUIsaUNBQWtDLFNBQVEsNEJBQW9CO0lBSy9FLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUxoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFPbEIsSUFBSSxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssMENBQUUsTUFBTSxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsWUFBWTtRQUNSLHFCQUFxQjtRQUNyQiwrREFBK0Q7UUFDL0Qsb0VBQW9FO1FBQ3BFLG1DQUFtQztJQUN2QyxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpDLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3JCLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTswQkFDVCxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2YsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDOzs7a0NBR1EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzs7O2tDQUd4QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozt5REFJRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FDbkIsU0FBUyxDQUFDLE1BQU0sQ0FDbkIsQ0FBQztZQUNOLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFDcEIsQ0FBQyxHQUFHLFVBQVUsRUFDZCxDQUFDLEVBQUUsRUFDTCxHQUFFO2FBQ1A7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNaLEtBQUssRUFBRTtvQkFDSCxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVM7aUJBQ3JCO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7OENBRUMsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsU0FBUyxFQUNULEtBQUssQ0FDUjs7cUNBRVIsQ0FDSjs7O3FCQUdaLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBYyxFQUFFLEtBQWE7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDeEQsU0FBUyxDQUFDLE1BQU0sRUFDaEI7Z0JBQ0ksUUFBUSxFQUFFLGtDQUFrQyxTQUFTLENBQUMsRUFBRSxFQUFFO2FBQzdELENBQ0osQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFBLFVBQUksRUFBQTs7a0JBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7aUNBR3hCLGlDQUFpQyxTQUFTLENBQUMsRUFBRSxFQUFFOztrQkFFOUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMzQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ1AsSUFBQSxVQUFJLEVBQUE7c0RBQzBCLE1BQU0sS0FBSyxNQUFNO3lCQUM5QyxDQUNSOztTQUVSLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF4R0Qsb0RBd0dDIn0=
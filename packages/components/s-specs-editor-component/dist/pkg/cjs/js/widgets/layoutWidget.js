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
        super(deps);
        this._renderedLayouts = {};
        if (!this.values.media && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }
        this._sMedia = new s_media_1.default();
    }
    render() {
        const values = this.values;
        const defaultLayout = {
            id: '1',
            layout: '1',
        };
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map((media) => {
            var _a;
            return (0, lit_1.html) `
                        ${this.renderLabel({
                title: media,
            })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${this._renderLayout((_a = values.media[media]) !== null && _a !== void 0 ? _a : defaultLayout)}
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
                    `;
        })}
            </div>
        `;
    }
    _renderLayout(layoutObj) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBSTNCLG9FQUE2QztBQUU3QywrRUFBeUQ7QUFPekQsTUFBcUIsaUNBQWtDLFNBQVEsNEJBQW9CO0lBSy9FLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTGhCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQU1sQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pDLE1BQU0sYUFBYSxHQUFHO1lBQ2xCLEVBQUUsRUFBRSxHQUFHO1lBQ1AsTUFBTSxFQUFFLEdBQUc7U0FDZCxDQUFDO1FBRUYsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7a0JBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDckIsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUEsVUFBSSxFQUFBOzBCQUNULElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2YsS0FBSyxFQUFFLEtBQUs7YUFDZixDQUFDOzs7a0NBR1EsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsTUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxtQ0FBSSxhQUFhLENBQ3ZDOzs7a0NBR0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN0QixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7Ozs7eURBSUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDZixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN6QixNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FDbkIsU0FBUyxDQUFDLE1BQU0sQ0FDbkIsQ0FBQztnQkFDTixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUMzQixLQUNJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQ3BCLENBQUMsR0FBRyxVQUFVLEVBQ2QsQ0FBQyxFQUFFLEVBQ0wsR0FBRTtpQkFDUDtnQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUNaLEtBQUssRUFBRTt3QkFDSCxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVM7cUJBQ3JCO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7OzhDQUVDLElBQUksQ0FBQyxhQUFhLENBQ2hCLFNBQVMsRUFDVCxLQUFLLENBQ1I7O3FDQUVSLENBQ0o7OztxQkFHWixDQUFBO1NBQUEsQ0FDSjs7U0FFUixDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWEsQ0FBQyxTQUFjO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQ3hELFNBQVMsQ0FBQyxNQUFNLEVBQ2hCO2dCQUNJLFFBQVEsRUFBRSxrQ0FBa0MsU0FBUyxDQUFDLEVBQUUsRUFBRTthQUM3RCxDQUNKLENBQUM7U0FDTDtRQUVELE9BQU8sSUFBQSxVQUFJLEVBQUE7O2tCQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRzs7O2lDQUd4QixpQ0FBaUMsU0FBUyxDQUFDLEVBQUUsRUFBRTs7a0JBRTlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDM0MsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNQLElBQUEsVUFBSSxFQUFBO3NEQUMwQixNQUFNLEtBQUssTUFBTTt5QkFDOUMsQ0FDUjs7U0FFUixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBckdELG9EQXFHQyJ9
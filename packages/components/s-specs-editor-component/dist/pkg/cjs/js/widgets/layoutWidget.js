"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_media_1 = __importDefault(require("@coffeekraken/s-media"));
const string_1 = require("@coffeekraken/sugar/string");
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
                ${this._sMedia.medias.map((media) => (0, lit_1.html) `
                        ${this.renderLabel({
            title: `${(0, string_1.__upperFirst)(media)}${media === this._sMedia.defaultMedia
                ? ' (default) '
                : ''}`,
            description: `Set a layout for ${media}`,
        })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${!values.media[media]
            ? (0, lit_1.html) `
                                          <p class="_same-as-default">
                                              Same as
                                              ${this._sMedia.defaultMedia}
                                          </p>
                                      `
            : (0, lit_1.html) `
                                          ${this._renderLayout(values.media[media])}
                                      `}
                            </div>
                            <div class="custom-select_dropdown">
                                ${this.propObj.layouts.map((layoutObj) => (0, lit_1.html) `
                                        <div
                                            class="custom-select_item"
                                            tabindex="0"
                                            @pointerup=${(e) => {
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
                class="s-layout _layout ${`s-carpenter-app-layout-widget-${layoutObj.id}`}"
            >
                ${this._renderedLayouts[layoutObj.id].areas.map((areaId) => (0, lit_1.html) `
                            <div class="_area s-layout_area-${areaId}">
                                ${areaId}
                            </div>
                        `)}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentLayoutWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBSTNCLG9FQUE2QztBQUM3Qyx1REFBMEQ7QUFFMUQsK0VBQXlEO0FBT3pELE1BQXFCLGlDQUFrQyxTQUFRLDRCQUFvQjtJQUsvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUxoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFNbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE1BQU0sR0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxNQUFNLGFBQWEsR0FBRztZQUNsQixFQUFFLEVBQUUsR0FBRztZQUNQLE1BQU0sRUFBRSxHQUFHO1NBQ2QsQ0FBQztRQUVGLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3JCLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTswQkFDVCxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2YsS0FBSyxFQUFFLEdBQUcsSUFBQSxxQkFBWSxFQUFDLEtBQUssQ0FBQyxHQUN6QixLQUFLLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZO2dCQUMvQixDQUFDLENBQUMsYUFBYTtnQkFDZixDQUFDLENBQUMsRUFDVixFQUFFO1lBQ0YsV0FBVyxFQUFFLG9CQUFvQixLQUFLLEVBQUU7U0FDM0MsQ0FBQzs7O2tDQUdRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDbEIsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs7Z0RBR00sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZOzt1Q0FFbEM7WUFDSCxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7NENBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDdEI7dUNBQ0o7OztrQ0FHTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozt5REFJRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDWixLQUFLLEVBQUU7b0JBQ0gsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTO2lCQUNyQjthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7OzhDQUVDLElBQUksQ0FBQyxhQUFhLENBQ2hCLFNBQVMsRUFDVCxLQUFLLENBQ1I7O3FDQUVSLENBQ0o7OztxQkFHWixDQUNKOztTQUVSLENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLFNBQWM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDeEQsU0FBUyxDQUFDLE1BQU0sRUFDaEI7Z0JBQ0ksUUFBUSxFQUFFLGtDQUFrQyxTQUFTLENBQUMsRUFBRSxFQUFFO2FBQzdELENBQ0osQ0FBQztTQUNMO1FBQ0QsT0FBTyxJQUFBLFVBQUksRUFBQTs7a0JBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7MENBR2YsaUNBQWlDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7O2tCQUV2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzNDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDUCxJQUFBLFVBQUksRUFBQTs4REFDa0MsTUFBTTtrQ0FDbEMsTUFBTTs7eUJBRWYsQ0FDUjs7U0FFUixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeEdELG9EQXdHQyJ9
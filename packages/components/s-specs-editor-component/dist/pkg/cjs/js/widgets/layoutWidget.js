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
        const values = this.values, defaultLayout = values.media[this._sMedia.defaultMedia], areasCount = this._sMedia.countAreas(defaultLayout.layout);
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map((media) => (0, lit_1.html) `
                        ${this.renderLabel({
            title: `<span style="font-weight: bold;">${(0, string_1.__upperFirst)(media)}${media === this._sMedia.defaultMedia
                ? ' (default) '
                : ''}</span>`,
            required: media === this._sMedia.defaultMedia,
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
                                ${this.values.media[media] &&
            media !== this._sMedia.defaultMedia
            ? (0, lit_1.html) `
                                          <div
                                              class="custom-select_item"
                                              tabindex="0"
                                              @pointerup=${(e) => {
                var _a, _b;
                (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
                this.clearValue(`media.${media}`);
            }}
                                          >
                                              <p class="_same-as-default">
                                                  Same as
                                                  ${this._sMedia.defaultMedia}
                                              </p>
                                          </div>
                                      `
            : ''}
                                ${this.propObj.layouts.map((layoutObj) => {
            var _a;
            // save layout as default
            if (defaultLayout.layout ===
                layoutObj.layout) {
                return '';
            }
            // same areas count than the default layout
            if (media !== this._sMedia.defaultMedia &&
                areasCount !==
                    this._sMedia.countAreas(layoutObj.layout)) {
                return '';
            }
            return (0, lit_1.html) ` <div
                                        class="custom-select_item ${((_a = this.values
                .media[media]) === null || _a === void 0 ? void 0 : _a.layout) ===
                layoutObj.layout
                ? 'active'
                : ''}"
                                        tabindex="0"
                                        @pointerup=${(e) => {
                var _a, _b;
                (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
                this.mergeValue({
                    media: {
                        [media]: layoutObj,
                    },
                });
            }}
                                    >
                                        ${this._renderLayout(layoutObj, media)}
                                    </div>`;
        })}
                            </div>
                        </div>
                    `)}
                ${this.renderWidget({
            id: 'container',
            type: 'Switch',
            title: 'Container',
            description: 'Specify if you want your layout to be wrapped inside a container or not',
            default: {
                value: this.values.container,
            },
        }, (values) => {
            this.setValue(values.value, {
                path: 'container',
            });
        })}
                ${this.renderWidget({
            id: 'gap',
            type: 'Select',
            title: 'Gap',
            description: 'Specify the gap you want beetween your areas',
            default: {
                value: this.values.gap,
            },
            options: this.propObj.gap.options,
        }, (values) => {
            this.setValue(values.value, {
                path: 'gap',
            });
        })}
                ${this.renderWidget({
            id: 'spacing',
            type: 'Select',
            responsive: true,
            title: 'Spacing',
            description: 'Specify the spacing you want beetween your items inside the areas',
            default: {
                value: this.values.spacing,
            },
            options: this.propObj.spacing.options,
        }, (values) => {
            this.setValue(values.value, {
                path: 'spacing',
                responsive: false,
            });
        })}
                ${this.renderWidget(Object.assign(Object.assign({}, this.propObj.spaces), { id: 'spaces', default: this.values.spaces }), (values) => {
            this.setValue(values, {
                path: 'spaces',
                responsive: false,
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBSTNCLG9FQUE2QztBQUM3Qyx1REFBMEQ7QUFFMUQsK0VBQXlEO0FBT3pELE1BQXFCLGlDQUFrQyxTQUFRLDRCQUFvQjtJQUsvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUxoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFNbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE1BQU0sR0FBaUIsSUFBSSxDQUFDLE1BQU0sRUFDcEMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDdkQsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvRCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztrQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNyQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7MEJBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNmLEtBQUssRUFBRSxvQ0FBb0MsSUFBQSxxQkFBWSxFQUNuRCxLQUFLLENBQ1IsR0FDRyxLQUFLLEtB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
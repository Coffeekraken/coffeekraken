import { html } from 'lit';
import __SMedia from '@coffeekraken/s-media';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentLayoutWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        this._renderedLayouts = {};
        if (!this.values.media && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }
        this._sMedia = new __SMedia();
    }
    render() {
        const values = this.values, defaultLayout = values.media[this._sMedia.defaultMedia], areasCount = this._sMedia.countAreas(defaultLayout.layout);
        return html `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map((media) => html `
                        ${this.renderLabel({
            title: `<span style="font-weight: bold;">${__upperFirst(media)}${media === this._sMedia.defaultMedia
                ? ' (default) '
                : ''}</span>`,
            required: media === this._sMedia.defaultMedia,
            description: `Set a layout for ${media}`,
        })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${!values.media[media]
            ? html `
                                          <p class="_same-as-default">
                                              Same as
                                              ${this._sMedia.defaultMedia}
                                          </p>
                                      `
            : html `
                                          ${this._renderLayout(values.media[media])}
                                      `}
                            </div>
                            <div class="custom-select_dropdown">
                                ${this.values.media[media] &&
            media !== this._sMedia.defaultMedia
            ? html `
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
            return html ` <div
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
        return html `
            <style>
                ${this._renderedLayouts[layoutObj.id].css}
            </style>
            <div
                class="s-layout _layout ${`s-carpenter-app-layout-widget-${layoutObj.id}`}"
            >
                ${this._renderedLayouts[layoutObj.id].areas.map((areaId) => html `
                            <div class="_area s-layout_area-${areaId}">
                                ${areaId}
                            </div>
                        `)}
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFPekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBa0MsU0FBUSxvQkFBb0I7SUFLL0UsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFMaEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBTWxCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE1BQU0sR0FBaUIsSUFBSSxDQUFDLE1BQU0sRUFDcEMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDdkQsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvRCxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7a0JBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDckIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFD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
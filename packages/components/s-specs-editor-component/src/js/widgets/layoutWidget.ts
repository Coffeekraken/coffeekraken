import { html } from 'lit';

import type { ISLayoutData } from '@specimen/types';

import __SMedia from '@coffeekraken/s-media';
import { __upperFirst } from '@coffeekraken/sugar/string';
import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export interface ISSpecsEditorComponentLayoutWidgetLayoutObj {
    id: string;
    layout: string;
}

export default class SSpecsEditorComponentLayoutWidget extends __SSpecsEditorWidget {
    _renderedLayouts = {};

    _sMedia;

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
        if (!this.values.media && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }

        this._sMedia = new __SMedia();
    }

    render() {
        const values = <ISLayoutData>this.values,
            defaultLayout = values.media[this._sMedia.defaultMedia],
            areasCount = this._sMedia.countAreas(defaultLayout.layout);

        return html`
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map(
                    (media) => html`
                        ${this.renderLabel({
                            title: `<span style="font-weight: bold;">${__upperFirst(
                                media,
                            )}${
                                media === this._sMedia.defaultMedia
                                    ? ' (default) '
                                    : ''
                            }</span>`,
                            required: media === this._sMedia.defaultMedia,
                            description: `Set a layout for ${media}`,
                        })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${!values.media[media]
                                    ? html`
                                          <p class="_same-as-default">
                                              Same as
                                              ${this._sMedia.defaultMedia}
                                          </p>
                                      `
                                    : html`
                                          ${this._renderLayout(
                                              values.media[media],
                                          )}
                                      `}
                            </div>
                            <div class="custom-select_dropdown">
                                ${this.values.media[media] &&
                                media !== this._sMedia.defaultMedia
                                    ? html`
                                          <div
                                              class="custom-select_item"
                                              tabindex="0"
                                              @pointerup=${(e) => {
                                                  document.activeElement?.blur?.();
                                                  this.clearValue(
                                                      `media.${media}`,
                                                  );
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
                                    // save layout as default
                                    if (
                                        defaultLayout.layout ===
                                        layoutObj.layout
                                    ) {
                                        return '';
                                    }

                                    // same areas count than the default layout
                                    if (
                                        media !== this._sMedia.defaultMedia &&
                                        areasCount !==
                                            this._sMedia.countAreas(
                                                layoutObj.layout,
                                            )
                                    ) {
                                        return '';
                                    }

                                    return html` <div
                                        class="custom-select_item ${this.values
                                            .media[media]?.layout ===
                                        layoutObj.layout
                                            ? 'active'
                                            : ''}"
                                        tabindex="0"
                                        @pointerup=${(e) => {
                                            document.activeElement?.blur?.();
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
                    `,
                )}
                ${this.renderWidget(
                    {
                        id: 'container',
                        type: 'Switch',
                        title: 'Container',
                        description:
                            'Specify if you want your layout to be wrapped inside a container or not',
                        default: {
                            value: this.values.container,
                        },
                    },
                    (values) => {
                        this.mergeValue({
                            container: values.value,
                        });
                    },
                )}
                ${this.renderWidget(
                    {
                        id: 'gap',
                        type: 'Select',
                        title: 'Gao',
                        description:
                            'Specify the gap you want beetween your areas',
                        default: {
                            value: this.values.gap,
                        },
                        options: this.propObj.gap.options,
                    },
                    (values) => {
                        this.mergeValue({
                            gap: values.value,
                        });
                    },
                )}
                ${this.renderWidget(
                    {
                        id: 'spacing',
                        type: 'Select',
                        title: 'Spacing',
                        description:
                            'Specify the spacing you want beetween your items inside the areas',
                        default: {
                            value: this.values.spacing,
                        },
                        options: this.propObj.spacing.options,
                    },
                    (values) => {
                        this.mergeValue({
                            spacing: values.value,
                        });
                    },
                )}
                ${this.renderWidget(
                    {
                        ...this.propObj.spaces,
                        id: 'spaces',
                        default: this.values.spaces,
                    },
                    (values) => {
                        this.mergeValue({
                            spaces: values,
                        });
                    },
                )}
            </div>
        `;
    }

    _renderLayout(layoutObj: any): any {
        if (!this._renderedLayouts[layoutObj.id]) {
            this._renderedLayouts[layoutObj.id] = this._sMedia.layoutCss(
                layoutObj.layout,
                {
                    selector: `.s-carpenter-app-layout-widget-${layoutObj.id}`,
                },
            );
        }
        return html`
            <style>
                ${this._renderedLayouts[layoutObj.id].css}
            </style>
            <div
                class="s-layout _layout ${`s-carpenter-app-layout-widget-${layoutObj.id}`}"
            >
                ${this._renderedLayouts[layoutObj.id].areas.map(
                    (areaId) =>
                        html`
                            <div class="_area s-layout_area-${areaId}">
                                ${areaId}
                            </div>
                        `,
                )}
            </div>
        `;
    }
}

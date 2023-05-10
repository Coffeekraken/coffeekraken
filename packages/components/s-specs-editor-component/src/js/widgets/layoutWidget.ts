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
        const values = <ISLayoutData>this.values;
        const defaultLayout = {
            id: '1',
            layout: '1',
        };

        return html`
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map(
                    (media) => html`
                        ${this.renderLabel({
                            title: `${__upperFirst(media)}${
                                media === this._sMedia.defaultMedia
                                    ? ' (default) '
                                    : ''
                            }`,
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
                                ${this.propObj.layouts.map(
                                    (layoutObj) => html`
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
                                            ${this._renderLayout(
                                                layoutObj,
                                                media,
                                            )}
                                        </div>
                                    `,
                                )}
                            </div>
                        </div>
                    `,
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

import { html } from 'lit';

import type { ISLayoutData } from '@specimen/types';

import __SMedia from '@coffeekraken/s-media';
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

    firstUpdated() {
        // _console.log('d');
        // const $select = this.editor.querySelector('.custom-select'),
        //     $dropdown = $select.querySelector('.custom-select_dropdown');
        // __makeFloat($dropdown, $select);
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
                            title: media,
                        })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${this._renderLayout(
                                    values.media[media] ?? defaultLayout,
                                )}
                            </div>
                            <div class="custom-select_dropdown">
                                ${this.propObj.layouts.map(
                                    (layoutObj) => html`
                                        <div
                                            class="custom-select_item"
                                            tabindex="0"
                                            @pointerup=${(e) => {
                                                let cells = values.cells;
                                                const areasCount =
                                                    this._sMedia.countAreas(
                                                        layoutObj.layout,
                                                    );
                                                if (areasCount < cells.length) {
                                                    for (
                                                        let i = cells.length;
                                                        i > areasCount;
                                                        i--
                                                    ) {}
                                                }

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
        _console.log('dl', layoutObj);
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
                class="_layout ${`s-carpenter-app-layout-widget-${layoutObj.id}`}"
            >
                ${this._renderedLayouts[layoutObj.id].areas.map(
                    (areaId) =>
                        html`
                            <div class="_area _area-${areaId}">${areaId}</div>
                        `,
                )}
            </div>
        `;
    }
}

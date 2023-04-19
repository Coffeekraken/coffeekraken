import { html } from 'lit';
import __SMedia from '@coffeekraken/s-media';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentLayoutWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a;
        super(deps);
        this._renderedLayouts = {};
        if (!((_a = this.values.layou) === null || _a === void 0 ? void 0 : _a.layout) && this.propObj.default) {
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
        const values = this.values;
        return html `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map((media) => html `
                        ${this.renderLabel({
            title: media,
        })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${this._renderLayout(values.layout, media)}
                            </div>
                            <div class="custom-select_dropdown">
                                ${this.propObj.layouts.map((layoutObj) => html `
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
        return html `
            <style>
                ${this._renderedLayouts[layoutObj.id].css}
            </style>
            <div
                class="_layout ${`s-carpenter-app-layout-widget-${layoutObj.id}`}"
            >
                ${this._renderedLayouts[layoutObj.id].areas.map((areaId) => html `
                            <div class="_area _area-${areaId}">${areaId}</div>
                        `)}
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQU96RCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFrQyxTQUFRLG9CQUFvQjtJQUsvRSxZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFMaEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBT2xCLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsWUFBWTtRQUNSLHFCQUFxQjtRQUNyQiwrREFBK0Q7UUFDL0Qsb0VBQW9FO1FBQ3BFLG1DQUFtQztJQUN2QyxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztrQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNyQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzBCQUNULElBQUksQ0FBQyxXQUFXLENBQUM7WUFDZixLQUFLLEVBQUUsS0FBSztTQUNmLENBQUM7OztrQ0FHUSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDOzs7a0NBR3hDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdEIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozt5REFJRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FDbkIsU0FBUyxDQUFDLE1BQU0sQ0FDbkIsQ0FBQztZQUNOLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFDcEIsQ0FBQyxHQUFHLFVBQVUsRUFDZCxDQUFDLEVBQUUsRUFDTCxHQUFFO2FBQ1A7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNaLEtBQUssRUFBRTtvQkFDSCxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVM7aUJBQ3JCO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7OENBRUMsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsU0FBUyxFQUNULEtBQUssQ0FDUjs7cUNBRVIsQ0FDSjs7O3FCQUdaLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBYyxFQUFFLEtBQWE7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDeEQsU0FBUyxDQUFDLE1BQU0sRUFDaEI7Z0JBQ0ksUUFBUSxFQUFFLGtDQUFrQyxTQUFTLENBQUMsRUFBRSxFQUFFO2FBQzdELENBQ0osQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLENBQUE7O2tCQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRzs7O2lDQUd4QixpQ0FBaUMsU0FBUyxDQUFDLEVBQUUsRUFBRTs7a0JBRTlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDM0MsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNQLElBQUksQ0FBQTtzREFDMEIsTUFBTSxLQUFLLE1BQU07eUJBQzlDLENBQ1I7O1NBRVIsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
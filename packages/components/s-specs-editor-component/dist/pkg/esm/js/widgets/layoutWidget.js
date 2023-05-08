import { html } from 'lit';
import __SMedia from '@coffeekraken/s-media';
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
        const values = this.values;
        const defaultLayout = {
            id: '1',
            layout: '1',
        };
        return html `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map((media) => {
            var _a;
            return html `
                        ${this.renderLabel({
                title: media,
            })}
                        <div class="custom-select" tabindex="0">
                            <div class="custom-select_value">
                                ${this._renderLayout((_a = values.media[media]) !== null && _a !== void 0 ? _a : defaultLayout)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQU96RCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFrQyxTQUFRLG9CQUFvQjtJQUsvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUxoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFNbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pDLE1BQU0sYUFBYSxHQUFHO1lBQ2xCLEVBQUUsRUFBRSxHQUFHO1lBQ1AsTUFBTSxFQUFFLEdBQUc7U0FDZCxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3JCLENBQUMsS0FBSyxFQUFFLEVBQUU7O1lBQUMsT0FBQSxJQUFJLENBQUE7MEJBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDZixLQUFLLEVBQUUsS0FBSzthQUNmLENBQUM7OztrQ0FHUSxJQUFJLENBQUMsYUFBYSxDQUNoQixNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLG1DQUFJLGFBQWEsQ0FDdkM7OztrQ0FHQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7Ozs7eURBSUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDZixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN6QixNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FDbkIsU0FBUyxDQUFDLE1BQU0sQ0FDbkIsQ0FBQztnQkFDTixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUMzQixLQUNJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQ3BCLENBQUMsR0FBRyxVQUFVLEVBQ2QsQ0FBQyxFQUFFLEVBQ0wsR0FBRTtpQkFDUDtnQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUNaLEtBQUssRUFBRTt3QkFDSCxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVM7cUJBQ3JCO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7OzhDQUVDLElBQUksQ0FBQyxhQUFhLENBQ2hCLFNBQVMsRUFDVCxLQUFLLENBQ1I7O3FDQUVSLENBQ0o7OztxQkFHWixDQUFBO1NBQUEsQ0FDSjs7U0FFUixDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWEsQ0FBQyxTQUFjO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQ3hELFNBQVMsQ0FBQyxNQUFNLEVBQ2hCO2dCQUNJLFFBQVEsRUFBRSxrQ0FBa0MsU0FBUyxDQUFDLEVBQUUsRUFBRTthQUM3RCxDQUNKLENBQUM7U0FDTDtRQUVELE9BQU8sSUFBSSxDQUFBOztrQkFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUc7OztpQ0FHeEIsaUNBQWlDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7O2tCQUU5RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzNDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDUCxJQUFJLENBQUE7c0RBQzBCLE1BQU0sS0FBSyxNQUFNO3lCQUM5QyxDQUNSOztTQUVSLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
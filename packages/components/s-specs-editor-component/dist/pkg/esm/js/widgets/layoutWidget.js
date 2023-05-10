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
        const values = this.values;
        const defaultLayout = {
            id: '1',
            layout: '1',
        };
        return html `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this._sMedia.medias.map((media) => html `
                        ${this.renderLabel({
            title: `${__upperFirst(media)}${media === this._sMedia.defaultMedia
                ? ' (default) '
                : ''}`,
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
                                ${this.propObj.layouts.map((layoutObj) => html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFPekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBa0MsU0FBUSxvQkFBb0I7SUFLL0UsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFMaEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBTWxCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE1BQU0sR0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxNQUFNLGFBQWEsR0FBRztZQUNsQixFQUFFLEVBQUUsR0FBRztZQUNQLE1BQU0sRUFBRSxHQUFHO1NBQ2QsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztrQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNyQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzBCQUNULElBQUksQ0FBQyxXQUFXLENBQUM7WUFDZixLQUFLLEVBQUUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQ3pCLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVk7Z0JBQy9CLENBQUMsQ0FBQyxhQUFhO2dCQUNmLENBQUMsQ0FBQyxFQUNWLEVBQUU7WUFDRixXQUFXLEVBQUUsb0JBQW9CLEtBQUssRUFBRTtTQUMzQyxDQUFDOzs7a0NBR1EsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFBOzs7Z0RBR00sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZOzt1Q0FFbEM7WUFDSCxDQUFDLENBQUMsSUFBSSxDQUFBOzRDQUNFLElBQUksQ0FBQyxhQUFhLENBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQ3RCO3VDQUNKOzs7a0NBR0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN0QixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzs7O3lEQUlFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNaLEtBQUssRUFBRTtvQkFDSCxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVM7aUJBQ3JCO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7OENBRUMsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsU0FBUyxFQUNULEtBQUssQ0FDUjs7cUNBRVIsQ0FDSjs7O3FCQUdaLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBYztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUN4RCxTQUFTLENBQUMsTUFBTSxFQUNoQjtnQkFDSSxRQUFRLEVBQUUsa0NBQWtDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7YUFDN0QsQ0FDSixDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQTs7a0JBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7MENBR2YsaUNBQWlDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7O2tCQUV2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzNDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDUCxJQUFJLENBQUE7OERBQ2tDLE1BQU07a0NBQ2xDLE1BQU07O3lCQUVmLENBQ1I7O1NBRVIsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
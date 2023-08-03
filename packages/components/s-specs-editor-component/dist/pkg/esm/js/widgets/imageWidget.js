import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { __i18n } from '@coffeekraken/s-i18n';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';
export default class SSpecsEditorComponentImageWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
    }
    validate(newValues) {
        if (this.propObj.required && !(newValues === null || newValues === void 0 ? void 0 : newValues.url)) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }
    render() {
        const values = this.values;
        return html `
            <div class="${this.editor.utils.cls('_image-widget')}">
                ${this.renderLabel()}
                <div class="_drop">
                    ${!values.url
            ? html `
                              <s-dropzone
                                  accept="image/*"
                                  ?upload=${this.settings.upload}
                                  ?multiple=${this.settings.multiple}
                                  class="s-bare"
                                  @s-dropzone.file=${(e) => {
                this.setValue(e.detail);
            }}
                              ></s-dropzone>
                          `
            : html `
                              <ul class="${this.editor.utils.cls('_images')}">
                                  ${this._renderImage(values.url)}
                              </ul>
                          `}
                </div>
                ${this.propObj.alt
            ? this.renderInlineInput({
                label: 'Alt',
                description: '',
                placeholder: __i18n('Image alternative text', {
                    id: 'global.image.alt',
                }),
                value: this.noneResponsiveValue.alt,
                onChange: (e) => {
                    this.mergeValue({ alt: e.target.value }, {
                        responsive: false,
                    });
                },
            })
            : ''}
            </div>
        `;
    }
    _renderImage(url) {
        return html `
            <li class="_image">
                <figure class="_preview s-media-container">
                    <img class="s-media" src="${url}" />
                </figure>
                <div class="_name">${url.split('/').pop()}</div>
                <div class="_spacer"></div>
                <div class="_actions">
                    ${this.editor.renderCopyButton(`${document.location.origin}/${url}`, this.editor.props.i18n.image.copyUrl)}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
            if (e.currentTarget.needConfirmation)
                return;
            this.resetValue();
            this.editor.apply();
        }}
                        confirm="Confirm?"
                    >
                        ${unsafeHTML(this.editor.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVE5QyxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO0FBUzVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsb0JBQW9CO0lBRzlFLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxHQUFHLENBQUEsRUFBRTtZQUMxQyxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhDLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7a0JBQzlDLElBQUksQ0FBQyxXQUFXLEVBQUU7O3NCQUVkLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDVCxDQUFDLENBQUMsSUFBSSxDQUFBOzs7NENBR2MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNOzhDQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7O3FEQUVmLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLENBQUM7OzJCQUVSO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTsyQ0FDYSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO29DQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7OzJCQUV0Qzs7a0JBRVQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDbkIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsV0FBVyxFQUFFLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRTtvQkFDMUMsRUFBRSxFQUFFLGtCQUFrQjtpQkFDekIsQ0FBQztnQkFDRixLQUFLLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUc7Z0JBQ25DLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNaLElBQUksQ0FBQyxVQUFVLENBQ1gsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFDdkI7d0JBQ0ksVUFBVSxFQUFFLEtBQUs7cUJBQ3BCLENBQ0osQ0FBQztnQkFDTixDQUFDO2FBQ0osQ0FBQztZQUNKLENBQUMsQ0FBQyxFQUFFOztTQUVmLENBQUM7SUFDTixDQUFDO0lBQ0QsWUFBWSxDQUFDLEdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUE7OztnREFHNkIsR0FBRzs7cUNBRWQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7OztzQkFHbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDMUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3ZDOzs7cUNBR2dCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2dCQUFFLE9BQU87WUFDN0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7OzBCQUdDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSTNELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
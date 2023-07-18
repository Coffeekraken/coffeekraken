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
                console.log('e.', e.detail);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVE5QyxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO0FBUzVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsb0JBQW9CO0lBRzlFLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxHQUFHLENBQUEsRUFBRTtZQUMxQyxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhDLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7a0JBQzlDLElBQUksQ0FBQyxXQUFXLEVBQUU7O3NCQUVkLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDVCxDQUFDLENBQUMsSUFBSSxDQUFBOzs7NENBR2MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNOzhDQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7O3FEQUVmLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsQ0FBQzs7MkJBRVI7WUFDSCxDQUFDLENBQUMsSUFBSSxDQUFBOzJDQUNhLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7b0NBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7MkJBRXRDOztrQkFFVCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7WUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUNuQixLQUFLLEVBQUUsS0FBSztnQkFDWixXQUFXLEVBQUUsRUFBRTtnQkFDZixXQUFXLEVBQUUsTUFBTSxDQUFDLHdCQUF3QixFQUFFO29CQUMxQyxFQUFFLEVBQUUsa0JBQWtCO2lCQUN6QixDQUFDO2dCQUNGLEtBQUssRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRztnQkFDbkMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FDWCxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUN2Qjt3QkFDSSxVQUFVLEVBQUUsS0FBSztxQkFDcEIsQ0FDSixDQUFDO2dCQUNOLENBQUM7YUFDSixDQUFDO1lBQ0osQ0FBQyxDQUFDLEVBQUU7O1NBRWYsQ0FBQztJQUNOLENBQUM7SUFDRCxZQUFZLENBQUMsR0FBVztRQUNwQixPQUFPLElBQUksQ0FBQTs7O2dEQUc2QixHQUFHOztxQ0FFZCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTs7O3NCQUduQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUMxQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDdkM7OztxQ0FHZ0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0I7Z0JBQUUsT0FBTztZQUM3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7MEJBR0MsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7U0FJM0QsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
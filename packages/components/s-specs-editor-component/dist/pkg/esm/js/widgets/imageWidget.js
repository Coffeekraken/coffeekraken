import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { __i18n } from '@coffeekraken/s-i18n';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentImageWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
    }
    render() {
        const values = this.values;
        _console.log('Val', this.noneResponsiveValue);
        return html `
            <div class="${this.editor.utils.cls('_image-widget')}">
                ${this.renderLabel()}
                <div class="_drop">
                    ${!values.url
            ? html `
                              <s-dropzone
                                  accept="image/*"
                                  upload
                                  class="s-bare"
                                  @s-dropzone.file=${(e) => {
                this.setValue({
                    url: e.detail[0].url,
                });
                //   if (
                //       this.isResponsive() &&
                //       this.editor.isDefaultMedia()
                //   ) {
                //       _console.log('SET');
                //       this.setValue(
                //           <ISImageData>e.detail[0].url,
                //           {
                //               path: 'url',
                //               noneResponsive: true,
                //           },
                //       );
                //   }
            }}
                              ></s-dropzone>
                          `
            : html `
                              <ul class="${this.editor.utils.cls('_images')}">
                                  ${this._renderImage(values.url)}
                              </ul>
                          `}
                </div>
                ${this.renderInlineInput({
            label: 'Alt',
            description: '',
            placeholder: __i18n('Image alternative text', {
                id: 'global.image.alt',
            }),
            value: this.noneResponsiveValue.alt,
            onChange: (e) => {
                this.mergeValue({
                    alt: e.target.value,
                }, {
                    noneResponsive: true,
                });
            },
        })}
                ${this.renderInlineInput({
            label: 'Title',
            description: '',
            placeholder: __i18n('Image title', {
                id: 'global.image.title',
            }),
            value: this.noneResponsiveValue.title,
            onChange: (e) => {
                this.mergeValue({
                    title: e.target.value,
                }, {
                    noneResponsive: true,
                });
            },
        })}
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
            this.editor.clearValue(this.path, {
                media: this.editor.props.media,
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSTNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsb0JBQW9CO0lBQzlFLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFeEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFOUMsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztrQkFDOUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7c0JBRWQsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNULENBQUMsQ0FBQyxJQUFJLENBQUE7Ozs7O3FEQUt1QixDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQ3ZCLENBQUMsQ0FBQztnQkFFSCxTQUFTO2dCQUNULCtCQUErQjtnQkFDL0IscUNBQXFDO2dCQUNyQyxRQUFRO2dCQUNSLDZCQUE2QjtnQkFDN0IsdUJBQXVCO2dCQUN2QiwwQ0FBMEM7Z0JBQzFDLGNBQWM7Z0JBQ2QsNkJBQTZCO2dCQUM3QixzQ0FBc0M7Z0JBQ3RDLGVB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
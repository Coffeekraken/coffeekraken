import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentImageWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSzNELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQ0FBaUMsU0FBUSxvQkFBb0I7SUFDOUUsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2tCQUM5QyxJQUFJLENBQUMsV0FBVyxFQUFFOztzQkFFZCxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs7cURBS3VCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILFNBQVM7Z0JBQ1QsK0JBQStCO2dCQUMvQixxQ0FBcUM7Z0JBQ3JDLFFBQVE7Z0JBQ1IsNkJBQTZCO2dCQUM3Qix1QkFBdUI7Z0JBQ3ZCLDBDQUEwQztnQkFDMUMsY0FBYztnQkFDZCw2QkFBNkI7Z0JBQzdCLHNDQUFzQztnQkFDdEMsZUFBZTtnQkFDZixXQUFXO2dCQUNYLE1BQU07WUFDVixDQUFDOzsyQkFFUjtZQUNILENBQUMsQ0FBQyxJQUFJLENBQUE7MkNBQ2EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQ0FDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDOzsyQkFFdEM7OztTQUdsQixDQUFDO0lBQ04sQ0FBQztJQUNELFlBQVksQ0FBQyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFBOzs7Z0RBRzZCLEdBQUc7O3FDQUVkLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFOzs7c0JBR25DLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQzFCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN2Qzs7O3FDQUdnQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO2FBQ2pDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7OzBCQUdDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSTNELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==
import { html } from 'lit';

export default function (component) {
    return {
        keepOriginals: true,
        isActive() {
            return component.props.features?.upload;
        },
        html({ propObj, values, path }) {
            if (!values) {
                values = {};
            }

            return html`
                <div class="${component.utils.cls('_dropzone')}">
                    <label
                        class="${component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                        @click=${(e) => e.preventDefault()}
                    >
                        ${component._renderLabel(propObj, path)}
                    </label>
                    <s-dropzone
                        accept="image/*"
                        files="${values.url}"
                        upload
                        @s-dropzone.clear=${(e) => {
                            component.clearValue([...path, 'url']);
                            component.apply();
                        }}
                        @s-dropzone.file=${(e) => {
                            component.setValue(
                                [...path, 'url'],
                                e.detail[0].url,
                            );
                            component.apply();
                        }}
                    ></s-dropzone>
                </div>
            `;
        },
    };
}

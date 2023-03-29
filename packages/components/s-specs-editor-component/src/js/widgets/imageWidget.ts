import { html } from 'lit';

import type { ISImage } from '@specimen/types';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return component.props.features?.upload;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = {};
            }

            return {
                error,
                warning,
                html: html`
                    <div class="${component.utils.cls('_image-widget')}">
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                            @click=${(e) => e.preventDefault()}
                        >
                            ${component.renderLabel(propObj, path)}
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
                                component.setValue(path, <ISImage>e.detail[0]);
                                component.apply();
                            }}
                        ></s-dropzone>
                    </div>
                `,
            };
        },
    };
}

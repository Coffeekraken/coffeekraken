import { html } from 'lit';

export default function (component) {
    return {
        html({ propObj, values }) {
            return html`
                <div class="${component.utils.cls('_dropzone')}">
                    <s-dropzone
                        accept="image/*"
                        files="${values.url}"
                        upload
                    ></s-dropzone>
                </div>
            `;
        },
        events: {
            's-dropzone.clear': (e) => {
                const $url = e.$scope.querySelector(`input[name="url"]`);

                if ($url) {
                    $url.removeAttribute('value');
                    $url.value = '';
                    $url.dispatchEvent(
                        new CustomEvent('change', {
                            bubbles: true,
                        }),
                    );
                }
            },
            's-dropzone.file': (e) => {
                const $url = e.$scope.querySelector(`input[name="url"]`);
                if ($url) {
                    // $url.setAttribute('value', e.detail[0].url);
                    $url.value = e.detail[0].url;
                    $url.dispatchEvent(
                        new CustomEvent('change', {
                            bubbles: true,
                        }),
                    );
                }
            },
        },
    };
}

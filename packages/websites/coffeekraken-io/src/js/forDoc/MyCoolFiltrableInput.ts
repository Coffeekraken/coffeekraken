import { define } from '@coffeekraken/s-filtrable-input-component';
import __wait from '@coffeekraken/sugar/shared/time/wait';

export default function () {
    define({
        items: async () => {
            await __wait(1000);
            return [
                { title: 'Hello', value: 'World' },
                { title: 'Plop', value: 'Yop' },
            ];
        },
        onSele
        templates: ({ type, item, html }) => {
            switch (type) {
                case 'item':
                    return html`
                        <li class="__item">
                            My title: ${item.title}
                        </li>
                    `;
                    break;
                case 'loading':
                    return html`
                        <li class="__loading">
                            Loading, please wait...
                        </li>
                    `;
                    break;
                case 'empty':
                    return html`
                        <li class="__empty">
                            No items found...
                        </li>
                    `;
                    break;
            }
        },
    }, 'my-cool-filtrable-input');
}

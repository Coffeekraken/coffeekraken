import { define } from '@coffeekraken/s-filtrable-input-component';
import { __wait } from '@coffeekraken/sugar/datetime';

(() => {
    define(
        {
            items: async () => {
                await __wait(1000);
                return [
                    { title: 'Hello', value: 'World' },
                    { title: 'Plop', value: 'Yop' },
                ];
            },
            templates: ({ type, item, html }) => {
                switch (type) {
                    case 'item':
                        return html`
                            <li class="_item">My title: ${item.title}</li>
                        `;
                        break;
                    case 'loading':
                        return html`
                            <li class="_loading">Loading, please wait...</li>
                        `;
                        break;
                    case 'empty':
                        return html`
                            <li class="_empty">No items found...</li>
                        `;
                        break;
                }
            },
        },
        'my-cool-filtrable-input',
    );
})();

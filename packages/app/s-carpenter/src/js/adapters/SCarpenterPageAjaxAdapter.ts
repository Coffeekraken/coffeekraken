import { __unescapeHtml } from '@coffeekraken/sugar/html';

import type { ISCarpenterPageAdapterDeps } from '../SCarpenterPageAdapter.js';
import __SCarpenterPageAdapter from '../SCarpenterPageAdapter.js';

export default class SCarpenterPageAjaxAdapter extends __SCarpenterPageAdapter {
    constructor(deps: ISCarpenterPageAdapterDeps) {
        super(deps);
    }

    async delete(): Promise<any> {
        const response = await fetch(
            this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', this.page.uid),
            {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
            },
        );

        const json = await response.json();
        return json;
    }

    async getData(): Promise<any> {
        let raw = this.page.$elm.getAttribute('s-page');
        let data;

        // try json
        if (raw) {
            try {
                data = JSON.parse(raw);
            } catch (e) {}
        }

        // ajax call
        if (!data && raw?.match(/^(https?\:\/\/|\/)/)) {
            const rawResponse = await fetch(raw, {
                method: 'GET',
            });
            data = await rawResponse.json();
        }

        // template in the dom
        if (!data) {
            try {
                data = JSON.parse(__unescapeHtml(this.page.$page.innerHTML));
            } catch (e) {
                console.log(this.page.$page.innerHTML);
                console.error(e.message);
            }
        }

        return data;
    }

    async save(data: ISCarpenterNode): Promise<void> {
        const response = await fetch(
            this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', data.uid),
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data),
            },
        );
    }

    async setData(data): Promise<HTMLTemplateElement> {
        const rawResponse = await fetch(
            this.carpenter.props.endpoints.pages
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', data.uid),
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );

        const response = await rawResponse.json();

        const $newPage = document.createElement('template');
        $newPage.setAttribute('s-page', response.uid);
        $newPage.innerHTML = JSON.stringify(
            {
                ...response,
            },
            null,
            4,
        );
        this.page.$page.after($newPage);
        this.page.$page.remove();

        // return the new page
        return $newPage;
    }
}

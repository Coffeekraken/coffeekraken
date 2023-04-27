import { __unescapeHtml } from '@coffeekraken/sugar/html';

import type { ISRenderableNode } from '@specimen/types';

import type { ISCarpenterAdapterDeps } from '../SCarpenterAdapter';
import __SCarpenterAdapter from '../SCarpenterAdapter';

export default class SCarpenterAjaxAdapter extends __SCarpenterAdapter {
    constructor(deps: ISCarpenterAdapterDeps) {
        super(deps);
    }

    async delete(): Promise<any> {
        const response = await fetch(
            this.carpenter.props.deleteComponentUrl.replace(
                '%uid',
                this.element.uid,
            ),
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
        let raw = this.element.$elm.getAttribute('s-node');
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
                data = JSON.parse(__unescapeHtml(this.element.$node.innerHTML));
            } catch (e) {
                console.log(this.element.$node.innerHTML);
                console.error(e.message);
            }
        }

        // specs object
        if (!data.specsObj) {
            const response = await fetch(
                this.carpenter.props.specsObjUrl.replace(':specs', this.specs),
                {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    referrerPolicy: 'no-referrer',
                },
            );

            const specsObj = await response.json();
            data.specsObj = specsObj;
        }

        return data;
    }

    async save(data: ISRenderableNode): Promise<void> {
        const response = await fetch(this.carpenter.props.saveComponentUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        });
    }

    async setData(data): Promise<HTMLElement> {
        const rawResponse = await fetch(
            this.carpenter.props.pagesUrl.replace('%specs', this.specs),
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );

        const responseHtml = await rawResponse.text();
        const doc = new DOMParser().parseFromString(responseHtml, 'text/html'),
            // @ts-ignore
            $newComponent: HTMLElement = doc.body.firstChild,
            $newNode: HTMLTemplateElement =
                $newComponent.querySelector('[s-node]');

        // keep the element id and the s-specs
        $newComponent.id = this.element.$elm.id;

        // @ts-ignore
        this.element.$elm.after($newComponent);

        // remove old element
        this.element.$elm.remove();

        // return the new node
        return $newNode;
    }
}

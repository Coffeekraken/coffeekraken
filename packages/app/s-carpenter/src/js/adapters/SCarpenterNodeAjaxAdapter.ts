import { __unescapeHtml } from '@coffeekraken/sugar/html';

import type { ISCarpenterNodeAdapterDeps } from '../SCarpenterNodeAdapter.js';
import __SCarpenterNodeAdapter from '../SCarpenterNodeAdapter.js';

import type { ISCarpenterNode } from '../../types/_exports.js';

export default class SCarpenterNodeAjaxAdapter extends __SCarpenterNodeAdapter {
    constructor(deps: ISCarpenterNodeAdapterDeps) {
        super(deps);
    }

    async delete(): Promise<any> {
        const response = await fetch(
            this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', this.element.uid),
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
                this.carpenter.props.endpoints.specs
                    .replace('%base', this.carpenter.props.endpoints.base)
                    .replace('%specs', this.specs),
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

    async status(uid: string): Promise<void> {
        const response = await fetch(
            `${this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', uid)}/status`,
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
        return await response.json();
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

    async setData(data): Promise<HTMLElement> {
        const rawResponse = await fetch(
            this.carpenter.props.endpoints.nodes
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
        const doc = new DOMParser().parseFromString(response.html, 'text/html'),
            // @ts-ignore
            $newComponent: HTMLElement = doc.body.firstChild,
            $newNode: HTMLTemplateElement =
                $newComponent.querySelector('[s-node]');

        // keep the element id and the s-specs
        $newComponent.id = this.element.$elm.id;

        // get all the containers
        const containers = Array.from(
            this.element.$elm.querySelectorAll('[s-container]') ?? [],
        )
            .filter(($container) => {
                return $container.querySelector('[s-container]') === null;
            })
            .map(($container) => {
                return {
                    containerId: $container.getAttribute('s-container'),
                    html: $container.innerHTML,
                    $elm: $container,
                };
            });

        // @ts-ignore
        this.element.$elm.after($newComponent);

        // remove old element
        this.element.$elm.remove();

        // restore "containers"
        let lastContainer;
        containers.forEach((container) => {
            const $container = $newComponent.querySelector(
                `[s-container="${container.containerId}"]`,
            );

            if (!$container && lastContainer) {
                // put the content of the container inside the last one
                lastContainer.$elm.innerHTML += container.html;
                return;
            }

            // add the old children inside the new container
            Array.from(container.$elm.children).forEach((child) => {
                $container.appendChild(child);
            });

            // update the lastContainer
            lastContainer = container;
        });

        // return the new node
        return $newNode;
    }
}

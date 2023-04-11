import { __unescapeHtml } from '@coffeekraken/sugar/html';

export default {
    async load({ dotpath, values, component }): Promise<HTMLElement> {
        const rawResponse = await fetch(
            component.props.pagesLink.replace('%dotpath', dotpath),
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            },
        );

        const responseHtml = await rawResponse.text();
        const doc = new DOMParser().parseFromString(responseHtml, 'text/html'),
            // @ts-ignore
            $newComponent: HTMLElement = doc.body.firstChild;

        return $newComponent;
    },

    async change({ dotpath, values, component, $elm }): Promise<HTMLElement> {
        // load the new component
        const $newComponent = await this.load({
            dotpath,
            values,
            component,
        });

        // @ts-ignore
        if ($elm) {
            // add the new component after the current one
            $elm.after($newComponent);

            // remove old element
            $elm.remove();
        }

        // return the new component
        return $newComponent;
    },

    async getData({ $elm }): Promise<any> {
        let raw = $elm.getAttribute('s-specs-data');
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
            for (let i = 0; i < $elm.children.length; i++) {
                const $child = $elm.children[i];
                if (
                    $child.tagName === 'TEMPLATE' &&
                    $child.hasAttribute('s-specs-data')
                ) {
                    try {
                        data = JSON.parse(__unescapeHtml($child.innerHTML));
                    } catch (e) {
                        console.log($child.innerHTML);
                        console.error(e.message);
                    }
                    break;
                }
            }
        }

        return data;
    },

    async setValues({
        $elm,
        values,
        dotpath,
        component,
    }): Promise<HTMLElement> {
        // load the new component
        const $newComponent = await this.load({
            dotpath,
            values,
            component,
        });

        // keep the element id
        $newComponent.id = $elm.id;

        // @ts-ignore
        $elm.after($newComponent);

        // remove old element
        $elm.remove();

        // return the new component
        return $newComponent;
    },
};

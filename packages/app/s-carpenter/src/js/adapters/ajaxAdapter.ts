import { __unescapeHtml } from '@coffeekraken/sugar/html';

export default {
    async load({ dotpath, props, component }): Promise<HTMLElement> {
        console.log('LOA', dotpath, props, component.props);

        const rawResponse = await fetch(
            component.props.pagesLink.replace('%dotpath', dotpath),
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props),
            },
        );

        const responseHtml = await rawResponse.text();
        const doc = new DOMParser().parseFromString(responseHtml, 'text/html'),
            // @ts-ignore
            $newComponent: HTMLElement = doc.body.firstChild;

        return $newComponent;
    },

    async change({ dotpath, props, component, $elm }): Promise<HTMLElement> {
        // load the new component
        const $newComponent = await this.load({
            dotpath,
            props,
            component,
        });

        _console.log('new', $newComponent, $elm);

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

    async getProps({ $elm }): Promise<any> {
        let raw = $elm.getAttribute('s-specs-values');
        let props;

        // try json
        if (raw) {
            try {
                props = JSON.parse(raw);
            } catch (e) {}
        }

        // ajax call
        if (!props && raw?.match(/^(https?\:\/\/|\/)/)) {
            const rawResponse = await fetch(raw, {
                method: 'GET',
            });
            props = await rawResponse.json();
        }

        // template in the dom
        if (!props) {
            for (let i = 0; i < $elm.children.length; i++) {
                const $child = $elm.children[i];
                if (
                    $child.tagName === 'TEMPLATE' &&
                    $child.hasAttribute('s-specs-values')
                ) {
                    try {
                        props = JSON.parse(__unescapeHtml($child.innerHTML));
                    } catch (e) {
                        console.log($child.innerHTML);
                        console.error(e.message);
                    }
                    break;
                }
            }
        }

        return props;
    },

    async setProps({ $elm, props, component }): Promise<HTMLElement> {
        // load the new component
        const $newComponent = await this.load({
            dotpath: component.currentSpecs.metas.dotpath,
            props,
            component,
        });

        _console.log('SET', $newComponent, $elm);

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

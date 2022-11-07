export default {
    async load({ dotpath, props, component }): Promise<HTMLElement> {
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
        console.log('ddd', $elm.getAttribute('values'));

        if ($elm.hasAttribute('values')) {
            const data = JSON.parse($elm.getAttribute('values'));
            console.log('ada', data);
            return data;
        }

        return {};
    },

    async setProps({ $elm, props, component }): Promise<HTMLElement> {
        // load the new component
        const $newComponent = await this.load({
            dotpath: component.state.currentSpecs.metas.dotpath,
            props,
            component,
        });

        // @ts-ignore
        $elm.after($newComponent);

        // remove old element
        $elm.remove();

        // return the new component
        return $newComponent;
    },
};

export default {
    async apply($elm: HTMLElement, props: any): Promise<HTMLElement> {
        console.log('Set', $elm, props);

        const rawResponse = await fetch(document.location.href, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });

        const responseHtml = await rawResponse.text();

        const doc = new DOMParser().parseFromString(responseHtml, 'text/html'),
            // @ts-ignore
            $newComponent: HTMLElement = doc.body.firstChild;

        // @ts-ignore
        $elm.after($newComponent);

        $elm.remove();

        return $newComponent;
    },
};

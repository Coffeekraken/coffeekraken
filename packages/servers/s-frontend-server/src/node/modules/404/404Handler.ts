export default function _404Handler({ req, res, pageConfig }) {
    return new Promise(async (resolve) => {
        // rendering view using data
        const _404Res = await res.viewRenderer.render(
            'pages.error.404',
            {},
            {
                dataFile: true,
            },
        );

        res.status(404);
        res.type('text/html');
        res.send(_404Res.value);
        resolve(_404Res.value);
    });
}

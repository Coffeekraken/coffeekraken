export default (api) => {
    if (api.env.platform !== 'node') return;

    return {
        layout: {
            //    headerImageUrl: '/dist/img/doc/docHeader.jpg'
        },
    };
};

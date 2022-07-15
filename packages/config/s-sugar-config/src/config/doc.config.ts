export default (env, config) => {
    if (env.platform !== 'node') return;

    return {
        layout: {
            //    headerImageUrl: '/dist/img/doc/docHeader.jpg'
        },
    };
};

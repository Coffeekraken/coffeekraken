export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        layout: {
            headerImageUrl: '/dist/img/doc/readmeHeader.jpg',
        },
        shields: '[config.shieldsio.shields]',
    };
}

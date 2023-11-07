export default (env, config) => {
    if (env.platform !== 'node') return;
    return {
        build: {
            // exclude: [
            //     '**/__tests__/**/*',
            //     '**/__tests__.wip/**/*',
            //     '**/__wip__/**/*',
            //     '**/mixins/**/*',
            //     '**/functions/**/*',
            // ],
        },
    };
};

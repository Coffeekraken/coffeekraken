// @ts-ignore
if (global && !global.document) global.document = {};

export default {
    /**
     * @name            env
     * @type            String
     * @namespace       config.env
     * @default         process.env.NODE_ENV ?? document.env.ENV ?? 'dev`
     *
     * Specify the environment env. This is usually "production" or "dev" as value.
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // @ts-ignore
    env: process?.env?.NODE_ENV ?? document?.env?.ENV ?? 'development',

    git: {
        template: {
            name: 'Template',
            commit: {
                id: undefined,
                time: undefined,
            },
        },
    },
};

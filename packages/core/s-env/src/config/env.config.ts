// @ts-ignore
if (global && !global.window) global.window = {};

export default {
    /**
     * @name            env
     * @type            String
     * @namespace       config.env
     * @default         process.env.NODE_ENV ?? window.env.ENV ?? 'dev`
     *
     * Specify the environment env. This is usually "production" or "dev" as value.
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // @ts-ignore
    env: process?.env?.NODE_ENV ?? window?.env?.ENV ?? 'development',
};

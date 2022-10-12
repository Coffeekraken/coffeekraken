import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';

export async function preprocess(api) {
    const config = (await __loadConfigFile('mitosis.config.js')) ?? {};
    return __deepMerge(api.this, config);
}

export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        server: {
            /**
             * @name            port
             * @namespace       config.mitosis.server
             * @type            Number
             * @default         3001
             *
             * Specify the mitosis server port
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            port: 3001,
            proxy: {
                '^/$': {
                    target: 'http://127.0.0.1:8082',
                    changeOrigin: true,
                },
                '/dist/css/index.css': {
                    target: 'http://127.0.0.1:8082',
                    changeOrigin: true,
                },
                '/dist/js/index.esm.js': {
                    target: 'http://127.0.0.1:8082',
                    changeOrigin: true,
                },
            },
        },
    };
}

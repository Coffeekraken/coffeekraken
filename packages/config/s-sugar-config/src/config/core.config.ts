import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default function (env) {
    if (env.platform !== 'node') return;

    return {
        namespace: {
            /**
             * @name            pattern
             * @namespace       config.core.namespace
             * @type            String
             * @default         {path}
             *
             * Specify a generation pattern to generate the namespace. Here's the available tokens:
             * - {package.name}: The package name specified in the package.json
             * - {package.version}: The package version specified in the package.json
             * - {path}: The passed path parameter
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            pattern: '{path}',

            /**
             * @name            context
             * @namespace       config.core.namespace
             * @type            String
             * @default         __packageRoot()
             *
             * Specify the context in which to generate the namespace.
             * The context is simply a root folder from which to search for the package.json
             * file to get the name that serve to the namespace generation
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            context: __packageRoot(),
        },
    };
}

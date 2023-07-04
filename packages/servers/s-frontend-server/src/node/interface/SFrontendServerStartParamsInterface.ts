// @ts-nocheck

import __SEnv from '@coffeekraken/s-env';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SFrontendServerStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontendServerStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            hostname: {
                description: 'Server hostname',
                type: 'String',
                alias: 'o',
                required: true,
                default:
                    __SSugarConfig.get('frontendServer.hostname') ||
                    '127.0.0.1',
            },
            port: {
                description: 'Server port',
                type: 'Number',
                alias: 'p',
                default: __SSugarConfig.get('frontendServer.port') || 8080,
            },
            listen: {
                description:
                    'Specify if you want the server to listen on specified hostname and port for requests or not',
                type: 'Boolean',
                alias: 'l',
                default: true,
            },
            rootDir: {
                description: 'Server root directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.rootDir'),
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.viewsDir'),
            },
            pagesDir: {
                description: 'Server pages directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.pagesDir'),
            },
            logLevel: {
                description: 'Specify the log level you want for your server',
                type: 'String',
                values: [
                    'silent',
                    'error',
                    'warn',
                    'debug',
                    'info',
                    'verbose',
                    'silly',
                ],
                default:
                    __SSugarConfig.get('frontendServer.logLevel') ?? 'info',
            },
            target: {
                description:
                    'Specify the target of the build. Can be "development" or "production"',
                values: ['development', 'production'],
                alias: 't',
                default: __SEnv.get('target') ?? 'development',
            },
        };
    }
}

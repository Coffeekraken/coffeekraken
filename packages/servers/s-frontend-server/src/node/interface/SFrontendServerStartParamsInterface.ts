// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontendServerStartParamsInterface
 * @namespace           node.interface
 * @type.                      Class
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
                default: __SSugarConfig.get('frontendServer.port') || 3000,
                level: 1,
            },
            rootDir: {
                description: 'Server root directory',
                type: 'String',
                default:
                    __SSugarConfig.get('frontendServer.rootDir') ||
                    __packageRoot(process.cwd()),
                level: 1,
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default:
                    __SSugarConfig.get('frontendServer.viewsDir') ||
                    __packageRoot(process.cwd()) + '/views',
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
            prod: {
                description:
                    'Specify that we want the server to act "like" a production one with compression etc...',
                type: 'Boolean',
                default: false,
            },
        };
    }
}

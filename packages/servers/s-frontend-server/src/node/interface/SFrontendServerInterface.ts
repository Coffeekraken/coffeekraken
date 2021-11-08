// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontendServerInterface
 * @namespace           s-frontend-server
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFrontendServerInterface extends __SInterface {
    static get _definition() {
        return {
            hostname: {
                type: 'String',
                alias: 'o',
                description: 'Server hostname',
                required: true,
                default:
                    __SSugarConfig.get('frontendServer.hostname') ||
                    '127.0.0.1',
            },
            port: {
                type: 'Number',
                alias: 'p',
                description: 'Server port',
                default: __SSugarConfig.get('frontendServer.port') || 3000,
                level: 1,
            },
            rootDir: {
                type: 'String',
                description: 'Server root directory',
                default:
                    __SSugarConfig.get('frontendServer.rootDir') ||
                    __packageRoot(process.cwd()),
                level: 1,
            },
            viewsDir: {
                type: 'String',
                description: 'Server views directory',
                default:
                    __SSugarConfig.get('frontendServer.viewsDir') ||
                    __packageRoot(process.cwd()) + '/views',
            },
            logLevel: {
                type: 'String',
                description: 'Specify the log level you want for your server',
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
                type: 'Boolean',
                description:
                    'Specify that we want the server to act "like" a production one with compression etc...',
                default: false,
            },
        };
    }
}

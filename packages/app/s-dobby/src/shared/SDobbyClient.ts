import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';

import type {
    ISDobbyClientAction,
    ISDobbyClientSettings,
    ISDobbyFsPoolSettings,
    ISDobbyPool,
    ISDobbyTaskMetas,
} from './types';

/**
 * @name                SDobbyClient
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base adapter to save the configuration of the dobby deamon
 *
 * @param           {ISDobbyClientSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @example         js
 * import { __SDobbyClient } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyAdapter extends __SDobbyClient {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobbyClient extends __SClass {
    settings: ISDobbyClientSettings;

    /**
     * @name        _socket
     * @type        WebSocket
     *
     * Store the socket connection to the server
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _socket: WebSocket;

    /**
     * @name        pools
     * @type        Any
     *
     * Store the registered pools
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    pools: Record<string, ISDobbyPool> = {};

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: ISDobbyFsPoolSettings) {
        super(
            __deepMerge(
                {
                    host: 'localhost',
                    port: 8787,
                },
                settings ?? {},
            ),
        );

        // update local tasks stack
        this.on('pool', (res: any) => {
            console.log('POOL', res);
            this.pools[res.pool.uid] = res;
        });
        // this.on('pool.config', (res: any) => {
        //     if (!this.pools[res.pool.uid]) {
        //         return;
        //     }
        //     this.pools[res.pool.uid].config = res.config;
        // });
    }

    /**
     * Connect to server
     */
    connect(): void {
        // Create WebSocket connection.
        this._socket = new WebSocket(
            `ws://${this.settings.host}:${this.settings.port}`,
        );

        // Connection opened
        this._socket.addEventListener('open', (event) => {
            this._socket.send('Hello Server!');
        });

        // Listen for messages
        this._socket.addEventListener('message', async (event) => {
            let data = event.data;
            try {
                data = await event.data.text();
            } catch (e) {}
            try {
                data = JSON.parse(data);
            } catch (e) {}

            // dispatch the event
            document.dispatchEvent(
                new CustomEvent(`dobby.${data.type}`, {
                    detail: data,
                }),
            );
        });
    }

    getTasks(): Promise<Record<string, ISDobbyTaskMetas>> {
        return new Promise(async (resolve) => {});
    }

    on(event: string, callback: function): function {
        const cb = (e) => {
            callback(e.detail.data ?? e.detail);
        };
        document.addEventListener(`dobby.${event}`, cb);
        return function () {
            document.removeEventListener(`dobby.${event}`, cb);
        };
    }

    exec(action: ISDobbyClientAction): void {
        this._socket.send(JSON.stringify(action));
    }
}

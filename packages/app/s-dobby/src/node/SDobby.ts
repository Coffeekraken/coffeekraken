import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
// import __SPromise from '@coffeekraken/s-promise';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import { WebSocketServer } from 'ws';

import __SDobbyLighthouseTask from './tasks/SDobbyLighthouseTask.js';
import __SDobbyResponseTimeTask from './tasks/SDobbyResponseTimeTask.js';

import type {
    ISDobbyClientAction,
    ISDobbyError,
    ISDobbyPoolEvent,
    ISDobbyPoolMetas,
    ISDobbySettings,
    ISDobbyTaskMetas,
} from '../shared/types';
import { ISDobbyPool } from '../shared/types.js';
import __SDobbyFsPool from './pools/SDobbyFsPool.js';

/**
 * @name                SDobby
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * Dobby is your little friend that will keep an eye on your services like websites, api's, etc... and produce reports with tools like lighthouse, eco-index, and more.
 *
 * @param           {String}                    uid                     A unique id for your dobby process. ^[a-zA-Z0-9_-]+$
 * @param           {ISDobbySettings}          [settings={}]           Some settings to configure your dobby instance
 *
 * @event           ready               Dispatched when the dobby process is started successfully
 *
 * @example         js
 * import __SDobby from '@coffeekraken/s-dobby';
 * const dobby = new __SDobby();
 * dobby.start();
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobby extends __SClass {
    settings: ISDobbySettings;

    /**
     * @name        registeredTasks
     * @type        Object
     *
     * Store all the registered tasks classes by id
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registeredTasks = {
        responseTime: __SDobbyResponseTimeTask,
        lighthouse: __SDobbyLighthouseTask,
    };

    /**
     * @name        _wss
     * @type        WebSocketServer
     *
     * Store the web socket server instance if started
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _wss: WebSocketServer;

    /**
     * @name        events
     * @type        String
     *
     * Store the SEventEmitter instance that will emit events like "ready", etc...
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    events: __SEventEmitter = new __SEventEmitter();

    /**
     * @name        pools
     * @type        Record<string, ISDobbyPool>
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
    constructor(settings?: ISDobbySettings) {
        super(__deepMerge({}, settings ?? {}));

        // default pool
        this.pools.local = new __SDobbyFsPool(
            <ISDobbyPoolMetas>{
                uid: 'local',
                name: 'Local',
                type: 'fs',
                settings,
            },
            this,
        );
    }

    server(): void {
        console.log('<yellow>[SDobby]</yellow> Starting websocket server');
        const wss = new WebSocketServer({
            port: 8787,
        });
        // store at instance level
        this._wss = wss;

        // listen for connections
        wss.on('connection', (ws) => {
            ws.on('error', console.error);
            ws.on('message', (data) => {
                try {
                    data = JSON.parse(data);
                } catch (e) {}
                if (data.type) {
                    this._executeAction(data);
                }
            });

            // announce all pools to client
            for (let [poolUid, pool] of Object.entries(this.pools)) {
                this._announcePool(pool, ws);
            }
        });
    }

    /**
     * Get a task metas from the poolUid and his uid
     */
    _getTaskMetasFromConfig(poolUid: string, taskUid: string) {
        if (!this.pools[poolUid]) {
            return;
        }
        // get the task from config
        const taskMetas = this.pools[poolUid].getTask(taskUid);
        return taskMetas;
    }

    /**
     * Execute a particular action
     */
    _executeAction(action: ISDobbyClientAction): void {
        switch (action.type) {
            case 'task.start':
                this.pools[action.poolUid].executeTask(action.taskUid);
                break;
            case 'task.pause':
            case 'task.resume':
                const taskMetas = this._getTaskMetasFromConfig(
                    action.poolUid,
                    action.taskUid,
                );

                if (!taskMetas) {
                    return;
                }

                // update the state
                taskMetas.state =
                    action.type === 'task.pause' ? 'paused' : 'active';
                // save the new configuration
                this.pools[action.poolUid].saveConfig();

                // broadcast an update on a task
                this.broadcast({
                    type: 'task.update',
                    data: {
                        ...taskMetas,
                        poolUid: action.poolUid,
                    },
                });
                break;
        }
    }

    /**
     * Annouce a pool to all clients or to a specific one
     */
    _announcePool(pool: ISDobbyPool, to?: any): void {
        const clonedPool = __clone(pool, {
            deep: true,
        });

        // add the "poolUid" to each tasks
        for (let [taskUid, task] of Object.entries(
            clonedPool.config.tasks ?? {},
        )) {
            (<ISDobbyTaskMetas>task).poolUid = clonedPool.metas.uid;
        }

        this[to ? 'send' : 'broadcast'](
            {
                type: 'pool',
                data: <ISDobbyPoolEvent>{
                    pool: clonedPool.metas,
                    config: clonedPool.config,
                },
            },
            to,
        );
    }

    /**
     * Send something a particular client
     */
    send(data: any, ws: any): void {
        if (!this._wss) {
            return;
        }

        let dataStr = data;
        try {
            dataStr = JSON.stringify(data);
        } catch (e) {}

        if (ws.readyState === 1) {
            ws.send(dataStr, { binary: true });
        }
    }

    /**
     * Broadcast something to all connected clients on socket
     */
    broadcast(data: any): void {
        if (!this._wss) {
            return;
        }

        let dataStr = data;
        try {
            dataStr = JSON.stringify(data);
        } catch (e) {}

        this._wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(dataStr, { binary: true });
            }
        });
    }

    /**
     * @name        start
     * @type        Function
     * @async
     *
     * Start the dobby work for the good, the bad and the ugly
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(): Promise<void | ISDobbyError> {
        return new Promise(async (resolve) => {
            // listen for pools ready
            this.events.on('pool.ready', (pool: ISDobbyPool) => {
                this._announcePool(pool);
            });

            // start each pools
            for (let [poolUid, pool] of Object.entries(this.pools)) {
                await pool.start();
            }

            // ready
            this.events.emit('ready');
        });
    }
}

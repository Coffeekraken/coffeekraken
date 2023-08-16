import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
// import __SPromise from '@coffeekraken/s-promise';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import { WebSocketServer } from 'ws';

import __SDobbyEcoIndexTask from './tasks/SDobbyEcoIndexTask.js';
import __SDobbyLighthouseTask from './tasks/SDobbyLighthouseTask.js';
import __SDobbyResponseTimeTask from './tasks/SDobbyResponseTimeTask.js';

import type {
    ISDobbyClientAction,
    ISDobbyError,
    ISDobbyPoolEvent,
    ISDobbyPoolMetas,
    ISDobbyReporterMetas,
    ISDobbySettings,
    ISDobbyTaskMetas,
} from '../shared/types';
import { ISDobbyPool } from '../shared/types.js';
import __SDobbyFsPool from './pools/SDobbyFsPool.js';
import __SDobbyPocketbasePool from './pools/SDobbyPocketbasePool.js';

import __SDobbyPocketbaseReporter from './reporters/SDobbyPocketbaseReporter.js';

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
     * @name        registeredPools
     * @type        Object
     *
     * Store all the registered pools classes by type
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registeredPools = {
        fs: __SDobbyFsPool,
        pocketbase: __SDobbyPocketbasePool,
    };

    /**
     * @name        registeredReporters
     * @type        Object
     *
     * Store all the registered reporters classes by type
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registeredReporters = {
        pocketbase: __SDobbyPocketbaseReporter,
    };

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
        ecoindex: __SDobbyEcoIndexTask,
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

        // listen for pools ready
        this.events.on('pool.ready', (pool: ISDobbyPool) => {
            this._announcePool(pool);
        });

        // pool from the settings
        if (this.settings.pools) {
            for (let [poolUid, pool] of Object.entries(this.settings.pools)) {
                this.addPool(pool);
            }
        }
    }

    addPool(poolMetas: ISDobbyPoolMetas): ISDobbyPoolMetas {
        // check if the wanted pool is already initiated
        if (this.pools[poolMetas.uid]) {
            return poolMetas;
        }

        if (!this.constructor.registeredPools[poolMetas.type]) {
            throw new Error(
                `Sorry but the requested "${
                    poolMetas.type
                }" pool type does not exists... Available pools: ${Object.keys(
                    this.constructor.registeredPools,
                ).join(',')}`,
            );
        }

        console.log('ADD POOL', poolMetas);

        // instanciate pool
        this.pools[poolMetas.uid] = new this.constructor.registeredPools[
            poolMetas.type
        ](this, poolMetas, poolMetas.settings);

        // start the pool
        this.pools[poolMetas.uid].start();

        return poolMetas;
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
     * @name           getReporters
     * @type            Function
     *
     * Get the list of reporters for a specific pool of all of them
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getReporters(poolUid?: string): Record<string, ISDobbyReporterMetas> {
        const reporters: Record<string, ISDobbyReporterMetas> = {};

        for (let [_poolUid, pool] of Object.entries(this.pools)) {
            if (poolUid && poolUid !== _poolUid) continue;
            const reportersInPool = pool.reporters;
            for (let [reporterUid, reporter] of Object.entries(
                reportersInPool,
            )) {
                reporters[reporterUid] = reporter;
            }
        }

        return reporters;
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
        for (let [taskUid, task] of Object.entries(clonedPool.tasks ?? {})) {
            console.log('TA', task);
            (<ISDobbyTaskMetas>task).poolUid = clonedPool.metas.uid;
        }

        this[to ? 'send' : 'broadcast'](
            {
                type: 'pool',
                data: <ISDobbyPoolEvent>{
                    pool: clonedPool.metas,
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
            // start each pools
            for (let [poolUid, pool] of Object.entries(this.pools)) {
                if (!pool.started) {
                    await pool.start();
                }
            }

            // ready
            this.events.emit('ready');
        });
    }

    getRegisteredTasks(
        wantedPoolUid?: string,
    ): Record<string, ISDobbyTaskMetas> {
        const tasks: Record<string, ISDobbyTaskMetas> = {};

        for (let [poolUid, pool] of Object.entries(this.pools)) {
            if (wantedPoolUid && poolUid !== wantedPoolUid) {
                continue;
            }

            const tasksInPool = pool.getTasks();
            for (let [taskUid, taskMetas] of Object.entries(tasksInPool)) {
                tasks[taskUid] = {
                    ...taskMetas,
                    poolUid: poolUid,
                };
            }
        }

        return tasks;
    }
}

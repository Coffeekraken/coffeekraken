var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
// import __SPromise from '@coffeekraken/s-promise';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import { WebSocketServer } from 'ws';
import __SDobbyEcoIndexTask from './tasks/SDobbyEcoIndexTask.js';
import __SDobbyLighthouseTask from './tasks/SDobbyLighthouseTask.js';
import __SDobbyResponseTimeTask from './tasks/SDobbyResponseTimeTask.js';
import __SDobbyFsPool from './pools/SDobbyFsPool.js';
import __SDobbyGunPool from './pools/SDobbyGunPool.js';
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
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        events
         * @type        String
         *
         * Store the SEventEmitter instance that will emit events like "ready", etc...
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.events = new __SEventEmitter();
        /**
         * @name        pools
         * @type        Record<string, ISDobbyPool>
         *
         * Store the registered pools
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.pools = {};
        // listen for pools ready
        this.events.on('pool.ready', (pool) => {
            this._announcePool(pool);
        });
        // pool from the settings
        if (this.settings.pools) {
            for (let [poolUid, pool] of Object.entries(this.settings.pools)) {
                this.addPool(pool);
            }
        }
    }
    addPool(poolMetas) {
        // check if the wanted pool is already initiated
        if (this.pools[poolMetas.uid]) {
            return poolMetas;
        }
        if (!this.constructor.registeredPools[poolMetas.type]) {
            throw new Error(`Sorry but the requested "${poolMetas.type}" pool type does not exists... Available pools: ${Object.keys(this.constructor.registeredPools).join(',')}`);
        }
        // instanciate pool
        this.pools[poolMetas.uid] = new this.constructor.registeredPools[poolMetas.type](this, poolMetas, poolMetas.settings);
        // start the pool
        this.pools[poolMetas.uid].start();
        return poolMetas;
    }
    server() {
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
                }
                catch (e) { }
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
    _getTaskMetasFromConfig(poolUid, taskUid) {
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
    _executeAction(action) {
        switch (action.type) {
            case 'task.start':
                this.pools[action.poolUid].executeTask(action.taskUid);
                break;
            case 'task.pause':
            case 'task.resume':
                const taskMetas = this._getTaskMetasFromConfig(action.poolUid, action.taskUid);
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
                    data: Object.assign(Object.assign({}, taskMetas), { poolUid: action.poolUid }),
                });
                break;
        }
    }
    /**
     * Annouce a pool to all clients or to a specific one
     */
    _announcePool(pool, to) {
        var _a;
        const clonedPool = __clone(pool, {
            deep: true,
        });
        console.log('CLONED', clonedPool);
        // add the "poolUid" to each tasks
        for (let [taskUid, task] of Object.entries((_a = clonedPool.config.tasks) !== null && _a !== void 0 ? _a : {})) {
            console.log('TA', task);
            task.poolUid = clonedPool.metas.uid;
        }
        this[to ? 'send' : 'broadcast']({
            type: 'pool',
            data: {
                pool: clonedPool.metas,
                config: clonedPool.config,
            },
        }, to);
    }
    /**
     * Send something a particular client
     */
    send(data, ws) {
        if (!this._wss) {
            return;
        }
        let dataStr = data;
        try {
            dataStr = JSON.stringify(data);
        }
        catch (e) { }
        if (ws.readyState === 1) {
            ws.send(dataStr, { binary: true });
        }
    }
    /**
     * Broadcast something to all connected clients on socket
     */
    broadcast(data) {
        if (!this._wss) {
            return;
        }
        let dataStr = data;
        try {
            dataStr = JSON.stringify(data);
        }
        catch (e) { }
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
    start() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // start each pools
            for (let [poolUid, pool] of Object.entries(this.pools)) {
                if (!pool.started) {
                    yield pool.start();
                }
            }
            // ready
            this.events.emit('ready');
        }));
    }
    getRegisteredTasks(wantedPoolUid) {
        const tasks = {};
        for (let [poolUid, pool] of Object.entries(this.pools)) {
            if (wantedPoolUid && poolUid !== wantedPoolUid) {
                continue;
            }
            const tasksInPool = pool.getTasks();
            for (let [taskUid, taskMetas] of Object.entries(tasksInPool)) {
                tasks[taskUid] = Object.assign(Object.assign({}, taskMetas), { poolUid: poolUid });
            }
        }
        return tasks;
    }
}
/**
 * @name        registeredPools
 * @type        Object
 *
 * Store all the registered pools classes by type
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SDobby.registeredPools = {
    fs: __SDobbyFsPool,
    gun: __SDobbyGunPool,
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
SDobby.registeredReporters = {
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
SDobby.registeredTasks = {
    responseTime: __SDobbyResponseTimeTask,
    lighthouse: __SDobbyLighthouseTask,
    ecoindex: __SDobbyEcoIndexTask,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELG9EQUFvRDtBQUNwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFckMsT0FBTyxvQkFBb0IsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLHNCQUFzQixNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sd0JBQXdCLE1BQU0sbUNBQW1DLENBQUM7QUFXekUsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsT0FBTywwQkFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQThFeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEwQjtRQUNsQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBakMzQzs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUVoRDs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBZ0MsRUFBRSxDQUFDO1FBZXBDLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFpQixFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3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
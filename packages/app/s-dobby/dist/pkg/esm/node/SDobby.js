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
        /**
         * @name        feeders
         * @type        Record<string, ISDobbyFeeder>
         *
         * Store the registered feeders
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.feeders = {};
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
        // add the "poolUid" to each tasks
        for (let [taskUid, task] of Object.entries((_a = clonedPool.tasks) !== null && _a !== void 0 ? _a : {})) {
            console.log('TA', task);
            task.poolUid = clonedPool.metas.uid;
        }
        this[to ? 'send' : 'broadcast']({
            type: 'pool',
            data: {
                pool: clonedPool.metas,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELG9EQUFvRDtBQUNwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFckMsT0FBTyxvQkFBb0IsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLHNCQUFzQixNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sd0JBQXdCLE1BQU0sbUNBQW1DLENBQUM7QUFjekUsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxzQkFBc0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLDBCQUEwQixNQUFNLHlDQUF5QyxDQUFDO0FBRWpGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBMkZ4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTBCO1FBQ2xDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUE1QzNDOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1FBRWhEOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFnQyxFQUFFLENBQUM7UUFFeEM7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFPLEdBQWtDLEVBQUUsQ0FBQztRQWV4Qyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBaUIsRUFBRSxFQUFF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
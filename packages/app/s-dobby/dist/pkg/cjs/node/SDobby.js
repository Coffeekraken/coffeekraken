"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
// import __SPromise from '@coffeekraken/s-promise';
const object_1 = require("@coffeekraken/sugar/object");
const ws_1 = require("ws");
const SDobbyEcoIndexTask_js_1 = __importDefault(require("./tasks/SDobbyEcoIndexTask.js"));
const SDobbyLighthouseTask_js_1 = __importDefault(require("./tasks/SDobbyLighthouseTask.js"));
const SDobbyResponseTimeTask_js_1 = __importDefault(require("./tasks/SDobbyResponseTimeTask.js"));
const SDobbyFsPool_js_1 = __importDefault(require("./pools/SDobbyFsPool.js"));
const SDobbyGunPool_js_1 = __importDefault(require("./pools/SDobbyGunPool.js"));
const SDobbyPocketbaseReporter_js_1 = __importDefault(require("./reporters/SDobbyPocketbaseReporter.js"));
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
class SDobby extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        events
         * @type        String
         *
         * Store the SEventEmitter instance that will emit events like "ready", etc...
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.events = new s_event_emitter_1.default();
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
        const wss = new ws_1.WebSocketServer({
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
        const clonedPool = (0, object_1.__clone)(pool, {
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
exports.default = SDobby;
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
    fs: SDobbyFsPool_js_1.default,
    gun: SDobbyGunPool_js_1.default,
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
    pocketbase: SDobbyPocketbaseReporter_js_1.default,
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
    responseTime: SDobbyResponseTimeTask_js_1.default,
    lighthouse: SDobbyLighthouseTask_js_1.default,
    ecoindex: SDobbyEcoIndexTask_js_1.default,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9GQUE0RDtBQUM1RCxvREFBb0Q7QUFDcEQsdURBQWtFO0FBQ2xFLDJCQUFxQztBQUVyQywwRkFBaUU7QUFDakUsOEZBQXFFO0FBQ3JFLGtHQUF5RTtBQVd6RSw4RUFBcUQ7QUFDckQsZ0ZBQXVEO0FBRXZELDBHQUFpRjtBQUVqRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBOEV4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTBCO1FBQ2xDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFqQzNDOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFvQixJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUVoRDs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBZ0MsRUFBRSxDQUFDO1FBZXBDLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFpQixFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILHlCQUF5QjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3JCLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEI7U0FDSjtJQUNMLENBQUM7SUFF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
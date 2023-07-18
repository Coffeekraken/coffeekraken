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
exports.SDobbyStartParamsSpecs = void 0;
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
// import __SPromise from '@coffeekraken/s-promise';
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const ws_1 = require("ws");
const SDobbyResponseTimeTask_js_1 = __importDefault(require("./tasks/SDobbyResponseTimeTask.js"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const exports_js_1 = require("./exports.js");
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
exports.SDobbyStartParamsSpecs = {
    type: 'Object',
    title: 'Start params',
    description: 'Start parameters',
    props: {
        uid: {
            type: 'String',
            title: 'UID',
            description: 'Dobby process uid',
            default: 'default',
        },
    },
};
class SDobby extends s_class_1.default {
    get uid() {
        return this._uid;
    }
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
         * @name        uid
         * @type        String
         *
         * Store the dobby uid
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._uid = 'default';
        /**
         * @name        config
         * @type        ISDobbyConfig
         *
         * Store the actual config
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.config = {
            tasks: {},
        };
        // uid
        if (settings === null || settings === void 0 ? void 0 : settings.uid) {
            this._uid = settings.uid;
        }
        // default adapter
        if (!this.settings.adapter) {
            this.settings.adapter = new exports_js_1.__SDobbyFsAdapter();
            // this.settings.adapter = new __SDobbyGunJsAdapter({
            //     key: 'fjwoiefjijoij3oirjion2fdjineiujfwnuhw0chqowcoqwnfijonqwfqéwnef',
            // });
        }
    }
    server() {
        console.log('<yellow>[SDobby]</yellow> Starting websocket server');
        const wss = new ws_1.WebSocketServer({
            port: 8787,
        });
        wss.on('connection', (ws) => {
            ws.on('error', console.error);
            ws.on('message', (data) => {
                console.log('received: %s', data);
            });
            this._send({
                type: 'config',
                data: this.config,
            }, ws);
        });
        // store at instance level
        this._wss = wss;
    }
    /**
     * Send something a particular client
     */
    _send(data, ws) {
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
    _broadcast(data) {
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
    start(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = s_specs_1.default.apply(params, exports.SDobbyStartParamsSpecs);
            // killing scheduled tasks gracefully
            (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                console.log(`<red>[SDobby]</red> Gracefully kill the scheduled tasks...`);
                yield node_schedule_1.default.gracefulShutdown();
            }));
            // save the uid
            if (!finalParams.uid.match(/^[a-zA-Z0-9_-]+$/)) {
                throw new Error(`The passed uid "${finalParams.uid}" ¡s invalid. /^[a-zA-Z0-9_-]+$/`);
            }
            this._uid = finalParams.uid;
            // load the config
            this.config = yield this.settings.adapter.loadConfig(finalParams.uid);
            // ready
            this.events.emit('ready');
            // start the scheduler
            this._startScheduler();
        }));
    }
    /**
     * Enqueue a task
     */
    _enqueueTask(taskMetas) {
        node_schedule_1.default.scheduleJob(taskMetas.schedule, () => {
            // execute task
            this.executeTask(taskMetas);
        });
    }
    /**
     * Start the scheduler that will execute the tasks when needed
     */
    _startScheduler() {
        var _a;
        // loop on each tasks to schedule them
        for (let [taskUid, taskMetas] of Object.entries((_a = this.config.tasks) !== null && _a !== void 0 ? _a : {})) {
            this._enqueueTask(taskMetas);
        }
    }
    /**
     * Executing a tasks
     */
    executeTask(taskMetas) {
        return __awaiter(this, void 0, void 0, function* () {
            const TaskClass = this.constructor.registeredTasks[taskMetas.type];
            // broadcast a start task event
            this._broadcast({
                type: 'task.start',
                data: taskMetas,
            });
            if (!TaskClass) {
                throw new Error(`<red>[SDobby]</red> The task <yellow>${taskMetas.name} (${taskMetas.type})</yellow> is not an available task type...`);
            }
            const task = new TaskClass(taskMetas);
            const taskResult = yield task.run();
            // broadcast a start task event
            this._broadcast({
                type: 'task.end',
                data: taskResult,
            });
            return taskResult;
        });
    }
    /**
     * @name        addTask
     * @type        Function
     * @async
     *
     * Add a new task in the queue
     *
     * @param       {ISDobbyTask}          task             The task to add
     * @return      {Promise<void>}                         A promise resolved once the task is added successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    addTask(taskMetas) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // make sure the tasks not already exists
            if ((_a = this.config.tasks) === null || _a === void 0 ? void 0 : _a[taskMetas.uid]) {
                return reject({
                    message: `A task with the uid \`${taskMetas.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.config.tasks[taskMetas.uid] = taskMetas;
            // save the config
            this.settings.adapter.saveConfig(this.uid, this.config);
            // enqueue the new task
            this._enqueueTask(taskMetas);
        }));
    }
    /**
     * @name        removeTask
     * @type        Function
     * @async
     *
     * Remove an existing task from the queue
     *
     * @param       {String}          taskUid             The task UID to remove
     * @return      {Promise<void>}                         A promise resolved once the task is added successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    removeTask(taskUid) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () { }));
    }
}
exports.default = SDobby;
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsb0RBQW9EO0FBQ3BELG9FQUE2QztBQUM3Qyx1REFBeUQ7QUFDekQseURBQThEO0FBQzlELDJCQUFxQztBQUVyQyxrR0FBeUU7QUFFekUsa0VBQTJDO0FBRTNDLDZDQUFpRDtBQVVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVVLFFBQUEsc0JBQXNCLEdBQUc7SUFDbEMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsY0FBYztJQUNyQixXQUFXLEVBQUUsa0JBQWtCO0lBQy9CLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLE9BQU8sRUFBRSxTQUFTO1NBQ3JCO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBZ0R4QyxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQWVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBMEI7UUFDbEMsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQWpEM0M7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQW9CLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBRWhEOzs7Ozs7OztXQVFHO1FBQ0ssU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUtqQzs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBa0I7WUFDcEIsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBZUUsTUFBTTtRQUNOLElBQUksUUFBUSxhQUFSLFFB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
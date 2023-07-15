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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const ws_1 = require("ws");
const SDobbyResponseTimeTask_js_1 = __importDefault(require("./tasks/SDobbyResponseTimeTask.js"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const SDobbyGunJsAdapter_js_1 = __importDefault(require("./adapters/SDobbyGunJsAdapter.js"));
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
        // uid
        if (settings === null || settings === void 0 ? void 0 : settings.uid) {
            this._uid = settings.uid;
        }
        // default adapter
        if (!this.settings.adapter) {
            this.settings.adapter = new SDobbyGunJsAdapter_js_1.default({
                key: 'fjwoiefjijoij3oirjion2fdjineiujfwnuhw0chqowcoqwnfijonqwfqéwnef',
            });
        }
    }
    server() {
        return;
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
     * Start the dobby work for the good and the bad
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        return new s_promise_1.default(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
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
     * Start the scheduler that will execute the tasks when needed
     */
    _startScheduler() {
        var _a;
        // loop on each tasks to schedule them
        for (let [taskUid, taskMetas] of Object.entries((_a = this.config.tasks) !== null && _a !== void 0 ? _a : {})) {
            node_schedule_1.default.scheduleJob(taskMetas.schedule, () => {
                // execute task
                this.executeTask(taskMetas);
            });
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
    addTask(task) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // make sure the tasks not already exists
            if ((_a = this.config.tasks) === null || _a === void 0 ? void 0 : _a[task.uid]) {
                return reject({
                    message: `A task with the uid \`${task.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.config.tasks[task.uid] = task;
            // save the config
            this.settings.adapter.saveConfig(this.uid, this.config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsd0VBQWlEO0FBQ2pELG9FQUE2QztBQUM3Qyx1REFBeUQ7QUFDekQseURBQThEO0FBQzlELDJCQUFxQztBQUVyQyxrR0FBeUU7QUFJekUsa0VBQTJDO0FBRzNDLDZGQUFvRTtBQVdwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVVLFFBQUEsc0JBQXNCLEdBQUc7SUFDbEMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsY0FBYztJQUNyQixXQUFXLEVBQUUsa0JBQWtCO0lBQy9CLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLE9BQU8sRUFBRSxTQUFTO1NBQ3JCO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBZ0R4QyxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQWFEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBMEI7UUFDbEMsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQS9DM0M7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQW9CLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBRWhEOzs7Ozs7OztXQVFHO1FBQ0ssU0FBSSxHQUFXLFNBQVMsQ0FBQztRQTZCN0IsTUFBTTtRQUNOLElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFD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
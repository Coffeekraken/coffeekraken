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
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import { WebSocketServer } from 'ws';
import __SDobbyResponseTimeTask from './tasks/SDobbyResponseTimeTask.js';
import __nodeSchedule from 'node-schedule';
import __SDobbyGunJsAdapter from './adapters/SDobbyGunJsAdapter.js';
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
export const SDobbyStartParamsSpecs = {
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
export default class SDobby extends __SClass {
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
            this.settings.adapter = new __SDobbyGunJsAdapter({
                key: 'fjwoiefjijoij3oirjion2fdjineiujfwnuhw0chqowcoqwnfijonqwfqéwnef',
            });
        }
    }
    server() {
        return;
        console.log('<yellow>[SDobby]</yellow> Starting websocket server');
        const wss = new WebSocketServer({
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
        return new __SPromise(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = __SSpecs.apply(params, SDobbyStartParamsSpecs);
            // killing scheduled tasks gracefully
            __onProcessExit(() => __awaiter(this, void 0, void 0, function* () {
                console.log(`<red>[SDobby]</red> Gracefully kill the scheduled tasks...`);
                yield __nodeSchedule.gracefulShutdown();
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
            __nodeSchedule.scheduleJob(taskMetas.schedule, () => {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLElBQUksQ0FBQztBQUVyQyxPQUFPLHdCQUF3QixNQUFNLG1DQUFtQyxDQUFDO0FBSXpFLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLG9CQUFvQixNQUFNLGtDQUFrQyxDQUFDO0FBV3BFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUc7SUFDbEMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsY0FBYztJQUNyQixXQUFXLEVBQUUsa0JBQWtCO0lBQy9CLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLE9BQU8sRUFBRSxTQUFTO1NBQ3JCO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQWdEeEMsSUFBSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFhRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTBCO1FBQ2xDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEs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
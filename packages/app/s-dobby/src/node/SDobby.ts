import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import { WebSocketServer } from 'ws';

import __SDobbyResponseTimeTask from './tasks/SDobbyResponseTimeTask.js';

import __SDuration from '@coffeekraken/s-duration';

import __nodeSchedule from 'node-schedule';

import __SDobbyFsAdapter from './adapters/SDobbyFsAdapter.js';

import type {
    ISDobbyConfig,
    ISDobbyError,
    ISDobbySettings,
    ISDobbyStartParams,
    ISDobbyTaskMetas,
    ISDobbyTaskResult,
} from './types';

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
     * @name        uid
     * @type        String
     *
     * Store the dobby uid
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _uid: string = 'default';
    get uid(): string {
        return this._uid;
    }

    /**
     * @name        config
     * @type        ISDobbyConfig
     *
     * Store the actual config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    config: ISDobbyConfig;

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

        // uid
        if (settings?.uid) {
            this._uid = settings.uid;
        }

        // default adapter
        if (!this.settings.adapter) {
            this.settings.adapter = new __SDobbyFsAdapter();
        }
    }

    server(): void {
        console.log('<yellow>[SDobby]</yellow> Starting websocket server');
        const wss = new WebSocketServer({
            port: 8787,
        });
        wss.on('connection', (ws) => {
            ws.on('error', console.error);
            ws.on('message', (data) => {
                console.log('received: %s', data);
            });
            this._send(
                {
                    type: 'config',
                    data: this.config,
                },
                ws,
            );
        });

        // store at instance level
        this._wss = wss;
    }

    /**
     * Send something a particular client
     */
    _send(data: any, ws: any): void {
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
    _broadcast(data: any): void {
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
     * Start the dobby work for the good and the bad
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params?: ISDobbyStartParams): Promise<void | ISDobbyError> {
        return new __SPromise(async ({ resolve, emit }) => {
            const finalParams: ISDobbyStartParams = __SSpecs.apply(
                params,
                SDobbyStartParamsSpecs,
            );

            // killing scheduled tasks gracefully
            __onProcessExit(async () => {
                console.log(
                    `<red>[SDobby]</red> Gracefully kill the scheduled tasks...`,
                );
                await __nodeSchedule.gracefulShutdown();
            });

            // save the uid
            if (!finalParams.uid.match(/^[a-zA-Z0-9_-]+$/)) {
                throw new Error(
                    `The passed uid "${finalParams.uid}" ¡s invalid. /^[a-zA-Z0-9_-]+$/`,
                );
            }
            this._uid = finalParams.uid;

            // load the config
            this.config = await this.settings.adapter.loadConfig(
                finalParams.uid,
            );

            // ready
            this.events.emit('ready');

            // start the scheduler
            this._startScheduler();
        });
    }

    /**
     * Start the scheduler that will execute the tasks when needed
     */
    _startScheduler() {
        // loop on each tasks to schedule them
        for (let [taskUid, taskMetas] of Object.entries(
            this.config.tasks ?? {},
        )) {
            __nodeSchedule.scheduleJob(taskMetas.schedule, () => {
                // execute task
                this.executeTask(taskMetas);
            });
        }
    }

    /**
     * Executing a tasks
     */
    async executeTask(taskMetas: ISDobbyTaskMetas): Promise<ISDobbyTaskResult> {
        const TaskClass = this.constructor.registeredTasks[taskMetas.type];

        // broadcast a start task event
        this._broadcast({
            type: 'task.start',
            data: taskMetas,
        });

        if (!TaskClass) {
            throw new Error(
                `<red>[SDobby]</red> The task <yellow>${taskMetas.name} (${taskMetas.type})</yellow> is not an available task type...`,
            );
        }

        const task = new TaskClass(taskMetas);
        const taskResult = await task.run();

        // broadcast a start task event
        this._broadcast({
            type: 'task.end',
            data: taskResult,
        });

        return taskResult;
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
    addTask(task: ISDobbyTaskMetas): Promise<void | ISDobbyError> {
        return new Promise(async (resolve, reject) => {
            // make sure the tasks not already exists
            if (this.config.tasks?.[task.uid]) {
                return reject(<ISDobbyError>{
                    message: `A task with the uid \`${task.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.config.tasks[task.uid] = task;
            // save the config
            this.settings.adapter.saveConfig(this.uid, this.config);
        });
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
    removeTask(taskUid: string): Promise<void> {
        return new Promise(async (resolve) => {});
    }
}

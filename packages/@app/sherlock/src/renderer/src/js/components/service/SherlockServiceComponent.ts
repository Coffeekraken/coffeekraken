import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { __pad } from '@coffeekraken/sugar/number';

import { __timeAgo } from '@coffeekraken/sugar/datetime';

import type { ISDobbyTaskMetas, ISDobbyTaskResult } from '@coffeekraken/s-dobby';

import __cronParser from 'cron-parser';

import type { ISherlockService } from '../../../../../shared/SherlockTypes.js';

import __sherlockStores from '../../stores/SherlockStores';

import __SherlockResponseTimeResultComponent from '../results/responseTime/SherlockResponseTimeResultComponent.js';

const resultComponentsByTaskType = {
    responseTime: __SherlockResponseTimeResultComponent,
};

@customElement('sherlock-service')
export class SherlockServiceComponent extends LitElement {
    static styles = css``;

    @property({ type: String })
    service: string = null;

    // end life promise
    _lifeEndResolve;
    _lifeEndPromise = new Promise((resolve) => {
        this._lifeEndResolve = resolve;
    });
    disconnectedCallback() {
        super.disconnectedCallback();
        this._lifeEndResolve();
    }

    constructor() {
        super();

        // reactive
        [
            __sherlockStores.current().tasks,
            __sherlockStores.current().tasksStates,
            __sherlockStores.current().tasksResults,
        ].forEach((store) => {
            store.$set(
                '*',
                () => {
                    this.requestUpdate();
                },
                {
                    until: this._lifeEndPromise,
                },
            );
        });
        __sherlockStores.route.$set(
            'service',
            () => {
                this.requestUpdate();
            },
            {
                until: this._lifeEndPromise,
            },
        );
    }

    startTask(task: ISDobbyTaskMetas) {
        __sherlockStores.current().tasks.startTask(task);
    }

    pauseTask(task: ISDobbyTaskMetas) {
        __sherlockStores.current().tasks.pauseTask(task);
    }

    resumeTask(task: ISDobbyTaskMetas) {
        __sherlockStores.current().tasks.resumeTask(task);
    }

    renderResultWidget(result: ISDobbyTaskResult): any {
        if (!resultComponentsByTaskType[result?.data?.task?.type]) {
            return '';
        }
        return resultComponentsByTaskType[result.data.task.type].renderListWidget(result.data);
    }

    render() {
        const tasks =
            __sherlockStores.current().tasks.getTasks({
                client: __sherlockStores.route.client,
                service: __sherlockStores.route.service,
            }) ?? {};

        const service: ISherlockService = __sherlockStores
            .current()
            .services.getService(this.service);
        return html`
            <article class="sh-service">
                <div class="_content">
                    <header class="_metas">
                        <div class="s-flex">
                            <h1 class="_title s-flex-item:grow">${service.name}</h1>
                            <div class="_tools">
                                <a
                                    class="s-btn s-shape:pill s-color:complementary"
                                    href="${service.url}"
                                    target="_blank"
                                    title="${service.name}"
                                >
                                    Visit website
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                                <button
                                    class="s-btn s-shape:pill s-color:accent"
                                    title="Add a service"
                                    @click=${(e) => {
                                        __sherlockStores.route.setRoute({
                                            popup: 'newTask',
                                        });
                                    }}
                                >
                                    New task
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        ${service.description
                            ? html` <p class="_description">${service.description}</p> `
                            : ''}
                    </header>
                    <main class="_tasks">
                        ${Object.entries(tasks).map(([taskUid, task]) => {
                            const taskState =
                                __sherlockStores.current().tasksStates.getTaskState(taskUid) ?? {};

                            const taskResults = __sherlockStores
                                .current()
                                .tasksResults.getTaskResults(taskUid);

                            const lastTaskResult = taskResults.at(-1);

                            let cron,
                                cronNext,
                                nextStr = '';
                            if (task.schedule) {
                                cron = __cronParser.parseExpression(task.schedule);
                                cronNext = cron.next();
                                nextStr = `${__pad(cronNext.getDay(), 2)}.${__pad(
                                    cronNext.getMonth(),
                                    2,
                                )}.${__pad(cronNext.getFullYear(), 4)} ${__pad(
                                    cronNext.getHours(),
                                    2,
                                )}:${__pad(cronNext.getMinutes(), 2)}`;
                            }

                            return html`
                                <article class="task ${taskState.details ? 'details' : ''}">
                                    <header
                                        class="_header ${task.status}"
                                        @dblclick=${(e) => {
                                            taskState.details = !taskState.details;
                                        }}
                                    >
                                        <div class="s-flex:align-center">
                                            <div class="s-flex:align-center s-gap:30">
                                                ${task.status === 'running'
                                                    ? html`<i
                                                          class="s-loader:spinner s-tc:accent"
                                                      ></i>`
                                                    : html`
                                                          ${lastTaskResult?.data.status ===
                                                          'success'
                                                              ? html`
                                                                    <i
                                                                        class="fa-solid fa-check s-color:success"
                                                                    ></i>
                                                                `
                                                              : lastTaskResult?.data.status ===
                                                                'warning'
                                                              ? html`
                                                                    <i
                                                                        class="fa-solid fa-triangle-exclamation s-color:accent"
                                                                    ></i>
                                                                `
                                                              : html`
                                                                    <i
                                                                        class="fa-solid fa-xmark s-color:error"
                                                                    ></i>
                                                                `}
                                                      `}

                                                <h1 class="s-typo:h4">${task.name}</h1>
                                            </div>
                                            <div class="s-flex-item:grow"></div>
                                            <div class="_next s-tooltip-container">
                                                <span class="s-font:code">${nextStr}</span>
                                                <div class="s-tooltip">Next execution time</div>
                                            </div>
                                            <button
                                                class="s-btn:text s-tooltip-container"
                                                confirm="Really?"
                                                @pointerup=${(e) => {
                                                    if (e.target.needConfirmation) {
                                                        return;
                                                    }

                                                    if (!task.schedule) {
                                                        this.startTask(task);
                                                        return;
                                                    }

                                                    if (task.state === 'paused') {
                                                        this.resumeTask(task);
                                                    } else {
                                                        this.pauseTask(task);
                                                    }
                                                }}
                                            >
                                                ${task.state === 'paused' || !task.schedule
                                                    ? html` <i class="fa-solid fa-play"></i> `
                                                    : html` <i class="fa-solid fa-pause"></i> `}
                                                <div class="s-tooltip">
                                                    ${task.state === 'paused' ? 'Resume' : 'Pause'}
                                                    this task
                                                </div>
                                            </button>
                                            <button
                                                class="s-btn:text s-tooltip-container"
                                                confirm="Really?"
                                            >
                                                <i class="fa-regular fa-trash-can"></i>
                                                <div class="s-tooltip">Delete this tasks</div>
                                            </button>
                                            <button
                                                class="s-btn:text _expand"
                                                @pointerup=${(e) => {
                                                    taskState.details = !taskState.details;
                                                }}
                                            >
                                                <i class="fa-solid fa-angle-down"></i>
                                            </button>
                                        </div>
                                    </header>
                                    <main class="_details">
                                        <div class="_inner">
                                            <div class="_results">
                                                ${taskResults.reverse().map(
                                                    (taskResult) => html`
                                                        <article class="_result">
                                                            <header class="_result-header">
                                                                <div
                                                                    class="s-flex:align-center s-gap:20"
                                                                >
                                                                    ${taskResult.data.status ===
                                                                    'success'
                                                                        ? html`
                                                                              <i
                                                                                  class="fa-solid fa-check s-color:success"
                                                                              ></i>
                                                                          `
                                                                        : taskResult.data.status ===
                                                                          'warning'
                                                                        ? html`
                                                                              <i
                                                                                  class="fa-solid fa-triangle-exclamation s-color:accent"
                                                                              ></i>
                                                                          `
                                                                        : html`
                                                                              <i
                                                                                  class="fa-solid fa-xmark s-color:error"
                                                                              ></i>
                                                                          `}
                                                                    <div class="_result-widget">
                                                                        ${this.renderResultWidget(
                                                                            taskResult,
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div class="s-flex-item:grow"></div>
                                                                <div class="_duration">
                                                                    <span class="s-font:code"
                                                                        >${__timeAgo(
                                                                            taskResult.data.time /
                                                                                1000,
                                                                        )}</span
                                                                    >
                                                                    in
                                                                    <span class="s-font:code"
                                                                        >${taskResult.data.duration
                                                                            .formatedDuration}</span
                                                                    >
                                                                </div>
                                                                <button class="s-btn:text">
                                                                    <i
                                                                        class="fa-regular fa-eye s-color:accent"
                                                                    ></i>
                                                                </button>
                                                            </header>
                                                        </article>
                                                    `,
                                                )}
                                            </div>
                                        </div>
                                    </main>
                                </article>
                            `;
                        })}
                    </main>
                </div>
            </article>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

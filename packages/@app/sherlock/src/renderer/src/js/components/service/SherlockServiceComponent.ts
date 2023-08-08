import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { __pad } from '@coffeekraken/sugar/number';

import { __timeAgo } from '@coffeekraken/sugar/datetime';

import type { ISDobbyTaskMetas, ISDobbyTaskResult } from '@coffeekraken/s-dobby';

import __cronParser from 'cron-parser';

import type { ISherlockService } from '../../../../../shared/SherlockTypes.js';

import __sherlockStores from '../../stores/SherlockStores';

import __SherlockEcoindexResultComponent from '../results/ecoindex/SherlockEcoindexResultComponent.js';
import __SherlockLighthouseResultComponent from '../results/lighthouse/SherlockLighthouseResultComponent.js';
import __SherlockResponseTimeResultComponent from '../results/responseTime/SherlockResponseTimeResultComponent.js';

const resultComponentsByTaskType = {
    responseTime: __SherlockResponseTimeResultComponent,
    lighthouse: __SherlockLighthouseResultComponent,
    ecoindex: __SherlockEcoindexResultComponent,
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
            __sherlockStores.space().tasks,
            __sherlockStores.space().tasksStates,
            __sherlockStores.space().tasksResults,
        ].forEach((store) => {
            store.$set(
                '*',
                () => {
                    this.requestUpdate();
                },
                {
                    until: this._lifeEndPromise,
                    group: true,
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
                group: true,
            },
        );
    }

    startTask(task: ISDobbyTaskMetas) {
        __sherlockStores.space().tasks.startTask(task);
    }

    pauseTask(task: ISDobbyTaskMetas) {
        __sherlockStores.space().tasks.pauseTask(task);
    }

    resumeTask(task: ISDobbyTaskMetas) {
        __sherlockStores.space().tasks.resumeTask(task);
    }

    renderResultWidget(result: ISDobbyTaskResult): any {
        if (!resultComponentsByTaskType[result?.data?.task?.type]) {
            return '';
        }
        return resultComponentsByTaskType[result.data.task.type].renderListWidget(result.data);
    }

    _renderGeo(geo: any): any {
        return html`
            <div class="geo">
                    <div class="_item">
                        <span class="_label">City</span>
                        <span class="_value">${geo.city?.name ?? '-'}
                    </div>
                    <div class="_item">
                        <span class="_label">Country</span>
                        <span class="_value">${geo.country?.name ?? '-'}
                    </div>
                    <div class="_item">
                        <span class="_label">Timezone</span>
                        <span class="_value">${geo.timezone ?? '-'}
                    </div>
            </div>
        `;
    }

    render() {
        const tasks =
            __sherlockStores.space().tasks.getTasks({
                client: __sherlockStores.route.client,
                service: __sherlockStores.route.service,
            }) ?? {};

        const service: ISherlockService = __sherlockStores
            .space()
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
                                __sherlockStores.space().tasksStates.getTaskState(taskUid) ?? {};

                            const taskResults = __sherlockStores
                                .space()
                                .tasksResults.getTaskResults(taskUid);

                            const lastTaskResult = taskResults[Object.keys(taskResults).at(0)];

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
                                                              : lastTaskResult?.data.status ===
                                                                'error'
                                                              ? html`
                                                                    <i
                                                                        class="fa-solid fa-xmark s-color:error"
                                                                    ></i>
                                                                `
                                                              : __sherlockStores
                                                                    .space()
                                                                    .tasksResults.areTaskResultsLoading(
                                                                        task.uid,
                                                                    )
                                                              ? html`<i
                                                                    class="s-loader:spinner s-tc:accent"
                                                                ></i>`
                                                              : html`&nbsp;--&nbsp;`}
                                                      `}

                                                <h1 class="s-typo:h4">${task.name}</h1>
                                            </div>
                                            <div class="s-flex-item:grow"></div>

                                            <div class="_result-widget">
                                                ${task.status !== 'running'
                                                    ? this.renderResultWidget(lastTaskResult)
                                                    : ''}
                                            </div>

                                            <!-- <div class="_next s-tooltip-container">
                                                <span class="s-font:code">${nextStr}</span>
                                                <div class="s-tooltip">Next execution time</div>
                                            </div> -->
                                            ${task.status !== 'running'
                                                ? html`
                                                      ${lastTaskResult?.data?.geo
                                                          ? html`
                                                                <button
                                                                    class="s-btn:text s-tooltip-container"
                                                                    @pointerup=${(e) => {}}
                                                                >
                                                                    <i
                                                                        class="fa-solid fa-earth-europe"
                                                                    ></i>
                                                                    <div
                                                                        class="s-tooltip s-color:complementary"
                                                                    >
                                                                        ${this._renderGeo(
                                                                            lastTaskResult.data.geo,
                                                                        )}
                                                                    </div>
                                                                </button>
                                                            `
                                                          : ''}
                                                      ${task.schedule
                                                          ? html`
                                                                <button
                                                                    class="s-btn:text s-tooltip-container"
                                                                    @pointerup=${(e) => {}}
                                                                >
                                                                    <i
                                                                        class="fa-regular fa-clock"
                                                                    ></i>
                                                                    <div
                                                                        class="s-tooltip s-color:complementary"
                                                                    >
                                                                        Change schedule...
                                                                    </div>
                                                                </button>
                                                            `
                                                          : ''}
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
                                                          <i class="fa-solid fa-play"></i>
                                                          <div class="s-tooltip">Run this task</div>
                                                      </button>
                                                      <button
                                                          class="s-btn:text s-tooltip-container"
                                                          confirm="Really?"
                                                      >
                                                          <i class="fa-regular fa-trash-can"></i>
                                                          <div class="s-tooltip">
                                                              Delete this tasks
                                                          </div>
                                                      </button>
                                                  `
                                                : ''}

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
                                                ${Object.entries(taskResults).map(
                                                    ([taskResultUid, taskResult]) => html`
                                                        <article class="_result">
                                                            <header class="_result-inner">
                                                                ${taskState.details
                                                                    ? html`
                                                                          <div
                                                                              class="s-flex:align-center s-flex-item:grow s-gap:20"
                                                                          >
                                                                              ${taskResult.data
                                                                                  .status ===
                                                                              'success'
                                                                                  ? html`
                                                                                        <i
                                                                                            class="fa-solid fa-check s-color:success"
                                                                                        ></i>
                                                                                    `
                                                                                  : taskResult.data
                                                                                        .status ===
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
                                                                              <div
                                                                                  class="_result-widget"
                                                                              >
                                                                                  ${this.renderResultWidget(
                                                                                      taskResult,
                                                                                  )}
                                                                              </div>
                                                                          </div>
                                                                          <div class="_duration">
                                                                              <span
                                                                                  >${__timeAgo(
                                                                                      taskResult
                                                                                          .data
                                                                                          .time /
                                                                                          1000,
                                                                                  )}</span
                                                                              >
                                                                              in
                                                                              <span
                                                                                  class="s-font:code s-tc:complementary"
                                                                                  >${taskResult.data
                                                                                      .duration
                                                                                      .formatedDuration}</span
                                                                              >
                                                                          </div>
                                                                          <button
                                                                              class="s-btn:text"
                                                                          >
                                                                              <i
                                                                                  class="fa-regular fa-eye s-color:accent"
                                                                              ></i>
                                                                          </button>
                                                                      `
                                                                    : ''}
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

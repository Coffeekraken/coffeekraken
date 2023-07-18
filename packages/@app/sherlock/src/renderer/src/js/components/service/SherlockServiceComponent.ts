import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { __timeAgo } from '@coffeekraken/sugar/datetime';

import type { ISherlockService } from '../../../../../shared/SherlockTypes.js';

import __sherlockStores from '../../stores/SherlockStores';

@customElement('sherlock-service')
export class SherlockServiceComponent extends LitElement {
    static styles = css``;

    @property({ type: String })
    service: string = null;

    constructor() {
        super();

        // reactive
        __sherlockStores.tasks.$set('*', () => {
            this.requestUpdate();
        });
        __sherlockStores.tasksStates.$set('*', () => {
            this.requestUpdate();
        });
        __sherlockStores.route.$set('service', () => {
            this.requestUpdate();
        });
    }

    render() {
        const tasks =
            __sherlockStores.tasks.getTasks({
                client: __sherlockStores.route.client,
                service: __sherlockStores.route.service,
            }) ?? {};

        const service: ISherlockService = __sherlockStores.services.getService(this.service);
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
                                __sherlockStores.tasksStates.getTaskState(taskUid) ?? {};

                            const taskResults =
                                __sherlockStores.tasksResults.getTaskResults(taskUid);

                            const lastTaskResults = taskResults.at(-1);

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
                                                          ${lastTaskResults?.data.status ===
                                                          'success'
                                                              ? html`
                                                                    <i
                                                                        class="fa-solid fa-check s-color:success"
                                                                    ></i>
                                                                `
                                                              : lastTaskResults?.data.status ===
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
                                            <button
                                                class="s-btn:text s-tooltip-container"
                                                confirm="Really?"
                                            >
                                                <i class="fa-solid fa-pause"></i>
                                                <div class="s-tooltip">Pause this task</div>
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
                                                                    <h2 class="s-typo:p">
                                                                        ${__timeAgo(
                                                                            taskResult.data.time /
                                                                                1000,
                                                                        )}
                                                                    </h2>
                                                                </div>
                                                                <div class="s-flex-item:grow"></div>
                                                                <div class="_duration">
                                                                    ${taskResult.data.duration
                                                                        .formatedDuration}
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

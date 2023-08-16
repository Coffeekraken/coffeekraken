import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { SDobbyTaskSpec, SDobbyTasksSpecsByType } from '@coffeekraken/s-dobby';

import type { ISherlockTask } from '../../../../../shared/SherlockTypes';

import __sherlockStores from '../../stores/SherlockStores.js';

import type {} from '../../../../../shared/SherlockTypes';

@customElement('sherlock-new-task')
export class SherlockTaskSpaceComponent extends LitElement {
    static styles = css``;

    @state()
    _step: 'metas' | 'settings' = 'metas';

    _task: ISherlockTask = {};

    _settingsSpecs: any;

    constructor() {
        super();

        // enhance the task specs with the available pools
        SDobbyTaskSpec.props.poolUid = {
            type: 'Select',
            title: 'Pool',
            description: 'Specify in which pool you want to add your task',
            options: [],
        };
        const pools = __sherlockStores.space().pools.getPools();
        for (let [poolUid, pool] of Object.entries(pools)) {
            SDobbyTaskSpec.props.poolUid.options.push({
                id: poolUid,
                name: pool.name,
            });
        }

        const reporters = __sherlockStores.space().pools.getPoolReporters('grid');
        console.log('REPO', reporters);
    }

    _saveMetas(taskMetas: ISherlockTask): ISherlockTask {
        // save metas
        taskMetas.type = taskMetas.type.id ?? taskMetas.type.value ?? taskMetas.type;
        taskMetas.poolUid = taskMetas.poolUid.id ?? taskMetas.poolUid.value ?? taskMetas.poolUid;
        taskMetas.serviceUid = __sherlockStores.route.service;
        this._task = taskMetas;

        // set the settings specs to use
        if (!SDobbyTasksSpecsByType[taskMetas.type]) {
            // @TODO            handle this case
            throw new Error('Somethings wrong...');
        }
        this._settingsSpecs = SDobbyTasksSpecsByType[taskMetas.type];

        // go to next step
        this._step = 'settings';

        // return the task
        return this._task;
    }

    _saveSettings(taskSettings: any): ISherlockTask {
        // save the settings in the task
        this._task.settings = taskSettings;

        // add the task in the store
        __sherlockStores.space().tasks.addTask(this._task);

        // return the task
        return this._task;
    }

    render() {
        return html`
            <ul class="sh-new-task">
                <div class="s-spacing:30">
                    <h1 class="s-typo:h3">New task</h1>
                    <p class="s-typo:lead">Add a new task for the XXX client in the XXX space</p>
                    <div>
                        ${this._step === 'settings'
                            ? html`
                                  <s-specs-editor
                                      uid="new-task-settings"
                                      .values=${{}}
                                      .specs=${this._settingsSpecs}
                                      @s-specs-editor.save=${(e) => {
                                          this._saveSettings(e.detail.values);
                                      }}
                                  ></s-specs-editor>
                              `
                            : html`
                                  <s-specs-editor
                                      uid="new-task"
                                      .values=${{}}
                                      .specs=${SDobbyTaskSpec}
                                      i18n.save-button="Continue"
                                      @s-specs-editor.save=${(e) => {
                                          this._saveMetas(e.detail.values);
                                      }}
                                  ></s-specs-editor>
                              `}
                    </div>
                </div>
            </ul>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

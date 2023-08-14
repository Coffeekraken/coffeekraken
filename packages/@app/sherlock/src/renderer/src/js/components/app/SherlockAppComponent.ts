import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import __sherlockStores from '../../stores/SherlockStores.js';

import { define as __SSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';

import '@fortawesome/fontawesome-free/js/all';

import '../footer/SherlockFooterComponent.js';
import '../header/SherlockHeaderComponent.js';
import '../newSpace/SherlockNewSpaceComponent.js';
import '../newTask/SherlockNewTaskComponent.js';
import '../service/SherlockServiceComponent.js';
import '../sidebar/SherlockSidebarComponent.js';
import '../userInfo/SherlockUserInfoComponent.js';

@customElement('sherlock-app')
export class SherlockAppComponent extends LitElement {
    static styles = css``;

    constructor() {
        super();

        // register some components
        __SSpecsEditorComponentDefine();

        // listen for store changes
        __sherlockStores.route.$set(['space', 'service', 'popup'], () => {
            this.requestUpdate();
        });
        __sherlockStores.app.$set('*', () => {
            this.requestUpdate();
        });
    }

    render() {
        return html`
            <div class="_bkg"></div>
            <div class="sh-app">
                <div class="_dragger"></div>
                <sherlock-spaces></sherlock-spaces>
                <div class="_body">
                    ${__sherlockStores.route.space
                        ? html` <sherlock-header></sherlock-header> `
                        : ''}

                    <div class="_content">
                        ${__sherlockStores.route.space
                            ? html` <sherlock-sidebar></sherlock-sidebar> `
                            : ''}
                        ${__sherlockStores.route.service
                            ? html`
                                  <sherlock-service
                                      .service=${__sherlockStores.route.service}
                                  ></sherlock-service>
                              `
                            : ``}
                    </div>

                    <div class="_popup ${__sherlockStores.route.popup ? 'active' : ''}">
                        ${__sherlockStores.route.popup === 'userInfo'
                            ? html` <sherlock-user-info></sherlock-user-info> `
                            : __sherlockStores.route.popup === 'newSpace'
                            ? html` <sherlock-new-space></sherlock-new-space> `
                            : __sherlockStores.route.popup === 'newTask'
                            ? html` <sherlock-new-task></sherlock-new-task> `
                            : ''}
                    </div>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

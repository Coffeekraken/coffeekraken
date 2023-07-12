import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';


import __sherlockAppStore from '../../stores/SherlockAppStore.js';

import "@fortawesome/fontawesome-free/js/all";

import '../footer/SherlockFooterComponent.js';
import '../header/SherlockHeaderComponent.js';
import '../service/SherlockServiceComponent.js';
import '../sidebar/SherlockSidebarComponent.js';

@customElement('sherlock-app')
export class SherlockAppComponent extends LitElement {
    static styles = css``

    constructor() {
        super()

        // load the resources
        this._load();

        // listen for store changes
        __sherlockAppStore.$set('*', () => {
            this.requestUpdate()
        })
        __sherlockAppStore.$set('currentSpace', async () => {
            const clients = await window.sherlock.getClients(__sherlockAppStore.currentSpace.uid);
            __sherlockAppStore.currentSpace.clients = clients;
        })
    }

    // @property({type: String})
    // name?: string = 'World';

    async _load() {
      // load the spaces
      const spaces = await window.sherlock.getSpaces();
      __sherlockAppStore.spaces = spaces;
    }

    render() {
        return html`
            <div class="_bkg"></div>
            <div class="sh-app">
                <sherlock-header></sherlock-header>
                <div class="_body">
                    <sherlock-sidebar></sherlock-sidebar>

                    ${__sherlockAppStore.currentService ? html`
                        <sherlock-service .service=${__sherlockAppStore.currentService}></sherlock-service>
                    ` : ''}
                    
                </div>
                <sherlock-footer></sherlock-footer>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}

import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ISherlockClient, ISherlockService } from '../../../../../shared/SherlockTypes';

import __sherlockAppStore from '../../stores/SherlockAppStore';

import '../spaces/SherlockSpacesComponent.js';

@customElement('sherlock-sidebar')
export class SherlockSidebarComponent extends LitElement {

  static styles = css``;

  // @property({type: String})
  // name?: string = 'World';

  constructor() {
    super();

    // reactivity
    __sherlockAppStore.$set('*', () => {
      this.requestUpdate();
    });

  }

  async _loadClientServices(client: ISherlockClient): Promise<void> {
    const services = await window.sherlock.getServices(client.uid);
    client.services = services;
    this.requestUpdate();
  }

  _toggleClient(client: ISherlockClient): void {
    if (!__sherlockAppStore.clientStates[client.uid]) {
      __sherlockAppStore.clientStates[client.uid] = {
        sidebar: true
      }
    } else {
      __sherlockAppStore.clientStates[client.uid].sidebar = !__sherlockAppStore.clientStates[client.uid].sidebar;
    }
  }

  async _selectService(service: ISherlockService): Promise<void> {
    __sherlockAppStore.currentService = service;
    this.requestUpdate();
  }

  render() {

    return html`

      <sherlock-spaces></sherlock-spaces>

      <nav class="sh-sidebar">

        ${!__sherlockAppStore.currentSpace ? html`

          <p>Please select a space</p>

        ` : html`

          ${!__sherlockAppStore.currentSpace?.clients?.length ? html`
              <p>Loading clients...</p>
            ` : html`
              <ul class="_clients">
                ${__sherlockAppStore.currentSpace.clients.map((client: ISherlockClient) => html`
                  <li class="_client ${__sherlockAppStore.clientStates[client.uid]?.sidebar ? 'active' : ''}"> 
                    <div class="_client-name" @pointerup=${e => {
                      this._toggleClient(client);
                      this._loadClientServices(client);
                    }}>
                      ${client.name}
                      <i class="fa-solid fa-angle-down"></i>
                    </div>
                    
                    ${!client.services?.length ? html`
                    ` : html`
                      <ul class="_services">
                        <div class="_inner">
                        ${client.services.map((service: ISherlockService) => html`
                          <li class="_service ${__sherlockAppStore.currentService?.uid === service.uid ? 'active' : ''}">
                            <div class="_service-name" @pointerup=${e => {
                              this._selectService(service);
                            }}>
                              <i class="fa-regular fa-circle-dot"></i> ${service.name}
                            </div>
                          </li>
                        `)}
                          </div>
                      </ul>
                    `}

                  </li>
                `)}
              </ul>
            `}

        `}

      </nav>

    `;
  }

  createRenderRoot() {
    return this;
  };
}
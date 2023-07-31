import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ISherlockClient } from '../../../../../shared/SherlockTypes';

import __sherlockStores from '../../stores/SherlockStores';

import '../spaces/SherlockSpacesComponent.js';

@customElement('sherlock-sidebar')
export class SherlockSidebarComponent extends LitElement {
    static styles = css``;

    // @property({type: String})
    // name?: string = 'World';

    constructor() {
        super();

        // reactivity
        __sherlockStores.route.$set('space', () => {
            __sherlockStores.current().clients.$set(
                '*',
                () => {
                    this.requestUpdate();
                },
                {
                    group: true,
                },
            );
            this.requestUpdate();
        });

        __sherlockStores.spaces.$set(
            '*',
            () => {
                this.requestUpdate();
            },
            {
                group: true,
            },
        );

        // __sherlockStores.current().services.$set(
        //     '*',
        //     () => {
        //         this.requestUpdate();
        //     },
        //     {
        //         debounce: true,
        //     },
        // );
    }

    _toggleClient(client: ISherlockClient): void {
        if (!__sherlockStores.app.clientStates[client.uid]) {
            __sherlockStores.app.clientStates[client.uid] = {
                sidebar: true,
            };
        } else {
            __sherlockStores.app.clientStates[client.uid].sidebar =
                !__sherlockStores.app.clientStates[client.uid].sidebar;
        }
        this.requestUpdate();
    }

    _selectService(clientUid: string, serviceUid: string): Promise<void> {
        __sherlockStores.route.setRoute({
            client: clientUid,
            service: serviceUid,
        });
        this.requestUpdate();
    }

    private taskId(client, service): string {
        return `${client.uid ?? client}.${service.uid ?? service}`;
    }

    render() {
        let clients = {};
        if (__sherlockStores.route.space) {
            clients = __sherlockStores.current().clients.getClients();
        }

        return html`
            <sherlock-spaces></sherlock-spaces>
            <nav class="sh-sidebar">
                ${!__sherlockStores.route.space
                    ? html` <p>Please select a space</p> `
                    : html`
                          ${!clients?.length
                              ? html` <p>Loading clients...</p> `
                              : html`
                                    <ul class="_clients">
                                        ${Object.entries(clients).map(([clientUid, client]) => {
                                            const services = __sherlockStores
                                                .current()
                                                .services.getServices({
                                                    client: client.uid,
                                                });

                                            return html`
                                                <li
                                                    class="_client ${__sherlockStores.app
                                                        .clientStates[client.uid]?.sidebar
                                                        ? 'active'
                                                        : ''}"
                                                >
                                                    <div
                                                        class="_client-name"
                                                        @pointerup=${(e) => {
                                                            this._toggleClient(client);
                                                        }}
                                                    >
                                                        ${client.name}
                                                        <i class="fa-solid fa-angle-down"></i>
                                                    </div>

                                                    ${!Object.keys(services).length
                                                        ? html``
                                                        : html`
                                                              <ul class="_services">
                                                                  <div class="_inner">
                                                                      ${Object.entries(
                                                                          services,
                                                                      ).map(
                                                                          ([
                                                                              serviceUid,
                                                                              service,
                                                                          ]) => html`
                                                                              <li
                                                                                  class="_service ${__sherlockStores
                                                                                      .route
                                                                                      .service ===
                                                                                  service.uid
                                                                                      ? 'active'
                                                                                      : ''}"
                                                                              >
                                                                                  <div
                                                                                      class="_service-name"
                                                                                      @pointerup=${(
                                                                                          e,
                                                                                      ) => {
                                                                                          this._selectService(
                                                                                              client.uid,
                                                                                              service.uid,
                                                                                          );
                                                                                      }}
                                                                                  >
                                                                                      <i
                                                                                          class="fa-regular fa-circle-dot"
                                                                                      ></i>
                                                                                      ${service.name}
                                                                                  </div>
                                                                              </li>
                                                                          `,
                                                                      )}
                                                                  </div>
                                                              </ul>
                                                          `}
                                                </li>
                                            `;
                                        })}
                                    </ul>
                                `}
                      `}
            </nav>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

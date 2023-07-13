import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import __sherlockStores from '../../stores/SherlockStores.js'

import '@fortawesome/fontawesome-free/js/all'

import '../footer/SherlockFooterComponent.js'
import '../header/SherlockHeaderComponent.js'
import '../service/SherlockServiceComponent.js'
import '../sidebar/SherlockSidebarComponent.js'

@customElement('sherlock-app')
export class SherlockAppComponent extends LitElement {
    static styles = css``

    constructor() {
        super()

        // listen for store changes
        __sherlockStores.route.$set('service', () => {
            this.requestUpdate()
        })
        __sherlockStores.app.$set('*', () => {
            this.requestUpdate()
        })
    }

    render() {
        return html`
            <div class="_bkg"></div>
            <div class="sh-app">
                <div class="_dragger"></div>
                <sherlock-header></sherlock-header>
                <div class="_body">
                    <sherlock-sidebar></sherlock-sidebar>

                    ${__sherlockStores.route.service
                        ? html`
                              <sherlock-service
                                  .service=${__sherlockStores.route.service}
                              ></sherlock-service>
                          `
                        : ''}
                </div>
                <sherlock-footer></sherlock-footer>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}

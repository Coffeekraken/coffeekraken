import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ISherlockService } from '../../../../../shared/SherlockTypes.js'

import __sherlockStores from '../../stores/SherlockStores'

@customElement('sherlock-service')
export class SherlockServiceComponent extends LitElement {
    static styles = css``

    @property({ type: String })
    service: string = null

    constructor() {
        super()

        // reactive
        __sherlockStores.tasks.$set('*', () => {
            this.requestUpdate()
        })
        __sherlockStores.route.$set('service', () => {
            this.requestUpdate()
        })
    }

    render() {
        const service: ISherlockService = __sherlockStores.getService(this.service)
        return html`
            <article class="sh-service">
                <div class="_content">
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
                        </div>
                    </div>
                    ${service.description
                        ? html` <p class="_description">${service.description}</p> `
                        : ''}
                </div>
            </article>
        `
    }

    createRenderRoot() {
        return this
    }
}

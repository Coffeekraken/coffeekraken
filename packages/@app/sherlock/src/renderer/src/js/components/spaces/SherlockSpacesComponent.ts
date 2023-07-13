import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import type { ISherlockSpace } from '../../../../../shared/SherlockTypes.js'
import __sherlockStores from '../../stores/SherlockStores'

@customElement('sherlock-spaces')
export class SherlockSpacesComponent extends LitElement {
    static styles = css``

    //   @property({type: String})
    //   name?: string = 'World';

    constructor() {
        super()

        // reactive
        __sherlockStores.route.$set('*', () => {
            this.requestUpdate()
        })
        __sherlockStores.spaces.$set('*', () => {
            this.requestUpdate()
        })
    }

    selectSpace(spaceUid: string): void {
        __sherlockStores.setRoute({
            space: spaceUid
        })
    }

    render() {
        if (!__sherlockStores.spaces?.length) {
            return `Loading`
        }

        return html`
            <ul class="sh-spaces">
                ${Object.entries(__sherlockStores.spaces).map(
                    ([spaceUid, space]) => html`
                        <li
                            class="_space ${__sherlockStores.route.space === space.uid
                                ? 'active'
                                : ''}"
                            @pointerup=${(e) => {
                                this.selectSpace(space.uid)
                            }}
                        >
                            <figure class="_figure">
                                <img
                                    src="${space.image.url}"
                                    alt="${space.image.alt}"
                                    title="${space.image.title}"
                                />
                                <figcaption>${space.description}</figcaption>
                            </figure>
                        </li>
                    `
                )}
            </ul>
        `
    }

    createRenderRoot() {
        return this
    }
}

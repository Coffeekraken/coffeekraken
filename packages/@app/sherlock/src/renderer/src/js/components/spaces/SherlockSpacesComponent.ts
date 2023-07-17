import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

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

    newSpace(): void {
        __sherlockStores.setRoute({
            popup: 'newSpace'
        })
    }

    render() {
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

                <li
                    class="_space"
                    @pointerup=${(e) => {
                        this.newSpace()
                    }}
                >
                    <figure class="_figure">
                        <img
                            class="_media"
                            src="https://picsum.photos/200"
                            alt="New space"
                            title="New space"
                        />
                        <figcaption class="_caption">Add a new space</figcaption>
                        <i class="fa-solid fa-plus _icon"></i>
                    </figure>
                </li>
            </ul>
        `
    }

    createRenderRoot() {
        return this
    }
}

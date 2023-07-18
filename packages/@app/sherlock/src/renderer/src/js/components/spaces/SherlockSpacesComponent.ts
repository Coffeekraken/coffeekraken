import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ISherlockSpace } from '../../../../../shared/SherlockTypes';
import __sherlockStores from '../../stores/SherlockStores';

@customElement('sherlock-spaces')
export class SherlockSpacesComponent extends LitElement {
    static styles = css``;

    //   @property({type: String})
    //   name?: string = 'World';

    constructor() {
        super();

        // reactive
        __sherlockStores.route.$set('*', () => {
            this.requestUpdate();
        });
        __sherlockStores.spaces.$set('*', () => {
            this.requestUpdate();
        });
    }

    async selectSpace(space: ISherlockSpace): Promise<void> {
        const res = await window.sherlock.setSpace(space.toJson());

        __sherlockStores.route.setRoute({
            space: space.uid,
        });
    }

    newSpace(): void {
        __sherlockStores.route.setRoute({
            popup: 'newSpace',
        });
    }

    render() {
        return html`
            <ul class="sh-spaces">
                ${Object.entries(__sherlockStores.spaces).map(([spaceUid, space]) => {
                    return html`
                        <li
                            class="_space ${__sherlockStores.route.space === space.uid
                                ? 'active'
                                : ''}"
                            @pointerup=${(e) => {
                                this.selectSpace(space);
                            }}
                        >
                            <figure class="_figure">
                                <img
                                    class="_media"
                                    src="${space.image.url}"
                                    alt="${space.image.alt}"
                                    title="${space.image.title}"
                                />
                                <figcaption class="_caption">${space.description}</figcaption>
                            </figure>
                        </li>
                    `;
                })}

                <li
                    class="_space"
                    @pointerup=${(e) => {
                        this.newSpace();
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
        `;
    }

    createRenderRoot() {
        return this;
    }
}

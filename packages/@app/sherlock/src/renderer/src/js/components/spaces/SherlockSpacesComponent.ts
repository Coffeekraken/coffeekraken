import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ISherlockSpace } from '../../../../../shared/SherlockTypes.js';

import __sherlockAppStore from '../../stores/SherlockAppStore.js';

@customElement('sherlock-spaces')
export class SherlockSpacesComponent extends LitElement {
  
    static styles = css``;

//   @property({type: String})
//   name?: string = 'World';

  constructor() {
    super();

    // reactive
    __sherlockAppStore.$set(['spaces','currentSpace'], () => {
      console.log('U?)');
        this.requestUpdate();
    });

  }

  selectSpace(space: ISherlockSpace): void {
    __sherlockAppStore.currentSpace = space;
  }

  render() {

    if (!__sherlockAppStore.spaces?.length) {
      return `Loading`;
    }

    return html`
      <ul class="sh-spaces">
          ${__sherlockAppStore.spaces.map((space: ISherlockSpace) => html`
            <li class="_space ${__sherlockAppStore.currentSpace?.uid === space.uid ? 'active' : ''}" @pointerup=${e => {
              this.selectSpace(space);
            }}>
              <figure class="_figure">
                <img src="${space.image.url}" alt="${space.image.alt}" title="${space.image.title}" />
                <figcaption>
                  ${space.description}
                </figcaption>
              </figure>
            </li>
          `)}
      </ul>
    `;
  }

  createRenderRoot() {
    return this;
  };
}
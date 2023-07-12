import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ISherlockService, ISherlockSpace } from '../../../../../shared/SherlockTypes.js';

import __sherlockAppStore from '../../stores/SherlockAppStore.js';

@customElement('sherlock-header')
export class SherlockHeaderComponent extends LitElement {
  
    static styles = css``;

  constructor() {
    super();

    // reactive
    __sherlockAppStore.$set(['*'], () => {
        this.requestUpdate();
    });

  }

  render() {

    const service: ISherlockService = __sherlockAppStore.currentService,
        space: ISherlockSpace = __sherlockAppStore.currentSpace;

    return html`
        <header class="sh-header">
            <h1>
            ${space?.name ?? 'Sherlock'}
  </h1>

        </header>
    `;
  }

  createRenderRoot() {
    return this;
  };
}
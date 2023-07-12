import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ISherlockService } from '../../../../../shared/SherlockTypes.js';

import __sherlockAppStore from '../../stores/SherlockAppStore.js';

@customElement('sherlock-footer')
export class SherlockFooterComponent extends LitElement {
  
    static styles = css``;

  constructor() {
    super();

    // reactive
    __sherlockAppStore.$set(['*'], () => {
        this.requestUpdate();
    });

  }

  render() {

    const service: ISherlockService = __sherlockAppStore.currentService;

    return html`
        <header class="sh-footer">Sherlock</header>
    `;
  }

  createRenderRoot() {
    return this;
  };
}
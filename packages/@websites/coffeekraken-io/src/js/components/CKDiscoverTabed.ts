// @ts-nocheck

import __SInterface from "@coffeekraken/s-interface";
import __SLitComponent from "@coffeekraken/s-lit-component";
import { html } from "lit";

class SCKDiscoverTabedPropsInterface extends __SInterface {
  static get _definition() {
    return {
      platform: {
        type: "String",
      },
    };
  }
}

export default class CKDiscoverTabed extends __SLitComponent {
  static get properties() {
    return __SLitComponent.createProperties({}, SCKDiscoverTabedPropsInterface);
  }

  constructor() {
    super({
      shadowDom: false,
    });
  }

  _tabs = [
    {
      id: "js",
      title: "JS",
    },
    {
      id: "css",
      title: "CSS",
    },
    {
      id: "node",
      title: "NodeJS",
    },
    {
      id: "php",
      title: "PHP",
    },
  ];

  state = {
    activeTabId: "js",
  };

  _$discover;

  async firstUpdated() {
    this._$discover = this.querySelector("ck-discover");
  }

  render() {
    return html`
      <div class="ck-discover-tabed">
        <ul class="s-tabs s-color:accent s-mbe:50">
          ${this._tabs.map(
            (tab) => html`
              <li
                class="${this.state.activeTabId === tab.id ? "active" : ""}"
                @click=${() => {
                  this.state.activeTabId = tab.id;
                  this._$discover.grabItem();
                }}
              >
                ${tab.title}
              </li>
            `
          )}
        </ul>
        <ck-discover platform="${this.state.activeTabId}"></ck-discover>
      </div>
    `;
  }
}

export function define(props: any = {}, tagName = "ck-discover-tabed") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, CKDiscoverTabed);
}

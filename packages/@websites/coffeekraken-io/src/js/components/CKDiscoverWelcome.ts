// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __filterObject from '@coffeekraken/sugar/shared/object/filter';
import { html } from 'lit';
import { loadDocmap } from '../state/state';

class SCKDiscoverWelcomePropsInterface extends __SInterface {
  static get _definition() {
    return {
      platform: {
        type: 'String',
      },
    };
  }
}

export default class CKDiscoverWelcome extends __SLitComponent {
  static get properties() {
    return __SLitComponent.propertiesFromInterface(
      {},
      SCKDiscoverWelcomePropsInterface
    );
  }

  constructor() {
    super({
      shadowDom: false,
    });
  }

  _docmap;
  item;
  timeout;

  async firstUpdated() {
    this._docmap = await loadDocmap();
    this.grabItem();
  }

  async grabItem() {
    // this.item = undefined;
    // this.timeout = undefined;
    // this.requestUpdate();

    const newMap = __filterObject(this._docmap.map, (key, item) => {
      if (!item.platform) return false;
      if (!item.example?.[0]?.code) return false;
      if (this.props.platform && item.platform[0].name !== this.props.platform)
        return false;
      return true;
    });

    const mapCount = Object.keys(newMap).length;
    const mapKeys = Object.keys(newMap);
    const itemIdx = Math.floor(Math.random() * mapCount);

    this.item = newMap[mapKeys[itemIdx]];
    this.requestUpdate();

    this.timeout = setTimeout(() => {
      this.timeout = undefined;
      this.requestUpdate();
    }, 200);
  }

  render() {
    return html`
      <div class="ck-discover-welcome">
        ${!this.item
          ? html``
          : html`
              ${!this.timeout
                ? html`
                    <s-code-example lines="8" s-deps css="codeExample">
                      <code lang="${this.item.example[0].language}">
                        ${this.item.example[0].code}
                      </code>
                    </s-code-example>
                  `
                : ''}
            `}
      </div>
    `;
  }
}

export function define(props: any = {}, tagName = 'ck-discover-welcome') {
  __SLitComponent.define(tagName, CKDiscoverWelcome, props);
}

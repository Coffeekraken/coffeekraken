// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { __formatFileSize } from '@coffeekraken/sugar/format';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';

import '../../../../../../src/js/partials/s-dashboard-assets-component/s-dashboard-assets-component.css';

export interface ISDashboardAssetsComponentCategory {
    title: string;
    totalSize: number;
    compressionPercent: number;
    assets: ISDashboardAssetsComponentAsset[];
}

export interface ISDashboardAssetsComponentAsset {
    url: string;
    totalSize: number;
}

export default class SDashboardAssetsComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            _SDashboardComponentWidgetInterface,
        );
    }

    /**
     * @name            document
     * @type            Document
     * @get
     *
     * Access the document that the dashboard is using.
     * If in an iframe, take the parent document, otherwise, the document itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get document(): Document {
        return window.parent?.document ?? document;
    }

    _totalSize: number = 0;
    _totalSizeCompressed: number = 0;
    _links: ISDashboardAssetsComponentCategory = {
        title: 'Links',
        totalSize: 0,
        assets: [],
        compressionPercent: 50,
    };
    _scripts: ISDashboardAssetsComponentCategory = {
        title: 'Scripts',
        totalSize: 0,
        assets: [],
        compressionPercent: 70,
    };
    _imgs: ISDashboardAssetsComponentCategory = {
        title: 'Images',
        totalSize: 0,
        assets: [],
        compressionPercent: 0,
    };
    _videos: ISDashboardAssetsComponentCategory = {
        title: 'Videos',
        totalSize: 0,
        assets: [],
        compressionPercent: 0,
    };

    _toggleStates: Record<string, boolean> = {};

    constructor() {
        super({
            shadowDom: false,
        });
    }

    _displaySize(size: number): string {
        return __formatFileSize(size);
    }

    _handleItem(item): void {
        let link, img, script, video;
        switch (item.initiatorType) {
            case 'img':
                img = {
                    url: item.name,
                    totalSize: item.decodedBodySize,
                };
                this._totalSize += item.decodedBodySize;
                this._totalSizeCompressed += item.decodedBodySize;
                this._totalSizeCompressed +=
                    (item.decodedBodySize / 100) *
                    (100 - this._imgs.compressionPercent);
                this._imgs.totalSize += item.decodedBodySize;
                this._imgs.assets.push(img);
                break;
            case 'video':
                video = {
                    url: item.name,
                    totalSize: item.decodedBodySize,
                };
                this._totalSize += item.decodedBodySize;
                this._totalSizeCompressed +=
                    (item.decodedBodySize / 100) *
                    (100 - this._videos.compressionPercent);
                this._videos.totalSize += item.decodedBodySize;
                this._videos.assets.push(video);
                break;
            case 'script':
                script = {
                    url: item.name,
                    totalSize: item.decodedBodySize,
                    assets: [],
                };
                this._totalSize += item.decodedBodySize;
                this._totalSizeCompressed +=
                    (item.decodedBodySize / 100) *
                    (100 - this._scripts.compressionPercent);
                this._scripts.totalSize += item.decodedBodySize;
                this._scripts.assets.push(script);
                break;
            case 'link':
                link = {
                    url: item.name,
                    totalSize: item.decodedBodySize,
                    assets: [],
                };
                this._totalSize += item.decodedBodySize;
                this._totalSizeCompressed +=
                    (item.decodedBodySize / 100) *
                    (100 - this._links.compressionPercent);
                this._links.totalSize += item.decodedBodySize;
                this._links.assets.push(link);
                break;
            case 'css':
                link = {
                    url: item.name,
                    totalSize: item.decodedBodySize,
                };
                this._totalSize += item.decodedBodySize;
                this._totalSizeCompressed +=
                    (item.decodedBodySize / 100) *
                    (100 - this._links.compressionPercent);
                this._links.totalSize += item.decodedBodySize;
                this._links.assets.push(link);
                break;
            case 'other':
                if (!item.name.match(/\.js/)) {
                    return;
                }
                script = {
                    url: item.name,
                    totalSize: item.decodedBodySize,
                };
                this._totalSize += item.decodedBodySize;
                this._totalSizeCompressed +=
                    (item.decodedBodySize / 100) *
                    (100 - this._scripts.compressionPercent);
                this._scripts.totalSize += item.decodedBodySize;
                this._scripts.assets.push(script);
                break;
        }
    }

    mount() {
        const observer = new window.parent.PerformanceObserver((list) => {
            list.getEntries().forEach((item) => {
                this._handleItem(item);
            });
            this.requestUpdate();
        });
        observer.observe({ type: 'resource', buffered: true });
    }

    _renderCategory(
        category: ISDashboardAssetsComponentCategory,
        id: string,
    ): any {
        const totalSize = category.assets.reduce((size, link) => {
            size += link.totalSize;
            return size;
        }, 0);

        return html`
            <li class="_category">
                <div
                    class="_metas"
                    @click=${(e) => {
                        this._toggleStates[id] = !this._toggleStates[id];
                        this.requestUpdate();
                    }}
                >
                    <span class="_label"
                        >${category.title} (${category.assets.length})</span
                    >
                    <span class="_value">
                        ${category.compressionPercent
                            ? html`
                                  <span class="_compressed s-tooltip-container">
                                      ${this._displaySize(
                                          (totalSize / 100) *
                                              (100 -
                                                  category.compressionPercent),
                                      )}
                                      <div class="s-tooltip">
                                          Compressed (estimation)
                                      </div>
                                  </span>
                              `
                            : ''}
                        ${this._displaySize(totalSize)}</span
                    >
                </div>
                <div class="_details ${this._toggleStates[id] ? 'active' : ''}">
                    <div class="_details-inner">
                        <ul class="_details-assets">
                            ${category.assets
                                ?.sort((a, b) => {
                                    return a.totalSize > b.totalSize ? -1 : 0;
                                })
                                .map(
                                    (asset) => html`
                            <li class="_details-asset">
                                <span class="_details-label">${
                                    asset.url.length >= 50
                                        ? `...${asset.url.slice(
                                              asset.url.length - 50,
                                          )}`
                                        : asset.url
                                }</span>
                                <span class="_details-value">${this._displaySize(
                                    asset.totalSize,
                                )}
                            </li>
                        `,
                                )}
                        </ul>
                    </div>
                </div>
            </li>
        `;
    }

    render() {
        return html`
            <div class="s-dashboard-assets s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Assets</h2>

                <div class="ck-panel">
                    <ul class="_categories">
                        ${this._renderCategory(this._links, 'links')}
                        ${this._renderCategory(this._scripts, 'scripts')}
                        ${this._renderCategory(this._imgs, 'imgs')}
                        ${this._renderCategory(this._videos, 'videos')}
                    </ul>
                    <div class="_total">
                        <span class="_total-label">Total</span>
                        <span class="_total-value">
                            ${this._totalSize
                                ? html`
                                      <span
                                          class="_compressed s-tooltip-container"
                                      >
                                          ${this._displaySize(
                                              this._totalSizeCompressed,
                                          )}
                                          <div class="s-tooltip">
                                              Compressed (estimation)
                                          </div>
                                      </span>
                                      ${this._displaySize(this._totalSize)}
                                  `
                                : html` <i class="s-loader:spinner"></i> `}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }
}

export function __define(props: any = {}, tagName = 's-dashboard-assets') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardAssetsComponent);
}

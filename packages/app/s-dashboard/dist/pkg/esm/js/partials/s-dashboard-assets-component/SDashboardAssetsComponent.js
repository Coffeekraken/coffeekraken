// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __formatFileSize } from '@coffeekraken/sugar/format';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import '../../../../../../src/js/partials/s-dashboard-assets-component/s-dashboard-assets-component.css';
export default class SDashboardAssetsComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
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
    get document() {
        var _a, _b;
        return (_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document;
    }
    constructor() {
        super({
            shadowDom: false,
        });
        this._totalSize = 0;
        this._totalSizeCompressed = 0;
        this._links = {
            title: 'Links',
            totalSize: 0,
            assets: [],
            compressionPercent: 50,
        };
        this._scripts = {
            title: 'Scripts',
            totalSize: 0,
            assets: [],
            compressionPercent: 70,
        };
        this._imgs = {
            title: 'Images',
            totalSize: 0,
            assets: [],
            compressionPercent: 0,
        };
        this._videos = {
            title: 'Videos',
            totalSize: 0,
            assets: [],
            compressionPercent: 0,
        };
        this._toggleStates = {};
    }
    _displaySize(size) {
        return __formatFileSize(size);
    }
    _handleItem(item) {
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
    _renderCategory(category, id) {
        var _a;
        const totalSize = category.assets.reduce((size, link) => {
            size += link.totalSize;
            return size;
        }, 0);
        return html `
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
            ? html `
                                  <span class="_compressed s-tooltip-container">
                                      ${this._displaySize((totalSize / 100) *
                (100 -
                    category.compressionPercent))}
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
                            ${(_a = category.assets) === null || _a === void 0 ? void 0 : _a.sort((a, b) => {
            return a.totalSize > b.totalSize ? -1 : 0;
        }).map((asset) => html `
                            <li class="_details-asset">
                                <span class="_details-label">${asset.url.length >= 50
            ? `...${asset.url.slice(asset.url.length - 50)}`
            : asset.url}</span>
                                <span class="_details-value">${this._displaySize(asset.totalSize)}
                            </li>
                        `)}
                        </ul>
                    </div>
                </div>
            </li>
        `;
    }
    render() {
        return html `
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
            ? html `
                                      <span
                                          class="_compressed s-tooltip-container"
                                      >
                                          ${this._displaySize(this._totalSizeCompressed)}
                                          <div class="s-tooltip">
                                              Compressed (estimation)
                                          </div>
                                      </span>
                                      ${this._displaySize(this._totalSize)}
                                  `
            : html ` <i class="s-loader:spinner"></i> `}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }
}
export function __define(props = {}, tagName = 's-dashboard-assets') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardAssetsComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyxpR0FBaUcsQ0FBQztBQWN6RyxNQUFNLENBQUMsT0FBTyxPQUFPLHlCQUEwQixTQUFRLGVBQWU7SUFDbEUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUErQkQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFoQ1AsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2Qix5QkFBb0IsR0FBVyxDQUFDLENBQUM7UUFDakMsV0FBTSxHQUF1QztZQUN6QyxLQUFLLEVBQUUsT0FBTztZQUNkLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLEVBQUU7WUFDVixrQkFBa0IsRUFBRSxFQUFFO1NBQ3pCLENBQUM7UUFDRixhQUFRLEdBQXVDO1lBQzNDLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLEVBQUU7WUFDVixrQkFBa0IsRUFBRSxFQUFFO1NBQ3pCLENBQUM7UUFDRixVQUFLLEdBQXVDO1lBQ3hDLEtBQUssRUFBRSxRQUFRO1lBQ2Ys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
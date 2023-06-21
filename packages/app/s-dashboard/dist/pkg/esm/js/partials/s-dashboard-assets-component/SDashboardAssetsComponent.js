// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __formatFileSize } from '@coffeekraken/sugar/format';
import { css, html, unsafeCSS } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import __css from './s-dashboard-assets-component.css';
export default class SDashboardAssetsComponent extends __SLitComponent {
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
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
        this._documentSize = 0;
        this._totalSize = 0;
        this._totalSizeCompressed = 0;
        this._links = {
            title: 'Stylesheets',
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
        return __awaiter(this, void 0, void 0, function* () {
            let link, img, script, video;
            if (!item.decodedBodySize &&
                typeof item.name === 'string' &&
                item.name.match(/^https?\:\/\//)) {
                // check for external items
                if (!item.name.startsWith(this.document.location.origin)) {
                    item._isExternal = true;
                }
            }
            switch (item.initiatorType) {
                case 'img':
                    img = {
                        url: item.name,
                        totalSize: item.decodedBodySize,
                        external: item._isExternal,
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
                        external: item._isExternal,
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
                        external: item._isExternal,
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
                        external: item._isExternal,
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
                        external: item._isExternal,
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
                        external: item._isExternal,
                    };
                    this._totalSize += item.decodedBodySize;
                    this._totalSizeCompressed +=
                        (item.decodedBodySize / 100) *
                            (100 - this._scripts.compressionPercent);
                    this._scripts.totalSize += item.decodedBodySize;
                    this._scripts.assets.push(script);
                    break;
            }
        });
    }
    mount() {
        const observer = new window.parent.PerformanceObserver((list) => {
            list.getEntries().forEach((item) => {
                this._handleItem(item);
            });
            this.requestUpdate();
        });
        observer.observe({ type: 'resource', buffered: true });
        this._getPageSize();
    }
    _getPageSize() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(this.document.location.href), html = yield request.text();
            this._documentSize = html.split('').length;
            this._totalSize += this._documentSize;
            this._totalSizeCompressed += (this._documentSize / 100) * 40;
            this.requestUpdate();
        });
    }
    _renderCategory(category, id) {
        var _a;
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
                        >${category.title}
                        ${category.assets.length
            ? `(${category.assets.length})`
            : ''}</span
                    >
                    <span class="_value">
                        ${category.compressionPercent
            ? html `
                                  <span class="_compressed s-tooltip-container">
                                      ${this._displaySize((category.totalSize / 100) *
                (100 -
                    category.compressionPercent))}
                                      <div class="s-tooltip">
                                          Compressed estimation
                                          ~${category.compressionPercent}%
                                      </div>
                                  </span>
                              `
            : ''}
                        ${this._displaySize(category.totalSize)}</span
                    >
                </div>
                ${category.assets.length
            ? html `
                          <div
                              class="_details ${this._toggleStates[id]
                ? 'active'
                : ''}"
                          >
                              <div class="_details-inner">
                                  <ul class="_details-assets">
                                      ${(_a = category.assets) === null || _a === void 0 ? void 0 : _a.sort((a, b) => {
                return a.totalSize > b.totalSize
                    ? -1
                    : 0;
            }).map((asset) => html `
                                <li class="_details-asset">
                                    <a class="_details-label" href="${asset.url}" target="_blank">
                                    ${asset.external
                ? html `
                                                  <span
                                                      class="_external s-badge s-color:complementary"
                                                      >external</span
                                                  >
                                              `
                : ''}
                                    ${asset.url.length >= 50
                ? `...${asset.url.slice(asset.url.length - 50)}`
                : asset.url}</a>
                                    <span class="_details-value">${this._displaySize(asset.totalSize)}
                                </li>
                            `)}
                                  </ul>
                              </div>
                          </div>
                      `
            : ''}
            </li>
        `;
    }
    render() {
        return html `
            <div class="s-dashboard-assets s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Assets</h2>

                <div class="ck-panel">
                    <ul class="_categories">
                        ${this._renderCategory({
            title: 'HTML',
            totalSize: this._documentSize,
            assets: [],
            compressionPercent: 70,
        })}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxtQ0FBbUMsTUFBTSxvREFBb0QsQ0FBQztBQUVyRyxPQUFPLEtBQUssTUFBTSxvQ0FBb0MsQ0FBQztBQWV2RCxNQUFNLENBQUMsT0FBTyxPQUFPLHlCQUEwQixTQUFRLGVBQWU7SUFDbEUsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLG1DQUFtQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQWdDRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQWpDUCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLHlCQUFvQixHQUFXLENBQUMsQ0FBQztRQUNqQyxXQUFNLEdBQXVDO1lBQ3pDLEtBQUssRUFBRSxhQUFhO1lBQ3BCLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLEVBQUU7WUFDVixrQkFBa0IsRUFBRSxFQUFFO1NBQ3pCLENBQUM7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
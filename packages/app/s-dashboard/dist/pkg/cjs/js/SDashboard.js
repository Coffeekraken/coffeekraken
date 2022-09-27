"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const dom_1 = require("@coffeekraken/sugar/dom");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const object_1 = require("@coffeekraken/sugar/object");
const SDashboardComponent_1 = __importDefault(require("./SDashboardComponent"));
require("../../../../src/css/index.css");
const SDashboardSettingsInterface_1 = __importDefault(require("./interface/SDashboardSettingsInterface"));
class SDashboard extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        SDashboardSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name           _injectWebVitals
         * @type            Function
         * @private
         *
         * Inject the webvitals in the document
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._webVitalsInjected = false;
        // if in iframe, register custom element
        if ((0, dom_1.__isInIframe)()) {
            this.define();
            return;
        }
        // expose the dashboard on document to be able to access it from the iframe
        // @ts-ignore
        document.dashboard = this;
        // create the iframe
        this._$iframe = document.createElement('iframe');
        this._$iframe.classList.add(`s-dashboard-iframe`);
        this._$focusItem = document.createElement('div');
        this._$focusItem.setAttribute('tabindex', '-1');
        this._$focusItem.style.position = 'fixed';
        this._$focusItem.style.top = '0';
        this._$focusItem.style.left = '0';
        document.body.appendChild(this._$focusItem);
        (0, keyboard_1.__hotkey)('ctrl+s').on('press', () => {
            this.open();
        });
        (0, keyboard_1.__hotkey)('escape').on('press', () => {
            this.close();
        });
        (0, keyboard_1.__hotkey)('ctrl+p').on('press', () => {
            this.changePage();
        });
        this._injectWebVitals();
    }
    /**
     * @name            iframe
     * @type            HTMLIframeElement
     * @get
     *
     * Access the dashboard iframe
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get iframe() {
        return (document.querySelector('iframe.s-dashboard-iframe'));
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
    _injectWebVitals() {
        if (this._webVitalsInjected)
            return;
        this._webVitalsInjected = true;
        const $script = document.createElement('script');
        $script.setAttribute('type', 'module');
        $script.text = `
            import {getCLS, getFID, getLCP, getFCP, getTTFB} from 'https://unpkg.com/web-vitals?module';
            getCLS(function(res) {
                document.webVitals.cls = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getFID(function(res) {
                document.webVitals.fid = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getLCP(function(res) {
                document.webVitals.lcp = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getFCP(function(res) {
                document.webVitals.fcp = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getTTFB(function(res) {
                document.webVitals.ttfb = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
        `;
        // create a "webVitals" property on document to store results
        // @ts-ignore
        document.webVitals = {};
        this.document.body.appendChild($script);
    }
    /**
     * @name            changePage
     * @type            Function
     *
     * Open the dashboard with the pages component selected
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    changePage() {
        var _a;
        // open the dashboard
        this.open();
        // @ts-ignore
        (_a = this._$iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('dashboard.changePage', {}));
        // @ts-ignore
        this._$iframe.contentDocument.isChangePageWanted = true;
    }
    /**
     * @name            open
     * @type            Function
     *
     * Open the dashboard
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    close() {
        // handle class
        this._$iframe.classList.remove('active');
        // overflow
        this.document.querySelector('html').style.removeProperty('overflow');
        // get focus back
        setTimeout(() => {
            this._$focusItem.focus();
        }, 100);
    }
    /**
     * @name            open
     * @type            Function
     *
     * Open the dashboard
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._$iframe.parentElement) {
                document.body.appendChild(this._$iframe);
                this._$iframe.contentWindow.document.open();
                this._$iframe.contentWindow.document.write(`
                <html>
                <head>
                <script>
                    var $document = document;
                    if (window.parent) {
                        $document = window.parent.document;
                    }
                    var $html = $document.querySelector('html');
                    var $dashboardHtml = document.querySelector('html');
                    var theme = $html.getAttribute('theme');
                    var isDark = theme.match(/dark$/);
                    if (isDark && window.parent) {
                        $dashboardHtml.setAttribute('theme', 'default-dark');
                    } else {
                        $dashboardHtml.setAttribute('theme', 'default-light');
                    }
                    $document.addEventListener('s-theme.change', function(e) {
                        $dashboardHtml.setAttribute('theme', 'default-' + e.detail.variant);
                    });
                    var $originalScript = window.parent.document.querySelector('script');
                    var $script = document.createElement('script');
                    $script.setAttribute('src', $originalScript.getAttribute('src'));
                    $script.setAttribute('type', 'module');
                    document.addEventListener('DOMContentLoaded', function() {
                        document.querySelector('head').appendChild($script);
                    });
                </script>
                </head>
                <body s-sugar>
                    <s-dashboard></s-dashboard>
                </body>
                </html>
            `);
                this._$iframe.contentWindow.document.close();
            }
            // handle class
            this._$iframe.classList.add('active');
            // overflow
            this.document.querySelector('html').style.overflow = 'hidden';
            // // init the dashboard
            // const SDashboardComponent = await import('./SDashboardComponent');
            // SDashboardComponent.define();
        });
    }
    define(props = {}, tagName = 's-dashboard', win = window) {
        SDashboardComponent_1.default.define('s-dashboard', SDashboardComponent_1.default, {}, {
            window: win,
        });
    }
}
exports.default = SDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGlEQUF1RDtBQUN2RCwyREFBd0Q7QUFDeEQsdURBQXlEO0FBRXpELGdGQUEwRDtBQUUxRCx5Q0FBdUM7QUFDdkMsMEdBQW9GO0FBZ0NwRixNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUFzQzVDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYixxQ0FBNkIsQ0FBQyxRQUFRLEVBQUUsRUFDeEMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFvQ047Ozs7Ozs7OztXQVNHO1FBQ0gsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBNUN2Qix3Q0FBd0M7UUFDeEMsSUFBSSxJQUFBLGtCQUFZLEdBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxPQUFPO1NBQ1Y7UUFFRCwyRUFBMkU7UUFDM0UsYUFBYTtRQUNiLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFNUMsSUFBQSxtQkFBUSxFQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUEsbUJBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFBLG1CQUFRLEVBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXZGRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQTBCLENBQ3RCLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FDdEQsQ0FBQztJQUNOLENBQUM7SUFRRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFpRUQsZ0JBQWdCO1FBQ1osSUFBSSxJQUFJLENBQUMsa0JBQWtCO1lBQUUsT0FBTztRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLElBQUksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQ2QsQ0FBQztRQUNGLDZEQUE2RDtRQUM3RCxhQUFhO1FBQ2IsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFVBQVU7O1FBQ04scUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLGFBQWE7UUFDYixNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSwwQ0FBRSxhQUFhLENBQ3hDLElBQUksV0FBVyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUM5QyxDQUFDO1FBQ0YsYUFBYTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxLQUFLO1FBQ0QsZUFBZTtRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxXQUFXO1FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRSxpQkFBaUI7UUFDakIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0csSUFBSTs7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFpQzFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEQ7WUFFRCxlQUFlO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXRDLFdBQVc7WUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUU5RCx3QkFBd0I7WUFDeEIscUVBQXFFO1lBQ3JFLGdDQUFnQztRQUNwQyxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsYUFBYSxFQUFFLEdBQUcsR0FBRyxNQUFNO1FBQ3BELDZCQUFxQixDQUFDLE1BQU0sQ0FDeEIsYUFBYSxFQUNiLDZCQUFxQixFQUNyQixFQUFFLEVBQ0Y7WUFDSSxNQUFNLEVBQUUsR0FBRztTQUNkLENBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhRRCw2QkFnUUMifQ==
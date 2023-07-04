var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import { __injectStyle } from '@coffeekraken/sugar/dom';
import { __escapeQueue, __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __css from '../css/index.css';
import __SDashboardSettingsInterface from './interface/SDashboardSettingsInterface';
export default class SDashboard extends __SClass {
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
        super(__deepMerge(
        // @ts-ignore
        __SDashboardSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * Track if the component has already been inited
         */
        this._defined = false;
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
        // inject css
        __injectStyle(__css);
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
        __hotkey('ctrl+s').on('press', () => {
            this.open();
        });
        __hotkey('ctrl+y').on('press', () => {
            this.open();
        });
        this._injectWebVitals();
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
    // changePage() {
    //     // open the dashboard
    //     this.open();
    //     // @ts-ignore
    //     this._$iframe.contentDocument?.dispatchEvent(
    //         new CustomEvent('dashboard.changePage', {}),
    //     );
    //     // @ts-ignore
    //     this._$iframe.contentDocument.isChangePageWanted = true;
    // }
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
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
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
                    </script>
                    ${this.settings.env === 'development'
                    ? '<script src="http://localhost:3030/sugar/dashboard/init.js" type="module" defer></script>'
                    : '<script src="https://cdnv2.coffeekraken.io/s-dashboard/init/init.js" type="module" defer></script>'}
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
            // handle escape to close
            __escapeQueue(() => {
                _console.log('CLOSE');
                this.close();
            }, {
                rootNode: [document, this.document],
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxPQUFPLEtBQUssTUFBTSxrQkFBa0IsQ0FBQztBQUNyQyxPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBaUNwRixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzVDOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBMEIsQ0FDdEIsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUN0RCxDQUFDO0lBQ04sQ0FBQztJQWFEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYiw2QkFBNkIsQ0FBQyxRQUFRLEVBQUUsRUFDeEMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFwQ047O1dBRUc7UUFDSCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBK0RqQjs7Ozs7Ozs7O1dBU0c7UUFDSCx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUF0Q3ZCLGFBQWE7UUFDYixhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsMkVBQTJFO1FBQzNFLGFBQWE7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
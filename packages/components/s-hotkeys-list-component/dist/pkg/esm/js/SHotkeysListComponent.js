import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import __SHotkeysListComponentInterface from './interface/SHotkeysListComponentInterface.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import __css from '../../../../src/css/s-hotkeys-list.css'; // relative to /dist/pkg/esm/js
export default class SHotkeysListComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SHotkeysListComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    get _hotkeys() {
        var _a, _b;
        return (_a = this.props.hotkeys) !== null && _a !== void 0 ? _a : (_b = document.env) === null || _b === void 0 ? void 0 : _b.HOTKEYS;
    }
    constructor() {
        super({
            name: 's-hotkeys-list',
            interface: __SHotkeysListComponentInterface,
        });
        // listen for updates
        document.addEventListener('hotkeys.update', (e) => {
            this.requestUpdate();
        });
    }
    render() {
        var _a;
        return html `
            <ol class="${this.utils.cls('_list')}">
                ${Object.keys((_a = this._hotkeys) !== null && _a !== void 0 ? _a : {}).map((hotkey) => {
            var _a;
            const hotkeyObj = this._hotkeys[hotkey];
            return html `
                        <li class="${this.utils.cls('_list-item')}">
                            <div class="${this.utils.cls('_hotkey')}">
                                ${unsafeHTML(`
                                    ${((_a = hotkeyObj.hotkey) !== null && _a !== void 0 ? _a : hotkey)
                .split('+')
                .map((key) => `<span
                                                    class="${this.utils.cls('_key')}"
                                                    >${key}</span
                                                >`)
                .join('+')}
                                    `)}
                            </div>
                            <div class="${this.utils.cls('_metas')}">
                                ${hotkeyObj.title
                ? html `
                                          <h1
                                              class="${this.utils.cls('_title')}"
                                          >
                                              ${hotkeyObj.title}
                                          </h1>
                                      `
                : ''}
                                ${hotkeyObj.description
                ? html `
                                          <p
                                              class="${this.utils.cls('_description')}"
                                          >
                                              ${hotkeyObj.description}
                                          </p>
                                      `
                : ''}
                            </div>
                        </li>
                    `;
        })}
            </ol>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLGdDQUFnQyxNQUFNLCtDQUErQyxDQUFDO0FBRTdGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sd0NBQXdDLENBQUMsQ0FBQywrQkFBK0I7QUErQzNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8scUJBQXNCLFNBQVEsZUFBZTtJQUM5RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLGdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sbUNBQUksTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxPQUFPLENBQUM7SUFDdkQsQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsZ0NBQWdDO1NBQzlDLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUksQ0FBQTt5QkFDTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7a0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7WUFDOUMsTUFBTSxTQUFTLEdBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQTtxQ0FDTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7MENBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztrQ0FDakMsVUFBVSxDQUFDO3NDQUNQLENBQUMsTUFBQSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxNQUFNLENBQUM7aUJBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUNBLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQzs2REFDUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsTUFBTSxDQUNUO3VEQUNFLEdBQUc7a0RBQ1IsQ0FDVDtpQkFDQSxJQUFJLENBQUMsR0FBRyxDQUFDO3FDQUNiLENBQUM7OzBDQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztrQ0FDaEMsU0FBUyxDQUFDLEtBQUs7Z0JBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQTs7dURBRWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLFFBQVEsQ0FDWDs7Z0RBRUMsU0FBUyxDQUFDLEtBQUs7O3VDQUV4QjtnQkFDSCxDQUFDLENBQUMsRUFBRTtrQ0FDTixTQUFTLENBQUMsV0FBVztnQkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7dURBRWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLGNBQWMsQ0FDakI7O2dEQUVDLFNBQVMsQ0FBQyxXQUFXOzt1Q0FFOUI7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUU7OztxQkFHbkIsQ0FBQztRQUNOLENBQUMsQ0FBQzs7U0FFVCxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=
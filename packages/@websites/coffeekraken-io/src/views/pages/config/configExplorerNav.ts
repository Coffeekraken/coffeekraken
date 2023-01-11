// // @ts-nocheck

// import __SLitComponent from '@coffeekraken/s-lit-component';
// import __SRequest from '@coffeekraken/s-request';
// import __filter from '@coffeekraken/sugar/shared/object/filter';
// import { __get } from '@coffeekraken/sugar/object';
// import { html } from 'lit';
// import { property } from 'lit/decorators.js';

// export interface IConfigExplorerNavComponentProps {}

// export class ConfigExplorerNav extends __SLitComponent {
//     constructor() {
//         super({
//             shadowDom: false,
//             // interface: __ConfigExplorerNavComponentInterface,
//         });
//     }

//     _openedNamespaces = [];
//     _menuStack = {};
//     _menuStates = {};

//     @property()
//     _loaded = false;

//     async firstUpdated() {
//         const request = new __SRequest({
//             url: '/api/docmap',
//             method: 'get',
//         });

//         // restore state
//         this._menuStates = JSON.parse(
//             window.localStorage.getItem('ConfigExplorerNavStates') ?? '{}',
//         );

//         const cachedNav = JSON.parse(
//             window.localStorage.getItem('ConfigExplorerNav') ?? '{}',
//         );
//         if (Object.keys(cachedNav).length) {
//             this._menuStack = cachedNav;
//             this._loaded = true;
//         }

//         const res = await request.send();
//         const listed = [];
//         res.data.map = __filter(res.data.map, (key, item) => {
//             if (!key.match(/[a-zA-Z0-9]+\.config\.[a-zA-Z0-9]+/)) return false;
//             if (listed.includes(key)) return false;
//             listed.push(key);
//             return true;
//         });
//     }

//     _isAcive(namespace) {
//         return this._menuStates[namespace]?.opened;
//     }

//     _toggle(namespace) {
//         if (!this._menuStates[namespace]) {
//             this._menuStates[namespace] = {
//                 opened: true,
//             };
//         } else {
//             this._menuStates[namespace].opened = !this._menuStates[namespace]
//                 .opened;
//         }

//         // save state
//         window.localStorage.setItem(
//             'ConfigExplorerNavStates',
//             JSON.stringify(this._menuStates),
//         );

//         this.requestUpdate();
//     }

//     _renderList(obj, currentNamespace = '') {
//         const items = Object.keys(obj).map((itemName) => {
//             const itemObj = obj[itemName];
//             const itemNamespace = `${
//                 currentNamespace ? `${currentNamespace}.` : ''
//             }${itemName}`;

//             if (itemObj.name && itemObj.namespace) {
//                 let icon = itemObj.platform[0].name;

//                 return html`
//                     <li>
//                         <i
//                             class="s-icon:file-${icon} s-tc:extension-${icon}"
//                         ></i>
//                         <a href="/api/${itemNamespace}">${itemObj.name}</a>
//                     </li>
//                 `;
//             } else {
//                 return html`
//                     <li class="${this._isAcive(itemNamespace) ? 'active' : ''}">
//                         <i
//                             class="s-icon:folder-opened s-tc:info s-when:active"
//                         ></i>
//                         <i class="s-icon:folder"></i>
//                         <span
//                             @click=${() => {
//                                 this._toggle(itemNamespace);
//                             }}
//                         >
//                             ${itemName}
//                         </span>
//                         ${this._menuStates[itemNamespace]?.opened
//                             ? html`
//                                   ${this._renderList(
//                                       __get(this._menuStack, itemNamespace),
//                                       itemNamespace,
//                                   )}
//                               `
//                             : ''}
//                     </li>
//                 `;
//             }
//         });

//         return html`
//             <ul class="${!currentNamespace ? 's-fs-tree' : ''}">
//                 ${items}
//             </ul>
//         `;
//     }

//     render() {
//         if (!this._loaded) {
//             return html`
//                 <div class="s-until:sibling:mounted">
//                     <i class="s-loader:spinner s-color:accent"></i>
//                     &nbsp;
//                     <p class="s-typo:p s-display:inline-block">
//                         Loading API navigation.<br />Please wait...
//                     </p>
//                 </div>
//             `;
//         }

//         return html`
//             <div class="${this.utils.cls('')}">
//                 ${this._renderList(this._menuStack)}
//             </div>
//         `;
//     }
// }

// export default () => {
//     if (!customElements.get('config-explorer-nav')) {
//         customElements.define('config-explorer-nav', ConfigExplorerNav);
//     }
// };

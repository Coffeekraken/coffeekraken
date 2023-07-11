"use strict";
// // @ts-nocheck
// import __SLitComponent from '@coffeekraken/s-lit-component';
// import __SRequest from '@coffeekraken/s-request';
// import __filterObject from '@coffeekraken/sugar/object';
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
//         res.data.map = __filterObject(res.data.map, (key, item) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFFakIsK0RBQStEO0FBQy9ELG9EQUFvRDtBQUNwRCwyREFBMkQ7QUFDM0Qsc0RBQXNEO0FBQ3RELDhCQUE4QjtBQUM5QixnREFBZ0Q7QUFFaEQsdURBQXVEO0FBRXZELDJEQUEyRDtBQUMzRCxzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLGdDQUFnQztBQUNoQyxtRUFBbUU7QUFDbkUsY0FBYztBQUNkLFFBQVE7QUFFUiw4QkFBOEI7QUFDOUIsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUV4QixrQkFBa0I7QUFDbEIsdUJBQXVCO0FBRXZCLDZCQUE2QjtBQUM3QiwyQ0FBMkM7QUFDM0Msa0NBQWtDO0FBQ2xDLDZCQUE2QjtBQUM3QixjQUFjO0FBRWQsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw4RUFBOEU7QUFDOUUsYUFBYTtBQUViLHdDQUF3QztBQUN4Qyx3RUFBd0U7QUFDeEUsYUFBYTtBQUNiLCtDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLFlBQVk7QUFFWiw0Q0FBNEM7QUFDNUMsNkJBQTZCO0FBQzdCLHVFQUF1RTtBQUN2RSxrRkFBa0Y7QUFDbEYsc0RBQXNEO0FBQ3RELGdDQUFnQztBQUNoQywyQkFBMkI7QUFDM0IsY0FBYztBQUNkLFFBQVE7QUFFUiw0QkFBNEI7QUFDNUIsc0RBQXNEO0FBQ3RELFFBQVE7QUFFUiwyQkFBMkI7QUFDM0IsOENBQThDO0FBQzlDLDhDQUE4QztBQUM5QyxnQ0FBZ0M7QUFDaEMsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixnRkFBZ0Y7QUFDaEYsMkJBQTJCO0FBQzNCLFlBQVk7QUFFWix3QkFBd0I7QUFDeEIsdUNBQXVDO0FBQ3ZDLHlDQUF5QztBQUN6QyxnREFBZ0Q7QUFDaEQsYUFBYTtBQUViLGdDQUFnQztBQUNoQyxRQUFRO0FBRVIsZ0RBQWdEO0FBQ2hELDZEQUE2RDtBQUM3RCw2Q0FBNkM7QUFDN0Msd0NBQXdDO0FBQ3hDLGlFQUFpRTtBQUNqRSw2QkFBNkI7QUFFN0IsdURBQXVEO0FBQ3ZELHVEQUF1RDtBQUV2RCwrQkFBK0I7QUFDL0IsMkJBQTJCO0FBQzNCLDZCQUE2QjtBQUM3QixpRkFBaUY7QUFDakYsZ0NBQWdDO0FBQ2hDLDhFQUE4RTtBQUM5RSw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLHVCQUF1QjtBQUN2QiwrQkFBK0I7QUFDL0IsbUZBQW1GO0FBQ25GLDZCQUE2QjtBQUM3QixtRkFBbUY7QUFDbkYsZ0NBQWdDO0FBQ2hDLHdEQUF3RDtBQUN4RCxnQ0FBZ0M7QUFDaEMsK0NBQStDO0FBQy9DLCtEQUErRDtBQUMvRCxpQ0FBaUM7QUFDakMsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyxrQ0FBa0M7QUFDbEMsb0VBQW9FO0FBQ3BFLHNDQUFzQztBQUN0Qyx3REFBd0Q7QUFDeEQsK0VBQStFO0FBQy9FLHVEQUF1RDtBQUN2RCx1Q0FBdUM7QUFDdkMsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLGdCQUFnQjtBQUNoQixjQUFjO0FBRWQsdUJBQXVCO0FBQ3ZCLG1FQUFtRTtBQUNuRSwyQkFBMkI7QUFDM0Isb0JBQW9CO0FBQ3BCLGFBQWE7QUFDYixRQUFRO0FBRVIsaUJBQWlCO0FBQ2pCLCtCQUErQjtBQUMvQiwyQkFBMkI7QUFDM0Isd0RBQXdEO0FBQ3hELHNFQUFzRTtBQUN0RSw2QkFBNkI7QUFDN0Isa0VBQWtFO0FBQ2xFLHNFQUFzRTtBQUN0RSwyQkFBMkI7QUFDM0IseUJBQXlCO0FBQ3pCLGlCQUFpQjtBQUNqQixZQUFZO0FBRVosdUJBQXVCO0FBQ3ZCLGtEQUFrRDtBQUNsRCx1REFBdUQ7QUFDdkQscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYixRQUFRO0FBQ1IsSUFBSTtBQUVKLHlCQUF5QjtBQUN6Qix3REFBd0Q7QUFDeEQsMkVBQTJFO0FBQzNFLFFBQVE7QUFDUixLQUFLIn0=
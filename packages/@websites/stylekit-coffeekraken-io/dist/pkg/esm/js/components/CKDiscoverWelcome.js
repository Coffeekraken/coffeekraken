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
import __SInterface from '@coffeekraken/s-interface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __pickRandom } from '@coffeekraken/sugar/array';
import { __wait } from '@coffeekraken/sugar/datetime';
import { html } from 'lit';
import { loadDocmap } from '../state/state.js';
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
        return __SLitComponent.propertiesFromInterface({}, SCKDiscoverWelcomePropsInterface);
    }
    constructor() {
        super({
            shadowDom: false,
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._docmap = yield loadDocmap();
            this.grabItem();
        });
    }
    grabItem() {
        return __awaiter(this, void 0, void 0, function* () {
            this.item = undefined;
            this.timeout = undefined;
            this.requestUpdate();
            yield __wait();
            const ids = [
                '@coffeekraken.sugar.js.dom.query.querySelectorLive',
                '@coffeekraken.sugar.js.dom.query.querySelectorUp',
                '@coffeekraken.sugar.js.dom.class.addAnimationClass',
                '@coffeekraken.sugar.js.dom.detect.onScrollEnd',
                '@coffeekraken.sugar.js.dom.detect.whenInteract',
                '@coffeekraken.sugar.js.dom.detect.whenInViewport',
                '@coffeekraken.sugar.js.dom.element.elementAreaStats',
                '@coffeekraken.sugar.js.dom.is.isInViewport',
                '@coffeekraken.sugar.js.dom.is.isUserScrolling',
                '@coffeekraken.sugar.js.dom.style.getTransformProperties',
                '@coffeekraken.sugar.js.dom.ui.makeFloat',
                '@coffeekraken.sugar.js.is.isChrome',
                '@coffeekraken.sugar.js.is.isFirefox',
                '@coffeekraken.sugar.js.is.isEdge',
                '@coffeekraken.sugar.js.is.isMobile',
                '@coffeekraken.sugar.js.keyboard.hotkey',
                '@coffeekraken.sugar.node.compression.unzip',
                '@coffeekraken.sugar.node.exec.execPhp',
                '@coffeekraken.sugar.node.is.isCommandExists',
                '@coffeekraken.sugar.node.load.loadConfigFile',
                '@coffeekraken.sugar.node.network.getFreePort',
                '@coffeekraken.sugar.node.network.ipAddress',
                '@coffeekraken.sugar.node.network.isPortFree',
                '@coffeekraken.sugar.node.process.onProcessExit',
                '@coffeekraken.sugar.node.process.sharedContext',
                '@coffeekraken.sugar.php.gravatar.url',
                '@coffeekraken.sugar.php.object.deepMap',
                '@coffeekraken.sugar.php.object.deepMerge',
                '@coffeekraken.sugar.php.object.sort',
                '@coffeekraken.sugar.php.url.currentUrl',
                '@coffeekraken.sugar.shared.array.pickRandom',
                '@coffeekraken.sugar.shared.array.unique',
                '@coffeekraken.sugar.shared.color.convert',
                '@coffeekraken.sugar.shared.crypto.aes',
                '@coffeekraken.sugar.shared.crypto.base64',
                '@coffeekraken.sugar.shared.crypto.md5',
                '@coffeekraken.sugar.shared.crypto.sha256',
                '@coffeekraken.sugar.shared.crypto.sha512',
                '@coffeekraken.sugar.shared.css.easing.cssEasingStrToJsFunction',
                '@coffeekraken.sugar.shared.datetime.formatDuration',
                '@coffeekraken.sugar.shared.datetime.wait',
                '@coffeekraken.sugar.shared.extension.commonAudioFileExtensions',
                '@coffeekraken.sugar.shared.extension.commonFontFileExtensions',
                '@coffeekraken.sugar.shared.extension.commonImageFileExtensions',
                '@coffeekraken.sugar.shared.extension.commonProgrammingFileExtensions',
                '@coffeekraken.sugar.shared.extension.commonVideoFileExtensions',
                '@coffeekraken.sugar.shared.extension.commonWebFileExtensions',
                '@coffeekraken.sugar.shared.function.throttle',
                '@coffeekraken.sugar.shared.is.isBase64',
                '@coffeekraken.sugar.shared.is.isBrowser',
                '@coffeekraken.sugar.shared.is.isChildProcess',
                '@coffeekraken.sugar.shared.is.isColor',
                '@coffeekraken.sugar.shared.is.isCreditCard',
                '@coffeekraken.sugar.shared.is.isEmail',
                '@coffeekraken.sugar.shared.is.isIsoDate',
                '@coffeekraken.sugar.shared.is.isLinux',
                '@coffeekraken.sugar.shared.is.isNode',
                '@coffeekraken.sugar.shared.is.isPlainObject',
                '@coffeekraken.sugar.shared.is.isWindows',
                '@coffeekraken.sugar.shared.math.clamp',
                '@coffeekraken.sugar.shared.math.easeClamp',
                '@coffeekraken.sugar.shared.module.currentModuleSystem',
                '@coffeekraken.sugar.shared.object.deepMap',
                '@coffeekraken.sugar.shared.object.deepMerge',
                '@coffeekraken.sugar.shared.object.clone',
                '@coffeekraken.sugar.shared.object.set',
                '@coffeekraken.sugar.shared.object.get',
                '@coffeekraken.sugar.shared.string.camelCase',
                '@coffeekraken.sugar.shared.string.dashCase',
                '@coffeekraken.sugar.shared.string.snakeCase',
                '@coffeekraken.sugar.shared.url.gravatarUrl',
            ];
            for (let i = 0; i < ids.length; i++) {
                if (!this._docmap.map[ids[i]] ||
                    !this._docmap.map[ids[i]].example) {
                    console.log(ids[i]);
                }
            }
            this.item = this._docmap.map[__pickRandom(ids)];
            this.requestUpdate();
        });
    }
    render() {
        return html `
            <div class="ck-discover-welcome">
                ${!this.item
            ? html ``
            : html `
                          ${!this.timeout
                ? html `
                                    <s-code-example lines="15">
                                        <code
                                            lang="${this.item.example[0]
                    .language}"
                                        >
                                            ${this.item.example[0].code}
                                        </code>
                                    </s-code-example>
                                `
                : ''}
                      `}
                <a
                    @click="${() => this.grabItem()}"
                    class="s-btn s-radius:100 s-color:accent _refresh"
                >
                    <i class="s-icon:ui-refresh"></i>
                </a>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 'ck-discover-welcome') {
    __SLitComponent.define(tagName, CKDiscoverWelcome, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRS9DLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsZUFBZTtJQUMxRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLGdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU1LLFlBQVk7O1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFSyxRQUFROztZQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixN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
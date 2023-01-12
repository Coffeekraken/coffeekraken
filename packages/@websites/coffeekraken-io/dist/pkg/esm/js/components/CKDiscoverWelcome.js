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
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKDiscoverWelcomePropsInterface);
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
                if (!this._docmap.map[ids[i]] || !this._docmap.map[ids[i]].example) {
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
                      <code lang="${this.item.example[0].language}">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2FBQ2Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQkFBa0IsU0FBUSxlQUFlO0lBUTVEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVhELE1BQU0sS0FBSyxVQUFVO1FBQ25CLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUM1QyxFQUFFLEVBQ0YsZ0NBQWdDLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBWUssWUFBWTs7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFSyxRQUFROztZQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixN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
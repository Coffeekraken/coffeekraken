"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const array_1 = require("@coffeekraken/sugar/array");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const lit_1 = require("lit");
const state_1 = require("../state/state");
class SCKDiscoverWelcomePropsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            platform: {
                type: 'String',
            },
        };
    }
}
class CKDiscoverWelcome extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCKDiscoverWelcomePropsInterface);
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._docmap = yield (0, state_1.loadDocmap)();
            this.grabItem();
        });
    }
    grabItem() {
        return __awaiter(this, void 0, void 0, function* () {
            this.item = undefined;
            this.timeout = undefined;
            this.requestUpdate();
            yield (0, datetime_1.__wait)();
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
            this.item = this._docmap.map[(0, array_1.__pickRandom)(ids)];
            this.requestUpdate();
        });
    }
    render() {
        return (0, lit_1.html) `
      <div class="ck-discover-welcome">
        ${!this.item
            ? (0, lit_1.html) ``
            : (0, lit_1.html) `
              ${!this.timeout
                ? (0, lit_1.html) `
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
exports.default = CKDiscoverWelcome;
function define(props = {}, tagName = 'ck-discover-welcome') {
    s_lit_component_1.default.define(tagName, CKDiscoverWelcome, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELHFEQUF5RDtBQUN6RCwyREFBc0Q7QUFDdEQsNkJBQTJCO0FBQzNCLDBDQUE0QztBQUU1QyxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ3BCLE9BQU87WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7YUFDZjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFxQixpQkFBa0IsU0FBUSx5QkFBZTtJQVE1RDtRQUNFLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFYRCxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzVDLEVBQUUsRUFDRixnQ0FBZ0MsQ0FDakMsQ0FBQztJQUNKLENBQUM7SUFZSyxZQUFZOztZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBQSxrQkFBVSxHQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLE1BQU0sSUFBQSxpQkFBTSxHQUFFLENBQUM7WUFFZixNQUFNLEdBQUcsR0FBRztnQkFDVixvREFBb0Q7Z0JBQ3BELGtEQUFrRDtnQkFDbEQsb0RBQW9EO2dCQUNwRCwrQ0FBK0M7Z0JBQy9DLGdEQUFnRDtnQkFDaEQsa0RBQWtEO2dCQUNsRCxxREFBcUQ7Z0JBQ3JELDRDQUE0QztnQkFDNUMsK0NBQStDO2dCQUMvQyx5REFBeUQ7Z0JBQ3pELHlDQUF5QztnQkFDekMsb0NBQW9DO2dCQUNwQyxxQ0FBcUM7Z0JBQ3JDLGtDQUFrQztnQkFDbEMsb0NBQW9DO2dCQUNwQyx3Q0FBd0M7Z0JBQ3hDLDRDQUE0QztnQkFDNUMsdUNBQXVDO2dCQUN2Qyw2Q0FBNkM7Z0JBQzdDLDhDQUE4QztnQkFDOUMsOENBQThDO2dCQUM5Qyw0Q0FBNEM7Z0JBQzVDLDZDQUE2QztnQkFDN0MsZ0RBQWdEO2dCQUNoRCxnREFBZ0Q7Z0JBQ2hELHNDQUFzQztnQkFDdEMsd0NBQXdDO2dCQUN4QywwQ0FBMEM7Z0JBQzFDLHFDQUFxQztnQkFDckMsd0NBQXdDO2dCQUN4Qyw2Q0FBNkM7Z0JBQzdDLHlDQUF5QztnQkFDekMsMENBQTBDO2dCQUMxQyx1Q0FBdUM7Z0JBQ3ZDLDBDQUEwQztnQkFDMUMsdUNBQXVDO2dCQUN2QywwQ0FBMEM7Z0JBQzFDLDBDQUEwQztnQkFDMUMsZ0VBQWdFO2dCQUNoRSxvREFBb0Q7Z0JBQ3BELDBDQUEwQztnQkFDMUMsZ0VBQWdFO2dCQUNoRSwrREFBK0Q7Z0JBQy9ELGdFQUFnRTtnQkFDaEUsc0VBQXNFO2dCQUN0RSxnRUFBZ0U7Z0JBQ2hFLDhEQUE4RDtnQkFDOUQsOENBQThDO2dCQUM5Qyx3Q0FBd0M7Z0JBQ3hDLHlDQUF5QztnQkFDekMsOENBQThDO2dCQUM5Qyx1Q0FBdUM7Z0JBQ3ZDLDRDQUE0QztnQkFDNUMsdUNBQXVDO2dCQUN2Qyx5Q0FBeUM7Z0JBQ3pDLHVDQUF1QztnQkFDdkMsc0NBQXNDO2dCQUN0Qyw2Q0FBNkM7Z0JBQzdDLHlDQUF5QztnQkFDekMsdUNBQXVDO2dCQUN2QywyQ0FBMkM7Z0JBQzNDLHVEQUF1RDtnQkFDdkQsMkNBQTJDO2dCQUMzQyw2Q0FBNkM7Z0JBQzdDLHlDQUF5QztnQkFDekMsdUNBQXVDO2dCQUN2Qyx1Q0FBdUM7Z0JBQ3ZDLDZDQUE2QztnQkFDN0MsNENBQTRDO2dCQUM1Qyw2Q0FBNkM7Z0JBQzdDLDRDQUE0QzthQUM3QyxDQUFDO1lBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckI7YUFDRjtZQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSxvQkFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFaEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVELE1BQU07UUFDSixPQUFPLElBQUEsVUFBSSxFQUFBOztVQUVMLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDVixDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUEsRUFBRTtZQUNSLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTtnQkFDQSxDQUFDLElBQUksQ0FBQyxPQUFPO2dCQUNiLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7b0NBRWMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTswQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTs7O21CQUdoQztnQkFDSCxDQUFDLENBQUMsRUFBRTthQUNQOztvQkFFTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7S0FNcEMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTVJRCxvQ0E0SUM7QUFFRCxTQUFnQixNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLHFCQUFxQjtJQUNyRSx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUZELHdCQUVDIn0=
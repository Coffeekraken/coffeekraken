// @ts-nocheck

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
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            SCKDiscoverWelcomePropsInterface,
        );
    }

    constructor() {
        super({
            shadowDom: false,
        });
    }

    _docmap;
    item;
    timeout;

    async firstUpdated() {
        this._docmap = await loadDocmap();
        this.grabItem();
    }

    async grabItem() {
        this.item = undefined;
        this.timeout = undefined;
        this.requestUpdate();

        await __wait();

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
            if (
                !this._docmap.map[ids[i]] ||
                !this._docmap.map[ids[i]].example
            ) {
                console.log(ids[i]);
            }
        }

        this.item = this._docmap.map[__pickRandom(ids)];

        this.requestUpdate();
    }

    render() {
        return html`
            <div class="ck-discover-welcome">
                ${!this.item
                    ? html``
                    : html`
                          ${!this.timeout
                              ? html`
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
                    class="s-btn s-radius:100 s-color:accent __refresh"
                >
                    <i class="s-icon:ui-refresh"></i>
                </a>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-discover-welcome') {
    __SLitComponent.define(tagName, CKDiscoverWelcome, props);
}

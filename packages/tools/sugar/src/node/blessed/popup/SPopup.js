"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../terminal/parseHtml"));
const color_1 = __importDefault(require("../../color/color"));
const escapeStack_1 = __importDefault(require("../../terminal/escapeStack"));
const activeSpace_1 = __importDefault(require("../../core/activeSpace"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
module.exports = class SBlessedPopup extends SBlessedComponent_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            title: null,
            description: null,
            id: 'SBlessedPopup',
            width: '80%',
            height: 200,
            top: '50%',
            left: '50%',
            style: {
                bg: color_1.default('terminal.primary').toString(),
                fg: color_1.default('terminal.black').toString()
            },
            padding: {
                top: 0,
                bottom: 1,
                left: 2,
                right: 2
            },
            $title: {
                top: 0,
                height: 3,
                padding: {
                    top: 1,
                    bottom: 1,
                    left: 0,
                    right: 0
                }
            },
            $description: {
                height: 2,
                style: {
                    bg: color_1.default('terminal.black').toString(),
                    fg: color_1.default('terminal.white').toString()
                },
                padding: {
                    top: 1,
                    bottom: 0,
                    left: 2,
                    right: 2
                }
            },
            $content: {
                left: 0,
                right: 0,
                scrollable: true,
                scrollbar: {
                    ch: ' ',
                    inverse: true
                },
                scrollable: true,
                mouse: true,
                keys: true,
                padding: {
                    top: 1,
                    left: 2,
                    bottom: 1,
                    right: 2
                }
            }
        }, settings));
        if (this._settings.title) {
            this.$title = blessed_1.default.box(Object.assign(Object.assign({ style: this._settings.style }, this._settings.$title), { content: parseHtml_1.default(this._settings.title) }));
        }
        if (this._settings.description) {
            this.$description = blessed_1.default.box(Object.assign(Object.assign({}, this._settings.$description), { top: this.$title ? this.$title.height : 0, content: parseHtml_1.default(this._settings.description) }));
        }
        if (this.$title)
            super.append(this.$title);
        if (this.$description)
            super.append(this.$description);
        let contentTop = 0;
        if (this.$title)
            contentTop += this.$title.height;
        if (this.$description)
            contentTop += this.$description.height;
        this.$content = blessed_1.default.box(Object.assign({ top: contentTop, style: {
                scrollbar: {
                    bg: this._settings.style.bg || color_1.default('terminal.primary').toString()
                }
            } }, (this._settings.$content || {})));
        this.promise = new SPromise_1.default({
            id: this._settings.id
        });
        super.append(this.$content);
        this.promise.trigger('open');
        activeSpace_1.default.append(this._settings.id);
        const escape = escapeStack_1.default(() => {
            activeSpace_1.default.previous();
            escape.cancel();
            this.promise.trigger('close');
            this.detach();
        });
    }
    /**
     * @name            append
     * @type            Function
     * @override
     *
     * This method is simply used to append content inside the popup
     *
     * @return        {SBlessedComponent}            Return this component to maintain chainability
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    append(content) {
        this.$content.append(content);
        return this;
    }
    /**
     * @name            update
     * @type            Function
     * @override
     *
     * This method simply draw the header
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    update() {
        this.height = this.$content.getScrollHeight() + 7;
        this.top = `50%-${Math.round(this.height / 2)}`;
        this.left = `50%-${Math.round(this.width / 2)}`;
        super.update();
    }
};
//# sourceMappingURL=module.js.map
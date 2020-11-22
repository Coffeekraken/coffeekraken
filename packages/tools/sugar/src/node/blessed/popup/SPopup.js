"use strict";
const __blessed = require('blessed');
const __SBlessedComponent = require('../SBlessedComponent');
const __deepMerge = require('../../object/deepMerge');
const __parseHtml = require('../../terminal/parseHtml');
const __color = require('../../color/color');
const __escapeStack = require('../../terminal/escapeStack');
const __activeSpace = require('../../core/activeSpace');
const __SPromise = require('../../promise/SPromise');
/**
 * @name                  SBlessedPopup
 * @namespace           sugar.node.blessed.popup
 * @type                  Class
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - title (null) {String}: The popup title
 * - description (null) {String}: A description to display in the popup
 * - id (popup) {String}: An id to identify the popup. This id will be appended to the "activeSpace" when the popup is opened
 *
 * @example       js
 * const SBlessedPopup = require('@coffeekraken/sugar/node/blessed/popup/SBlessedPopup');
 * const myPopup = new SBlessedPopup();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBlessedPopup extends __SBlessedComponent {
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
        super(__deepMerge({
            title: null,
            description: null,
            id: 'SBlessedPopup',
            width: '80%',
            height: 200,
            top: '50%',
            left: '50%',
            style: {
                bg: __color('terminal.primary').toString(),
                fg: __color('terminal.black').toString()
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
                    bg: __color('terminal.black').toString(),
                    fg: __color('terminal.white').toString()
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
            this.$title = __blessed.box({
                style: this._settings.style,
                ...this._settings.$title,
                content: __parseHtml(this._settings.title)
            });
        }
        if (this._settings.description) {
            this.$description = __blessed.box({
                ...this._settings.$description,
                top: this.$title ? this.$title.height : 0,
                content: __parseHtml(this._settings.description)
            });
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
        this.$content = __blessed.box({
            top: contentTop,
            style: {
                scrollbar: {
                    bg: this._settings.style.bg || __color('terminal.primary').toString()
                }
            },
            ...(this._settings.$content || {})
        });
        this.promise = new __SPromise({
            id: this._settings.id
        });
        super.append(this.$content);
        this.promise.trigger('open');
        __activeSpace.append(this._settings.id);
        const escape = __escapeStack(() => {
            __activeSpace.previous();
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

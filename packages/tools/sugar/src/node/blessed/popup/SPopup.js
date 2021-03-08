"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
const color_1 = __importDefault(require("../../color/color"));
const escapeStack_1 = __importDefault(require("../../terminal/escapeStack"));
const activeSpace_1 = __importDefault(require("../../core/activeSpace"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name                  SBlessedPopup
 * @namespace           sugar.node.blessed.popup
 * @type                  Class
 * @status              wip
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - title (null) {String}: The popup title
 * - description (null) {String}: A description to display in the popup
 * - id (popup) {String}: An id to identify the popup. This id will be appended to the "activeSpace" when the popup is opened
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedPopup from '@coffeekraken/sugar/node/blessed/popup/SBlessedPopup';
 * const myPopup = new SBlessedPopup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBlessedPopup extends SBlessedComponent_1.default {
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
            blessed: {
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
        this.promise = new s_promise_1.default({
            id: this._settings.id
        });
        super.append(this.$content);
        this.promise.emit('open');
        activeSpace_1.default.append(this._settings.id);
        const escape = escapeStack_1.default(() => {
            activeSpace_1.default.previous();
            escape.cancel();
            this.promise.emit('close');
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
}
exports.default = SBlessedPopup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BvcHVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1BvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUFnQztBQUNoQyw2RUFBdUQ7QUFDdkQsdUVBQWlEO0FBQ2pELHdFQUFrRDtBQUNsRCw4REFBd0M7QUFDeEMsNkVBQXVEO0FBQ3ZELHlFQUFtRDtBQUNuRCx3RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBcUIsYUFBYyxTQUFRLDJCQUFtQjtJQUM1RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLEVBQUUsRUFBRSxlQUFlO1lBQ25CLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsR0FBRztnQkFDWCxHQUFHLEVBQUUsS0FBSztnQkFDVixJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLGVBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDMUMsRUFBRSxFQUFFLGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsRUFBRTtpQkFDekM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxDQUFDO29CQUNULElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxDQUFDO2lCQUNUO2dCQUNELE1BQU0sRUFBRTtvQkFDTixHQUFHLEVBQUUsQ0FBQztvQkFDTixNQUFNLEVBQUUsQ0FBQztvQkFDVCxPQUFPLEVBQUU7d0JBQ1AsR0FBRyxFQUFFLENBQUM7d0JBQ04sTUFBTSxFQUFFLENBQUM7d0JBQ1QsSUFBSSxFQUFFLENBQUM7d0JBQ1AsS0FBSyxFQUFFLENBQUM7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
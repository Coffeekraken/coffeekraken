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
        this.promise = new SPromise_1.default({
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BvcHVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1BvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsc0RBQWdDO0FBQ2hDLDZFQUF1RDtBQUN2RCx1RUFBaUQ7QUFDakQseUVBQW1EO0FBQ25ELDhEQUF3QztBQUN4Qyw2RUFBdUQ7QUFDdkQseUVBQW1EO0FBQ25ELHNFQUFnRDtBQTBCaEQsaUJBQVMsTUFBTSxhQUFjLFNBQVEsMkJBQW1CO0lBQ3REOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLElBQUk7WUFDakIsRUFBRSxFQUFFLGVBQWU7WUFDbkIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxLQUFLO2dCQUNaLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEdBQUcsRUFBRSxLQUFLO2dCQUNWLElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsZUFBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxFQUFFO29CQUMxQyxFQUFFLEVBQUUsZUFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxFQUFFO2lCQUN6QztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLENBQUM7b0JBQ04sTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxDQUFDO29CQUNULE9BQU8sRUFBRTt3QkFDUCxHQUFHLEVBQUUsQ0FBQzt3QkFDTixNQUFNLEVBQUUsQ0FBQzt3QkFDVCxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxLQUFLLEVBQUUsQ0FBQztxQkFDVDtpQkFDRjtnQkFDRCxZQUFZLEVBQUU7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
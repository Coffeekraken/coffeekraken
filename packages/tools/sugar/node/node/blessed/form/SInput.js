"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const color_1 = __importDefault(require("../../color/color"));
const escapeStack_1 = __importDefault(require("../../terminal/escapeStack"));
const activeSpace_1 = __importDefault(require("../../core/activeSpace"));
/**
 * @name                  SBlessedInput
 * @namespace           sugar.node.blessed.input
 * @type                  Class
 * @status              wip
 *
 * This class represent a simple input
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - escapeKey (false) {Boolean}: Specify if you want to reject the input promise on escape key press
 * - placeholder (null) {String}: Specify a placeholder
 * - width (null) {String|Number}: This is the normal blessed component width parameter but you can specify "auto" if you want the input to adapt his width depending on his content
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedInput from '@coffeekraken/sugar/node/blessed/form/SBlessedInput';
 * new SBlessedInput({});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBlessedInput extends SBlessedComponent_1.default {
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
        const inputSettings = deepMerge_1.default({
            id: 'SInput',
            focus: true,
            placeholder: null,
            blessed: {
                width: '100%',
                height: 3,
                keys: true,
                mouse: true,
                inputOnFocus: true,
                style: {
                    bg: color_1.default('terminal.cyan').toString(),
                    fg: color_1.default('terminal.black').toString()
                },
                padding: {
                    top: 1,
                    bottom: 1,
                    left: 2,
                    right: 2
                }
            }
        }, settings);
        super({
        // width: '100%',
        // height: null,
        });
        this._escapeKeyPromise = null;
        this.$input = blessed_1.default.textbox(inputSettings);
        this.promise = new s_promise_1.default({
            id: this._settings.id
        });
        this.$input.height =
            inputSettings.padding.top + inputSettings.padding.bottom + 1;
        this.height = inputSettings.padding.top + inputSettings.padding.bottom + 1;
        this.$input.on('blur', () => {
            console.log('blue');
            if (this.$input.focused) {
                console.log('remove');
            }
        });
        this.$input.on('focus', () => {
            activeSpace_1.default.append('form.input');
            this._escapeKeyPromise = escapeStack_1.default(() => {
                activeSpace_1.default.remove('.form.input');
            });
        });
        this.$input.on('attach', () => {
            setTimeout(() => {
                if (inputSettings.focus)
                    this.$input.focus();
                let placeholderPressed = false;
                if (inputSettings.placeholder) {
                    const placeholder = inputSettings.placeholder.toString();
                    if (inputSettings.width === 'auto') {
                        this.$input.width =
                            placeholder.length +
                                this.$input.padding.left +
                                this.$input.padding.right +
                                2;
                    }
                    this.$input.setValue(placeholder);
                }
                let isBackspace = false;
                this.$input.onceKey('backspace,space,escape', () => {
                    isBackspace = true;
                });
                this.$input.on('keypress', (value, key) => {
                    setTimeout(() => {
                        if (inputSettings.placeholder && !placeholderPressed) {
                            if (!isBackspace) {
                                this.$input.setValue(value);
                            }
                            placeholderPressed = true;
                        }
                        if (inputSettings.width === 'auto') {
                            this.$input.width =
                                this.$input.getValue().length +
                                    this.$input.padding.left +
                                    this.$input.padding.right +
                                    2;
                        }
                        this.update();
                    });
                });
                this.$input.on('submit', (value) => {
                    this.promise.resolve(value);
                    this.$input.style.bg = color_1.default('terminal.green').toString();
                    if (inputSettings.width === 'auto') {
                        this.$input.width =
                            this.$input.getValue().length +
                                this.$input.padding.left +
                                this.$input.padding.right;
                    }
                    activeSpace_1.default.remove('.form.input');
                    if (this._escapeKeyPromise)
                        this._escapeKeyPromise.cancel();
                    this.update();
                });
                this.$input.on('cancel', () => {
                    this.promise.cancel();
                    this.$input.style.bg = color_1.default('terminal.red').toString();
                    if (inputSettings.width === 'auto') {
                        this.$input.width =
                            this.$input.getValue().length +
                                this.$input.padding.left +
                                this.$input.padding.right;
                    }
                    activeSpace_1.default.remove('.form.input');
                    if (this._escapeKeyPromise)
                        this._escapeKeyPromise.cancel();
                    this.update();
                });
                this.update();
            });
        });
        this.append(this.$input);
    }
}
exports.default = SBlessedInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvYmxlc3NlZC9mb3JtL1NJbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzREFBZ0M7QUFDaEMsNkVBQXVEO0FBQ3ZELHVFQUFpRDtBQUNqRCx3RUFBaUQ7QUFDakQsOERBQXdDO0FBQ3hDLDZFQUF1RDtBQUN2RCx5RUFBbUQ7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBcUIsYUFBYyxTQUFRLDJCQUFtQjtJQUM1RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FDL0I7WUFDRSxFQUFFLEVBQUUsUUFBUTtZQUNaLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLElBQUk7WUFDakIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxDQUFDO2dCQUNULElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxJQUFJO2dCQUNYLFlBQVksRUFBRSxJQUFJO2dCQUNsQixLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLGVBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxlQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUU7aUJBQ3pDO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxHQUFHLEVBQUUsQ0FBQztvQkFDTixNQUFNLEVBQUUsQ0FBQztvQkFDVCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsQ0FBQztpQkFDVDthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLEtBQUssQ0FBQztRQUNKLGlCQUFpQjtRQUNqQixnQkFBZ0I7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUU5QixJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDO1lBQzVCLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQ2hCLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUMzQixxQkFBYSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcscUJBQWEsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFDLHFCQUFhLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQzVCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxhQUFhLENBQUMsS0FBSztvQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QyxJQUFJLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDL0IsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFO29CQUM3QixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN6RCxJQUFJLGFBQWEsQ0FBQyxLQUFLLEtBQUssTUFBTSxFQUFFO3dCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7NEJBQ2YsV0FBVyxDQUFDLE1BQU07Z0NBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUk7Z0NBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0NBQ3pCLENBQUMsQ0FBQztxQkFDTDtvQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7b0JBQ2pELFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDeEMsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDZCxJQUFJLGFBQWEsQ0FBQyxXQUFXLElBQUksQ0FBQyxrQkFBa0IsRUFBRTs0QkFDcEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQzdCOzRCQUNELGtCQUFrQixHQUFHLElBQUksQ0FBQzt5QkFDM0I7d0JBQ0QsSUFBSSxhQUFhLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTs0QkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dDQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTTtvQ0FDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTtvQ0FDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSztvQ0FDekIsQ0FBQyxDQUFDO3lCQUNMO3dCQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsZUFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzVELElBQUksYUFBYSxDQUFDLEtBQUssS0FBSyxNQUFNLEVBQUU7d0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSzs0QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU07Z0NBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUk7Z0NBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztxQkFDN0I7b0JBQ0QscUJBQWEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3BDLElBQUksSUFBSSxDQUFDLGlCQUFpQjt3QkFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLGVBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDMUQsSUFBSSxhQUFhLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTt3QkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzRCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTTtnQ0FDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTtnQ0FDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO3FCQUM3QjtvQkFDRCxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCO3dCQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQXhJRCxnQ0F3SUMifQ==
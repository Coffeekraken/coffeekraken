"use strict";
// @ts-nocheck
const __terminalKit = require('terminal-kit').terminal;
const __blessed = require('blessed');
const __events = require('events');
const __cursorPos = require('./cursorPos');
const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');
/**
 * @name                            STerminalScreen
 * @namespace           sugar.node.terminal
 * @type                            Class
 *
 * Create a screen in which you can render all others items.
 * This class uses blessed under the hood to work properly.
 *
 * @param             {Object}              [settings={}]     On object of settings to configure the STerminalScreen like paddings, etc...
 *
 * @example           js
 * const STerminalScreen = require('@coffeekraken/node/terminal/STerminalScreen');
 * const myScreen = new STerminalScreen({
 *    // see settings above...
 * });
 * myScreen.render();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STerminalScreen extends __blessed.screen {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the STerminalScreen instance which inherit from the blessed.screen stack
     *
     * @param             {Object}                      [settings={}]               An object of blessed screen settings and some others described bellow...
     * - padding (process.env.STDOUT_PADDING || 3) {Number}: The amount of paddings that you want around your screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        settings = __deepMerge({
            router: null,
            smartCSR: true,
            // autoPadding: true,
            padding: process.env.STDOUT_PADDING
                ? {
                    top: process.env.STDOUT_PADDING - 1,
                    bottom: process.env.STDOUT_PADDING - 1,
                    left: process.env.STDOUT_PADDING,
                    right: process.env.STDOUT_PADDING
                }
                : {
                    top: 2,
                    bottom: 2,
                    left: 3,
                    right: 3
                }
        }, settings);
        super(settings);
        this._box = __blessed.box({
            top: typeof settings.padding === 'object'
                ? settings.padding.top || 3
                : settings.padding,
            bottom: typeof settings.padding === 'object'
                ? settings.padding.bottom || 3
                : settings.padding,
            left: typeof settings.padding === 'object'
                ? settings.padding.left || 3
                : settings.padding,
            right: typeof settings.padding === 'object'
                ? settings.padding.right || 3
                : settings.padding
        });
        super.append(this._box);
        if (settings.router && settings.router.setOutput) {
            settings.router.setOutput(this._box);
        }
        // listen for closing the app
        // this.key(['C-c', 'escape'], function () {
        //   this.destroy();
        //   process.exit();
        // });
    }
    /**
     * @name                            append
     * @type                            Function
     *
     * Append an element to the screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    append(node) {
        this._box.append(node);
    }
    /**
     * @name                            prepend
     * @type                            Function
     *
     * Prepend an element to the screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prepend(node) {
        this._box.prepend(node);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTY3JlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ3ZELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVyQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFbkMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxlQUFnQixTQUFRLFNBQVMsQ0FBQyxNQUFNO0lBQzdEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1lBQ0UsTUFBTSxFQUFFLElBQUk7WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLHFCQUFxQjtZQUNyQixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUNqQyxDQUFDLENBQUM7b0JBQ0UsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLENBQUM7b0JBQ25DLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxDQUFDO29CQUN0QyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO29CQUNoQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO2lCQUNsQztnQkFDSCxDQUFDLENBQUM7b0JBQ0UsR0FBRyxFQUFFLENBQUM7b0JBQ04sTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7U0FDTixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUN4QixHQUFHLEVBQ0QsT0FBTyxRQUFRLENBQUMsT0FBTyxLQUFLLFFBQVE7Z0JBQ2xDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU87WUFDdEIsTUFBTSxFQUNKLE9BQU8sUUFBUSxDQUFDLE9BQU8sS0FBSyxRQUFRO2dCQUNsQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQ3RCLElBQUksRUFDRixPQUFPLFFBQVEsQ0FBQyxPQUFPLEtBQUssUUFBUTtnQkFDbEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTztZQUN0QixLQUFLLEVBQ0gsT0FBTyxRQUFRLENBQUMsT0FBTyxLQUFLLFFBQVE7Z0JBQ2xDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDO2dCQUM3QixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU87U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ2hELFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUVELDZCQUE2QjtRQUM3Qiw0Q0FBNEM7UUFDNUMsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixNQUFNO0lBQ1IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsSUFBSTtRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0YsQ0FBQyJ9
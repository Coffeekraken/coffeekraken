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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3Rlcm1pbmFsL19fd2lwX18vU1NjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXJDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVuQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLGVBQWdCLFNBQVEsU0FBUyxDQUFDLE1BQU07SUFDN0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7WUFDRSxNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QscUJBQXFCO1lBQ3JCLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7Z0JBQ2pDLENBQUMsQ0FBQztvQkFDRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsQ0FBQztvQkFDbkMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLENBQUM7b0JBQ3RDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7b0JBQ2hDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7aUJBQ2xDO2dCQUNILENBQUMsQ0FBQztvQkFDRSxHQUFHLEVBQUUsQ0FBQztvQkFDTixNQUFNLEVBQUUsQ0FBQztvQkFDVCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsQ0FBQztpQkFDVDtTQUNOLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQ3hCLEdBQUcsRUFDRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEtBQUssUUFBUTtnQkFDbEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTztZQUN0QixNQUFNLEVBQ0osT0FBTyxRQUFRLENBQUMsT0FBTyxLQUFLLFFBQVE7Z0JBQ2xDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUM5QixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU87WUFDdEIsSUFBSSxFQUNGLE9BQU8sUUFBUSxDQUFDLE9BQU8sS0FBSyxRQUFRO2dCQUNsQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQ3RCLEtBQUssRUFDSCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEtBQUssUUFBUTtnQkFDbEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDaEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsNkJBQTZCO1FBQzdCLDRDQUE0QztRQUM1QyxvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLE1BQU07SUFDUixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxJQUFJO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDRixDQUFDIn0=
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
 * @name                            SLayout
 * @namespace           sugar.node.terminal
 * @type                            Class
 *
 * Create a layout in which you can render all others items.
 * This class uses blessed under the hood to work properly.
 *
 * @param             {Object}              [settings={}]     On object of settings to configure the SLayout like paddings, etc...
 *
 * @example           js
 * const SLayout = require('@coffeekraken/node/terminal/SLayout');
 * const myLayout = new SLayout({
 *    // see settings above...
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SLayout extends __blessed.box {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the SLayout instance which inherit from the blessed.box stack
     *
     * @param             {String|Array}                content                     The content of the layout in string or array format
     * @param             {Object}                      [settings={}]               An object of blessed screen settings and some others described bellow...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(content, settings = {}) {
        settings = __deepMerge({}, settings);
        super(settings);
        // set the content if we have one
        if (content)
            this.setContent(content);
    }
    /**
     * @name                    setContent
     * @type                    Function
     *
     * Set the layout content by passing either a string or an array that will be joined using a "\n" character
     *
     * @param               {String|Array}                content             The content to set
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setContent(content) {
        if (Array.isArray(content)) {
            return super.setContent(content.join('\n'));
        }
        return super.setContent(content);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xheW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3Rlcm1pbmFsL19fd2lwX18vU0xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXJDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVuQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sT0FBUSxTQUFRLFNBQVMsQ0FBQyxHQUFHO0lBQ2xEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNoQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEIsaUNBQWlDO1FBQ2pDLElBQUksT0FBTztZQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFVBQVUsQ0FBQyxPQUFPO1FBQ2hCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQixPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRixDQUFDIn0=
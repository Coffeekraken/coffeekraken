import __SInterface from '../SInterface.js';
import __SInterfaceRenderer from './SInterfaceRenderer.js';

import type { ISInterfaceRendererSettings } from '../../shared/renderers/ISInterfaceRenderer.js';

import { __dirname } from '@coffeekraken/sugar/fs';

/**
 * @name            SInterfaceTerminalRenderer
 * @namespace       sugar.node.interface.renderers
 * @type            Class
 * @extends         SClass
 * @platform        node
 * @status          beta
 *
 * This class represent the terminal interface renderer
 *
 * @param        {ISInterface}              interface           The interface you want to render
 * @param       {ISInterfaceTerminalRendererSettings}       [settings={}]       Some settings to configure your renderer like properties to exclude, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SInterfaceTerminalRenderer extends __SInterfaceRenderer {
    static id = 'terminal';

    /**
     * @name        constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        int: __SInterface,
        settings?: Partial<ISInterfaceRendererSettings>,
    ) {
        super(int, {
            templatesDir: `${__dirname()}/terminal`,
            ...settings,
        });
    }

    renderType(type) {}
}

export default SInterfaceTerminalRenderer;

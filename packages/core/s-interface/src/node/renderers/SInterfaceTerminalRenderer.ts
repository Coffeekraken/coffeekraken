import __SInterfaceRenderer from './SInterfaceRenderer';
import __SInterface from '../SInterface';

import { ISInterfaceRendererSettings } from '../../shared/renderers/ISInterfaceRenderer';

/**
 * @name            SInterfaceTerminalRenderer
 * @namespace       sugar.node.interface.renderers
 * @type            Class
 * @extends         SClass
 *
 * This class represent the terminal interface renderer
 *
 * @param        {ISInterface}              interface           The interface you want to render
 * @param       {ISInterfaceTerminalRendererSettings}       [settings={}]       Some settings to configure your renderer like properties to exclude, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    int: __SInterface,
    settings?: Partial<ISInterfaceRendererSettings>
  ) {
    super(int, {
      templatesDir: `${__dirname}/terminal`,
      ...settings
    });
  }

  renderType(type) {}
}

export default SInterfaceTerminalRenderer;

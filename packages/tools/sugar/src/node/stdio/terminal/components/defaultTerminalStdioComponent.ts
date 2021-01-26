import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';

/**
 * @name        defaultTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'default',
  render(logObj, settings = {}) {
    const value = logObj.value || logObj;
    return __parseHtml(__toString(value));
  }
};

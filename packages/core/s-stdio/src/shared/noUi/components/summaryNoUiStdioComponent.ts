import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';

/**
 * @name        summaryNoUiStdioComponent
 * @namespace   shared.noUi.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'summary',
    render(logObj, settings = {}) {
        const value = logObj.value !== undefined ? logObj.value : logObj;

        const lines = [logObj.value.value];

        return __parseHtml(__toString(lines.join('\n')));
    },
};

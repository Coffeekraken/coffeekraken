import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import { __toString } from '@coffeekraken/sugar/string';

/**
 * @name        errorBasicStdioComponent
 * @namespace   shared.basic.components
 * @type        ISStdioComponent
 *
 * Basic stdio error component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'error',
    render(logObj, settings = {}) {
        const value = logObj.value !== undefined ? logObj.value : logObj;
        return `⚠️  ${__parseHtml(__toString(value))}`;
    },
};

import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';

/**
 * @name        defaultWebsocketComponent
 * @namespace   shared.websocket.components
 * @type        ISStdioComponent
 *
 * Websocket default stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'default',
    render(logObj, settings = {}) {
        return logObj;
    }
};

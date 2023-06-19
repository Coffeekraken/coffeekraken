// @ts-nocheck

import __replaceTags from '../../shared/html/replaceTags';

import __tagsMap from './tagsMap';

/**
 * @name                                parseHtml
 * @namespace            js.console
 * @type                                Function
 * @platform          js
 * @status          beta
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo        interface
 * @todo        doc
 *
 * @snippet         __parseHtml($1)
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __parseHtml(message) {
    let isArray = false;
    if (Array.isArray(message)) {
        isArray = true;
    } else {
        message = [message];
    }

    message = message.map((m) => {
        return __replaceTags(m, __tagsMap);
    });

    if (isArray) return message;
    return message[0];
}

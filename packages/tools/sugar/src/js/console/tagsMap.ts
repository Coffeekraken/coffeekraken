// @ts-nocheck

/**
 * @name        tagsMap
 * @namespace            js.console
 * @type        Object
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Store the tag->function map used in ```parseHtml``` function for example
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const tagsMap = {
    black: (tag, content) => content,
    red: (tag, content) => `\x1b[1;31m${content}\x1b[0m`,
    green: (tag, content) => `\x1b[1;32m${content}\x1b[0m`,
    yellow: (tag, content) => `\x1b[1;33m${content}\x1b[0m`,
    blue: (tag, content) => `\x1b[1;34m${content}\x1b[0m`,
    magenta: (tag, content) => `\x1b[1;35m${content}\x1b[0m`,
    cyan: (tag, content) => `\x1b[1;36m${content}\x1b[0m`,
    white: (tag, content) => `\x1b[1;37m${content}\x1b[0m`,
    grey: (tag, content) => `\x1b[1;30m${content}\x1b[0m`,

    bgBlack: (tag, content) => content,
    bgRed: (tag, content) => `\x1b[0;31m${content}\x1b[0m`,
    bgGreen: (tag, content) => `\x1b[0;32m${content}\x1b[0m`,
    bgYellow: (tag, content) => `\x1b[0;33m${content}\x1b[0m`,
    bgBlue: (tag, content) => `\x1b[0;34m${content}\x1b[0m`,
    bgMagenta: (tag, content) => `\x1b[0;35m${content}\x1b[0m`,
    bgCyan: (tag, content) => `\x1b[0;36m${content}\x1b[0m`,
    bgWhite: (tag, content) => `\x1b[0;37m${content}\x1b[0m`,
    bgGrey: (tag, content) => `\x1b[0;30m${content}\x1b[0m`,

    bold: (tag, content) => content,
    dim: (tag, content) => content,
    italic: (tag, content) => content,
    underline: (tag, content) => content,
    strike: (tag, content) => content,

    date: (tag, content) =>
        new Date().getDate().toString().padStart('0', 2) +
        '-' +
        (new Date().getMonth() + 1).toString().padStart('0', 2) +
        '-' +
        new Date().getFullYear().toString().padStart('0', 2),
    time: (tag, content) =>
        new Date().getHours().toString().padStart('0', 2) +
        ':' +
        new Date().getMinutes().toString().padStart('0', 2) +
        ':' +
        new Date().getMinutes().toString().padStart('0', 2),
    day: (tag, content) => new Date().getDate().toString().padStart('0', 2),
    days: (tag, content) => new Date().getDate().toString().padStart('0', 2),
    month: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
    months: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
    year: (tag, content) =>
        new Date().getFullYear().toString().padStart('0', 2),
    years: (tag, content) =>
        new Date().getFullYear().toString().padStart('0', 2),
    hour: (tag, content) => new Date().getHours().toString().padStart('0', 2),
    hours: (tag, content) => new Date().getHours().toString().padStart('0', 2),
    minute: (tag, content) =>
        new Date().getMinutes().toString().padStart('0', 2),
    minutes: (tag, content) =>
        new Date().getMinutes().toString().padStart('0', 2),
    second: (tag, content) =>
        new Date().getSeconds().toString().padStart('0', 2),
    seconds: (tag, content) =>
        new Date().getSeconds().toString().padStart('0', 2),

    br: (tag, content) => '\n',
};
export default tagsMap;

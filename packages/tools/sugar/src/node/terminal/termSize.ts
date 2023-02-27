import __termSize from 'term-size';

/**
 * @name                                  termSize
 * @namespace            node.terminal
 * @type                                  Function
 * @platform          node
 * @status        stable
 *
 * Reliably get the termina size even in child process, etc...
 *
 * @return          {ITermSizeResult}                                The object with the "width" and the "height" of the terminal
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __termSize()
 * 
 * @example         js
 * import { __termSize } from '@coffeekraken/sugar/terminal';
 * __termSize().width; // => 200
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ITermSizeResult {
    columns: number;
    rows: number;
    width: number;
    height: number;
}

export default function termSize(): ITermSizeResult {
    const sizes = __termSize();
    return {
        ...sizes,
        width: sizes.columns,
        height: sizes.rows,
    };
}

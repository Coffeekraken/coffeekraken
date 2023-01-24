// @ts-nocheck
/**
 * @name                    ISLog
 * @namespace           shared
 * @type                      Class
 * @platform            js
 * @platform            node
 * @platform             ts
 * @status              beta
 *
 * This interface define the shape a an log object that can be used
 * across some other services/classes like SStdio, and others dependings
 * on the needs...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import { ISLog } from '@coffeekraken/s-log';
 * function myCoolFunction(log: ISLog): void {
 *    // do something...
 * }
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export type ISLogType = 'log' | 'info' | 'warn' | 'error' | 'success';

export interface ISLogMargin {
    top: number;
    bottom: number;
}

export default interface ISLog {
    hash?: string;
    decorators?: boolean;
    time?: boolean;
    clear?: boolean;
    temp?: boolean;
    timestamp?: number;
    group?: string;
    margin: Partial<ISLogMargin>;
    type?: ISLogType;
    as?: string;
    value: any;
    active?: boolean;
    metas?: any;
    logger?: Function;
    notify?: boolean;
    verbose?: boolean;
}

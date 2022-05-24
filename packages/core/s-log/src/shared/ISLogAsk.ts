// @ts-nocheck
/**
 * @name                    ISLogAsk
 * @namespace           shared
 * @type.                      Class
 * @platform            js
 * @platform            node
 * @platform             ts
 * @status              beta
 *
 * This interface define the shape a an log ask object that can be used
 * across some other services/classes like SStdio, and others dependings
 * on the needs...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import { ISLogAsk } from '@coffeekraken/s-log';
 * function myCoolFunction(ask: ISLogAsk): void {
 *    // do something...
 * }
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISLogAskSelectPromptParams {
    name: string;
    message: string;
    choices: string[];
    validate?: Function;
}
export interface ISLogAskAutoCompletePromptParams {
    name: string;
    message: string;
    choices: string[];
    limit: number;
    initial: number;
    validate?: Function;
}
export interface ISLogAskConfirmPromptParams {
    name: string;
    message: string;
    validate?: Function;
}

export interface ISLogAskFormItemPromptParams {
    name: string;
    message: string;
    initial: string;
}
export interface ISLogAskFormPromptParams {
    name: string;
    message: string;
    choices: ISLogAskFormItemPromptParams[];
    validate?: Function;
}

export interface ISLogAskInputPromptParams {
    name: string;
    message: string;
    validate?: Function;
}

export interface ISLogAskSecretPromptParams {
    name: string;
    message: string;
    validate?: Function;
}

export interface ISLogAskListPromptParams {
    name: string;
    message: string;
    validate?: Function;
}

export interface ISLogAskMultiSelectItemPromptParams {
    name: string;
    value: string;
}
export interface ISLogAskMultiSelectPromptParams {
    name: string;
    message: string;
    limit: number;
    choices: ISLogAskMultiSelectItemPromptParams[];
    validate?: Function;
}

export interface ISLogAskNumberPromptParams {
    name: string;
    message: string;
    validate?: Function;
}

export interface ISLogAskPasswordPromptParams {
    name: string;
    message: string;
    validate?: Function;
}

export interface ISLogAskTogglePromptParams {
    name: string;
    enabled: string;
    disabled: string;
    validate?: Function;
}

export interface ISLogAskBase {
    type:
        | 'select'
        | 'autocomplete'
        | 'confirm'
        | 'form'
        | 'input'
        | 'secret'
        | 'list'
        | 'multiselect'
        | 'number'
        | 'password'
        | 'toggle';
    metas: any;
}
type ISLogAskExtender<Type> = Type extends any ? ISLogAskBase : ISLogAskBase;
type ISLogAsk = ISLogAskExtender<
    | ISLogAskSelectPromptParams
    | ISLogAskAutoCompletePromptParams
    | ISLogAskConfirmPromptParams
    | ISLogAskFormPromptParams
    | ISLogAskInputPromptParams
    | ISLogAskSecretPromptParams
    | ISLogAskListPromptParams
    | ISLogAskMultiSelectPromptParams
    | ISLogAskNumberPromptParams
    | ISLogAskPasswordPromptParams
    | ISLogAskTogglePromptParams
>;
export default ISLogAsk;

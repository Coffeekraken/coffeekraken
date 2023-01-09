import __SFeature from '@coffeekraken/s-feature';
import __define from './define';

export interface ISFormValidateFeatureProps {
    errorContainerAttr: string;
    nodes: string;
    handlers: Record<string, Function>;
    format: string | true;
    [key: string]: any;
}
export default class SFormValidateFeature extends __SFeature {
    private _$field;
    private _$form;
    private _$nodes;
    private _nodeByValidator;
    private _validator;
    private _isDirty;
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): void;
    _passwordDefaultHandler({ result, $feature }: {
        result: any;
        $feature: any;
    }): void;
    _initField($field: any): void;
    format(value: string, format: string): void;
    _isValidating: boolean;
    validate(event?: any): void;
    _getFieldValue(): any;
    _getCheckboxValues(): any;
    _getRadioValue(): any;
    _getRangeValue(): number;
    _getSelectValues(): any;
    _$error: any;
    _applyResult(res: any, event: any): Promise<void>;
}
export { __define as define };

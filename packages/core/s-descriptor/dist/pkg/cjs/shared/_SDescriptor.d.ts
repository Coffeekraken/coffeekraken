import __SClass from '@coffeekraken/s-class';
import { ISDescriptorResult, ISDescriptorResultObj } from './SDescriptorResult';

export interface ISDescriptorSettings {
    type: string;
    arrayAsValue: boolean;
    throwOnMissingRule: boolean;
    complete: boolean;
    rules: ISDescriptorRules;
    defaults: boolean;
}
export interface ISDescriptorDescription {
    [key: string]: ISDescriptorDescription;
}
export interface ISDescriptorRuleApplyFn {
    (value: any, params: any, ruleSettings: any, settings: ISDescriptorSettings): ISDescriptorResultObj;
}
export interface ISDescriptorRule {
    [key: string]: any;
}
export interface ISDescriptorRegisteredRule {
    id: string;
    name: string;
    settings: any;
    processParams?: typeof Function;
    apply: ISDescriptorRuleApplyFn;
}
export interface ISDescriptorRules {
    [key: string]: ISDescriptorRule;
}
export interface ISDescriptorRegisteredRules {
}
export interface ISDescriptionValidationResult {
}
export interface ISDescriptorCtor {
    rules: ISDescriptorRules;
    type: string;
    new (settings?: ISDescriptorSettings): ISDescriptor;
    registerRule(rule: ISDescriptorRule): void;
}
export interface ISDescriptor {
    apply(instance: any, settings?: Partial<ISDescriptorSettings>): any;
}
declare class SDescriptor extends __SClass implements ISDescriptor {
    
    _descriptorResult?: ISDescriptorResult;
    
    static _registeredRules: ISDescriptorRegisteredRules;
    
    static rules: ISDescriptorRules;
    
    static type: string;
    
    static registerRule(rule: ISDescriptorRule): void;
    
    constructor(settings?: Partial<ISDescriptorSettings>);
    
    apply(value: any, settings?: Partial<ISDescriptorSettings>): ISDescriptorResult;
    
    _validate(value: any, propName: string, rulesObj: any, settings: ISDescriptorSettings): ISDescriptorResult | true;
    _processRule(value: any, ruleObj: any, propName: any, params: any, ruleSettings: any, settings: any): any;
}
export default SDescriptor;

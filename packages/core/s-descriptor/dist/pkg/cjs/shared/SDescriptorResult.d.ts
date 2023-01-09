import __SClass from '@coffeekraken/s-class';
import type { ISDescriptorRule, ISDescriptorSettings } from './SDescriptor';
import ISDescriptor from './SDescriptor';

export interface ISDescriptorResultObj {
}
export interface ISDescriptorResultRule {
    __error: Error;
    __ruleObj: ISDescriptorRule;
    [key: string]: any;
}
export interface ISDescriptorResultCtor {
    new (descriptor: ISDescriptor, value: any, descriptorSettings: ISDescriptorSettings): ISDescriptorResult;
}
export interface ISDescriptorResult {
    _issues: any;
    _descriptor: ISDescriptor;
    _descriptorSettings: ISDescriptorSettings;
    _originalValue: any;
    value: any;
    hasIssues(): boolean;
    add(ruleResult: ISDescriptorResultRule): void;
    toConsole(): string;
}
declare class SDescriptorResult extends __SClass implements ISDescriptorResult {
    
    _issues: any;
    
    _descriptor: ISDescriptor;
    
    _descriptorSettings: ISDescriptorSettings;
    
    value: any;
    
    _originalValue: any;
    
    constructor(descriptor: ISDescriptor, value: any, descriptorSettings: ISDescriptorSettings);
    
    hasIssues(): boolean;
    
    add(ruleResult: ISDescriptorResultRule): void;
    
    toString(): string;
    
    toConsole(): string;
}
export default SDescriptorResult;

import ISDescriptor, {
  ISDescriptorRule,
  ISDescriptorSettings
} from './ISDescriptor';

export interface ISDescriptorResultRule {
  __ruleObj: ISDescriptorRule;
  [key: string]: any;
}

export interface ISDescriptorResultCtor {
  new (
    descriptor: ISDescriptor,
    value: any,
    descriptorSettings: ISDescriptorSettings
  ): ISDescriptorResult;
}

export default interface ISDescriptorResult {
  _issues: any;
  _descriptor: ISDescriptor;
  _descriptorSettings: ISDescriptorSettings;
  _originalValue: any;
  value: any;
  hasIssues(): boolean;
  add(ruleResult: ISDescriptorResultRule): void;
  toConsole(): string;
}

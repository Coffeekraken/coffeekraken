export interface ISDescriptorCtorSettings {
  descriptor?: Partial<ISDescriptorSettings>;
}

export interface ISDescriptorSettings {
  type: string;
  arrayAsValue: boolean;
  throwOnMissingRule: boolean;
  throw: boolean;
  complete: boolean;
  rules: ISDescriptorRules;
  verbose: boolean;
}

export interface ISDescriptorDescription {
  [key: string]: ISDescriptorDescription;
}

export interface ISDescriptorRuleApplyFn {
  (
    value: any,
    params: any,
    ruleSettings: any,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj;
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

export interface ISDescriptorRegisteredRules {}

export interface ISDescriptionValidationResult {}
export interface ISDescriptorCtor {
  rules: ISDescriptorRules;
  type: string;
  new (settings?: ISDescriptorSettings): ISDescriptor;
  registerRule(rule: ISDescriptorRule): void;
}

export interface ISDescriptor {
  descriptorSettings: ISDescriptorSettings;
  apply(instance: any, settings?: Partial<ISDescriptorSettings>);
}

export interface ISDescriptorResultObj {}

export interface ISDescriptorResultRule {
  __error: Error;
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

// @ts-nocheck
// @shared

export interface ISDescriptorSettings {
  type?: string;
  arrayAsValue?: boolean;
  throwOnMissingRule?: boolean;
  throw?: boolean;
  throwOnMissingRequiredProp?: boolean;
  complete?: boolean;
  name?: string;
  id?: string;
  rules?: ISDescriptorRules;
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
  id: string;
  name: string;
  settings: object;
  processParams?: Function;
  apply: ISDescriptorRuleApplyFn;
}

export interface ISDescriptorRules {
  [key: string]: ISDescriptorRule;
}

export interface ISDescroptorGenerateSettings {
  name?: string;
  id?: string;
  rules: ISDescriptorRules;
  type?: string;
  settings?: ISDescriptorSettings;
}

export interface ISDescriptionValidationResult {}
export interface ISDescriptorCtor {
  rules: ISDescriptorRules;
  type: string;
  new (settings?: ISDescriptorSettings): ISDescriptor;
  registerRule(rule: ISDescriptorRule): void;
}

export default interface ISDescriptor {
  _settings: ISDescriptorSettings;
  name: string;
  id: string;
  apply(instance: any, settings?: ISDescriptorSettings);
}

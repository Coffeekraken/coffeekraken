// @ts-nocheck

export interface ISDescriptorSettings {
  arrayAsValue?: boolean;
  throwOnMissingRule?: boolean;
  throwOnError?: boolean;
  complete?: boolean;
  name?: string;
  id?: string;
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

export interface ISDescriptorRules {
  [key: string]: ISDescriptorRule;
}

export interface ISDescriptorRule {
  id: string;
  name: string;
  settings: object;
  processParams?: Function;
  apply: ISDescriptorRuleApplyFn;
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
  rules: ISDescriptorRulesMap;
  type: string;
  new (settings?: ISDescriptorSettings): ISDescriptor;
  registerRule(rule: ISDescriptorRule): void;
  apply(value: any, settings?: ISDescriptorSettings): ISDescriptorResultObj;
  generate(settings: ISDescroptorGenerateSettings): ISDescriptorCtor;
}

export default interface ISDescriptor {
  _settings: ISDescriptorSettings;
  name: string;
  id: string;
}

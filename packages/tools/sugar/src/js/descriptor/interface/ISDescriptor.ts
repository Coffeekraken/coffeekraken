export interface ISDescriptorSettings {
  arrayAsValue: boolean;
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

export interface ISDescriptorRulesMap {
  [key: string]: ISDescriptorRule;
}

export interface ISDescriptorRule {
  id: string;
  name: string;
  settings: object;
  processParams?: Function;
  apply: ISDescriptorRuleApplyFn;
}

export interface ISDescriptorResultObj {}

export interface ISDescriptorCtor {
  rulesMap: ISDescriptorRulesMap;
  new (settings?: ISDescriptorSettings): ISDescriptor;
  registerRule(rule: ISDescriptorRule): void;
  apply(value: any, settings?: ISDescriptorSettings): ISDescriptorResultObj;
}

export default interface ISDescriptor {
  _settings: ISDescriptorSettings;
}

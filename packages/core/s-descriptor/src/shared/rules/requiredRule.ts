// @ts-nocheck

import { ISDescriptorResultObj } from '../SDescriptorResult';
import { ISDescriptorRule, ISDescriptorSettings } from '../_SDescriptor';

/**
 * @name          requiredRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 *
 * This rule allows you to make sure that your value is not ```undefined```
 * or a nullish value like ```null``` or ```''```.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IRuleParams {
  value: boolean;
}
export interface IRuleSettings {
  when: any[];
}

const ruleObj: ISDescriptorRule = {
  priority: 1,
  name: 'Required',
  id: 'required',
  settings: {
    when: [undefined, null]
  },
  message: 'This value is required',
  processParams: (params: boolean) => {
    return { value: params };
  },
  apply: (
    value: any,
    params: IRuleParams,
    ruleSettings: IRuleSettings,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj | true => {
    if (params.value === true) {
      if (ruleSettings.when.indexOf(value) !== -1) {
        return new Error('This property is <yellow>required</yellow>');
      }
    }
    return value;
  }
};

export default ruleObj;

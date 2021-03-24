// @ts-nocheck

import { ISDescriptorResultObj } from '../SDescriptorResult';
import { ISDescriptorRule, ISDescriptorSettings } from '../_SDescriptor';

/**
 * @name          minRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 *
 * This rule allows you to make sure a value is not under a certain value
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IRuleParams {
  value: boolean;
}
export interface IRuleSettings {}

const ruleObj: ISDescriptorRule = {
  name: 'Min',
  id: 'min',
  settings: {},
  accept: 'Number',
  message: (resultObj: any): string => {
    return `This value has to be minimum "<yellow>${resultObj.min}</yellow>". Received "<red>${resultObj.received}</red>"`;
  },
  processParams: (params: number) => {
    return { value: params };
  },
  apply: (
    value: any,
    params: IRuleParams,
    ruleSettings: IRuleSettings,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj | true => {
    if (value < params.value) {
      return {
        min: params.value,
        received: value
      };
    }
    return true;
  }
};

export default ruleObj;

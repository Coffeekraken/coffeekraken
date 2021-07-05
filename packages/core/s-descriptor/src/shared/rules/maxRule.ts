// @ts-nocheck

import { ISDescriptorResultObj } from '../SDescriptorResult';
import { ISDescriptorRule, ISDescriptorSettings } from '../_SDescriptor';

/**
 * @name          maxRule
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
  name: 'Max',
  id: 'max',
  settings: {},
  accept: 'Number',
  message: (resultObj: any): string => {
    return `This value has to be maximum "<yellow>${resultObj.max}</yellow>". Received "<red>${resultObj.received}</red>"`;
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
    if (value > params.value) {
      return new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be lower or equal at <cyan>${params.value}</cyan>`)
    }
    return value;
  }
};

export default ruleObj;

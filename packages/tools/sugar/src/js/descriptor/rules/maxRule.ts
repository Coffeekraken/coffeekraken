// @ts-nocheck
// @shared

import __ofType from '../../is/ofType';
import {
  ISDescriptorRule,
  ISDescriptorResultObj,
  ISDescriptorSettings
} from '../interface/ISDescriptor';
import SDescriptor from '../_SDescriptor';

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
export interface IParams {
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
    params: IParams,
    ruleSettings: IRuleSettings,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj | true => {
    if (value > params.value) {
      return {
        max: params.value,
        received: value
      };
    }
    return true;
  }
};

// register the new rule
SDescriptor.registerRule(ruleObj);

export default ruleObj;

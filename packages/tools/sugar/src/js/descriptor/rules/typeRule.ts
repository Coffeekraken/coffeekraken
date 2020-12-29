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
 * @name          typeRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 *
 * This rule allows you to make sure a value does match the passed type like:
 * - String | Array<String>
 * - Boolean
 * - Number
 * - etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IParams {
  value: boolean;
}
export interface IRuleSettings {}

const ruleObj: ISDescriptorRule = {
  name: 'Type',
  id: 'type',
  settings: {},
  message: (resultObj: any): string => {
    return `This value has to be of type "<yellow>${resultObj.$expected.type}</yellow>". Received "<red>${resultObj.$received.type}</red>"`;
  },
  processParams: (params: boolean) => {
    return { value: params };
  },
  apply: (
    value: any,
    params: IParams,
    ruleSettings: IRuleSettings,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj | true => {
    const res = __ofType(value, params.value, {
      name: settings.name
    });
    if (res !== true) return res;
    return true;
  }
};

// register the new rule
SDescriptor.registerRule(ruleObj);

export default ruleObj;

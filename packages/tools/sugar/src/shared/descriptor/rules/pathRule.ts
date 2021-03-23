// @ts-nocheck

import __isPath from '../../is/path';
import { ISDescriptorResultObj } from '../SDescriptorResult';
import SDescriptor, {
  ISDescriptorRule,
  ISDescriptorSettings
} from '../_SDescriptor';

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
  name: 'Path',
  id: 'path',
  settings: {},
  accept: 'Object|String|Array<String>',
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
    console.log('PATH', value, params, ruleSettings, settings);
    if (!__isPath(value)) return false;
    return true;
  }
};

// register the new rule
SDescriptor.registerRule(ruleObj);

export default ruleObj;

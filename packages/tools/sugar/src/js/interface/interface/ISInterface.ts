// @shared

import {
  ISDescriptorRules,
  ISDescriptorSettings
} from '../../descriptor/interface/ISDescriptor';
import ISDescriptorResult from '../../descriptor/interface/ISDescriptorResult';

export interface ISInterfaceSettings {
  name?: string;
  id?: string;
  arrayAsValue?: boolean;
  throwOnError?: boolean;
  complete?: boolean;
  descriptorSettings?: ISDescriptorSettings;
}

export interface ISInterfaceResultData {
  descriptorResult: ISDescriptorResult;
  instance: any;
}

export interface ISInterfaceCtor {
  new (settings?: ISInterfaceSettings): ISInterface;
  definition: ISDescriptorRules;
  settings: ISInterfaceSettings;
}
export default interface ISInterface {
  _definition: ISDescriptorRules;
  _settings: ISInterfaceSettings;
}

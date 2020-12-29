// @shared

import ISDescriptorResult from '../../descriptor/interface/ISDescriptorResult';

export interface ISInterfaceResultData {
  descriptorResult?: ISDescriptorResult;
}

export interface ISInterfaceResultCtor {
  new (data: ISInterfaceResultData): ISInterfaceResult;
}
export default interface ISInterfaceResult {
  value: any;
  hasIssues(): boolean;
  toString(): string;
  toConsole(): string;
}

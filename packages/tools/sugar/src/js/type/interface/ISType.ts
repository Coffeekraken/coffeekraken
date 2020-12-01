// @shared

import { IParseTypeStringResultObj } from './IParseTypeString';
export interface ISTypeDescriptorIsFn {
  (value: any, settings?: ISTypeSettings): boolean | ISTypeVerboseObj;
}
export interface ISTypeDescriptorCastFn {
  (value: any): any;
}

export interface ISTypeVerboseExpectedObj {
  type: string;
}
export interface ISTypeVerboseReceivedObj {
  type: string;
}
export interface ISTypeVerboseObj {
  typeString: string;
  idx?: string | number;
  value: any;
  expected: ISTypeVerboseExpectedObj;
  received: ISTypeVerboseReceivedObj;
}

export interface ISTypeDescriptor {
  name: string;
  id: string;
  is: ISTypeDescriptorIsFn;
  cast: ISTypeDescriptorCastFn;
}

export interface ISTypeSettings {
  name?: string | undefined;
  id?: string | undefined;
  throw?: boolean;
  verbose?: boolean;
}

export interface ISTypeRegisteredTypes {
  [key: string]: ISTypeDescriptor;
}

export interface ISTypeInstanciatedTypes {
  [key: string]: ISType;
}

export interface ISTypeRegisterStaticFn {
  (typeDescriptor: ISTypeDescriptor): void;
}

export interface ISTypeIsFn {
  (value: any): boolean;
}

export interface ISTypeCtor {
  new (typeString: string, settings: ISTypeSettings);
  _registeredTypes: ISTypeRegisteredTypes;
  _instanciatedTypes: ISTypeInstanciatedTypes;
  registerType: ISTypeRegisterStaticFn;
}
export default interface ISType {
  _settings: ISTypeSettings;
  typeString: string;
  types: IParseTypeStringResultObj[];
  name: string;
  id: string;
  is: ISTypeIsFn;
}

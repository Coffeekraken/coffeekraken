// @shared

export interface ISTypeDescriptorIsFn {
  (value: any): boolean;
}
export interface ISTypeDescriptorCastFn {
  (value: any): any;
}

export interface ISTypeDescriptor {
  name: string;
  id: string;
  is: ISTypeDescriptorIsFn;
  cast: ISTypeDescriptorCastFn;
}

export interface ISTypeSettings {}

export interface ISTypeRegisteredTypes {
  [key: string]: ISTypeDescriptor;
}

export interface ISTypeRegisterStaticFn {
  (typeDescriptor: ISTypeDescriptor): void;
}

export interface ISTypeCtor {
  (typeString: string, settings?: ISTypeSettings);
  registerType: ISTypeRegisterStaticFn;
}
export default interface ISType {
  _settings: ISTypeSettings;
  array: boolean;
  type?: string;
  name: string;
  id: string;
}

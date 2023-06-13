import type { IParseTypeStringResultObj } from '@coffeekraken/sugar/type';
import __STypeResult from './STypeResult';

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
    source?: any;
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
    new (typeString: string, settings: ISTypeSettings): any;
    _registeredTypes: ISTypeRegisteredTypes;
    _instanciatedTypes: ISTypeInstanciatedTypes;
    registerType: ISTypeRegisterStaticFn;
}
export interface ISType {
    settings: ISTypeSettings;
    typeString: string;
    types: IParseTypeStringResultObj[];
    name: string;
    id: string;
    is: ISTypeIsFn;
}
declare class SType implements ISType {
    
    settings: ISTypeSettings;
    
    typeString: string;
    
    types: IParseTypeStringResultObj[];
    
    static _instanciatedTypes: ISTypeInstanciatedTypes;
    
    static _registeredTypes: ISTypeRegisteredTypes;
    
    static registerType(type: ISTypeDescriptor): void;
    
    static parseTypeString(typeString: string): IParseTypeStringResultObj[];
    
    constructor(typeString: string, settings?: ISTypeSettings);
    
    is(value: any, settings?: ISTypeSettings): boolean;
    
    check(value: any, settings?: ISTypeSettings): boolean | __STypeResult;
    
    _isType(value: any, type: string, settings?: ISTypeSettings): boolean;
    
    cast(value: any, params: any, settings: ISTypeSettings): any;
    
    canHaveChilds(value: any): boolean;
    
    get name(): string;
    
    get id(): string;
}
export default SType;

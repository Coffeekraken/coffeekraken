import __SClass from '@coffeekraken/s-class';
import { ISDescriptorRules, ISDescriptorSettings } from '@coffeekraken/s-descriptor';
import type { ISInterfaceRendererSettings } from './renderers/ISInterfaceRenderer';
export interface ISInterfaceSettings {
    descriptor?: Partial<ISDescriptorSettings>;
    baseObj?: any;
    stripUnkown?: boolean;
}
export interface ISInterfaceDefinitionProperty {
    type: string;
    description: string;
    default: any;
    alias: string;
    [key: string]: any;
}
export interface ISInterfaceDefinitionMap extends ISDescriptorRules {
    [key: string]: Partial<ISInterfaceDefinitionProperty>;
}
export interface ISInterfaceObj {
    name?: string;
    description?: string;
    definition: Record<string, ISInterfaceDefinitionProperty>;
}
export interface ISInterfaceCtor {
    new (settings?: Partial<ISInterfaceSettings>): ISInterface;
    definition: ISInterfaceDefinitionMap;
    defaults(): any;
    isDefault(prop: string, value: any): boolean;
}
export interface ISInterface {
    _definition: ISInterfaceDefinitionMap;
}

export default class SInterface extends __SClass implements ISInterfaceCtor {
    
    static _definition: ISDescriptorRules;
    static _cachedDefinition: ISDescriptorRules;
    static get definition(): ISDescriptorRules;
    static set definition(value: ISDescriptorRules);
    
    static description: string;
    
    static _registeredRenderers: Record<string, any>;
    static registerRenderer(rendererClass: any): void;
    
    static mix(...ints: SInterface[]): SInterface;
    
    static override(definition: any): {
        new (settings?: Partial<ISInterfaceSettings>): {
            
            _definition: ISInterfaceDefinitionMap;
            
            apply(objectOrString: any, settings?: Partial<ISInterfaceSettings>): any;
        };
        overridedName: string;
        definition: any;
        
        _definition: ISDescriptorRules;
        _cachedDefinition: ISDescriptorRules;
        
        description: string;
        
        _registeredRenderers: Record<string, any>;
        registerRenderer(rendererClass: any): void;
        
        mix(...ints: SInterface[]): SInterface;
        override(definition: any): any;
        
        isDefault(prop: string, value: any): boolean;
        
        getAvailableTypes(): any;
        
        makeAvailableAsType(name?: any): void;
        
        toObject(): ISInterfaceObj;
        
        defaults(): {};
        
        apply(objectOrString: any, settings?: Partial<ISInterfaceSettings>): any;
        
        render(renderer?: string, settings?: Partial<ISInterfaceRendererSettings>): string;
    };
    
    static isDefault(prop: string, value: any): boolean;
    
    static getAvailableTypes(): any;
    
    static makeAvailableAsType(name?: any): void;
    
    _definition: ISInterfaceDefinitionMap;
    
    static toObject(): ISInterfaceObj;
    
    static defaults(): {};
    
    static apply(objectOrString: any, settings?: Partial<ISInterfaceSettings>): any;
    
    static render(renderer?: string, settings?: Partial<ISInterfaceRendererSettings>): string;
    
    constructor(settings?: Partial<ISInterfaceSettings>);
    
    apply(objectOrString: any, settings?: Partial<ISInterfaceSettings>): any;
}

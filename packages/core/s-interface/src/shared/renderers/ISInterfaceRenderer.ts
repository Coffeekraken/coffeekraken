import type { ISInterfaceDefinitionProperty } from '../SInterface.js';
import __SInterface from '../SInterface.js';

export interface ISInterfaceRendererRenderPropertyObj {
    value: any;
    property: ISInterfaceDefinitionProperty;
    interfaceClass: __SInterface;
}

export interface ISInterfaceRendererSettings {
    templatesDir?: string;
    exclude: string[];
    properties: string[];
}

export default interface ISInterfaceRenderer {
    render?(settings?: Partial<ISInterfaceRendererSettings>): Promise<string>;
}

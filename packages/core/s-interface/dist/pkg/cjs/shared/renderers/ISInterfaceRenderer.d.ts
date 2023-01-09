import type { ISInterfaceDefinitionProperty } from '../SInterface';
import __SInterface from '../SInterface';
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

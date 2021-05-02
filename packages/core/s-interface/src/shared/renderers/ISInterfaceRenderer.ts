import { ISInterfaceDefinitionProperty } from '../SInterfaceGenerator';

export interface ISInterfaceRendererRenderPropertyObj {
  value: any;
  property: ISInterfaceDefinitionProperty;
  interfaceClass: any;
}

export interface ISInterfaceRendererSettings {
  templatesDir?: string;
  exclude: string[];
  properties: string[];
}

export default interface ISInterfaceRenderer {
  render?(settings?: Partial<ISInterfaceRendererSettings>): string;
}

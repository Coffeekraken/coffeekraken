import __SInterface from '../SInterface';
import __SInterfaceRenderer from './SInterfaceRenderer';
import type { ISInterfaceRendererSettings } from '../../shared/renderers/ISInterfaceRenderer';

declare class SInterfaceTerminalRenderer extends __SInterfaceRenderer {
    static id: string;
    
    constructor(int: __SInterface, settings?: Partial<ISInterfaceRendererSettings>);
    renderType(type: any): void;
}
export default SInterfaceTerminalRenderer;

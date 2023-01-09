import __SClass from '@coffeekraken/s-class';
import ISInterfaceRenderer, { ISInterfaceRendererSettings } from '../../shared/renderers/ISInterfaceRenderer';
import __SInterface from '../SInterface';

declare class SInterfaceRenderer extends __SClass implements ISInterfaceRenderer {
    
    static id: string;
    
    private _interface;
    
    constructor(int: __SInterface, settings?: Partial<ISInterfaceRendererSettings>);
    
    render(settings?: Partial<ISInterfaceRendererSettings>): Promise<string>;
}
export default SInterfaceRenderer;

import __SClass from '@coffeekraken/s-class';
import '../../../../src/css/index.css';

export interface ISDashboardSettings {
    layout: any[];
    components: Record<string, any>;
}
export default class SDashboard extends __SClass {
    
    static get iframe(): HTMLIFrameElement;
    
    _$iframe: HTMLIFrameElement;
    _$focusItem: HTMLDivElement;
    
    get document(): Document;
    
    constructor(settings?: Partial<ISDashboardSettings>);
    
    _webVitalsInjected: boolean;
    _injectWebVitals(): void;
    
    changePage(): void;
    
    close(): void;
    
    open(): Promise<void>;
    define(props?: {}, tagName?: string, win?: Window & typeof globalThis): void;
}

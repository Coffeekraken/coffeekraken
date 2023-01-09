
export default class SSugarConfig {
    static _finalConfig: any;
    static get finalConfig(): any;
    
    static get(dotpath: string): any;
    
    static set(dotpath: string, value: any): any;
}

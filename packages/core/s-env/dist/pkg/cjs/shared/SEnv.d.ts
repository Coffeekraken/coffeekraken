
export default class SEnv {
    
    static is(env: string): boolean;
    
    static get(name: string): any;
    
    static set(name: string, value: any): any;
    
    static delete(name: string): void;
}

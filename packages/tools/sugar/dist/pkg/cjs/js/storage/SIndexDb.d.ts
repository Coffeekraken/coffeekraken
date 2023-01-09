
export interface IIndexDbSettings {
    db: string;
    table: string;
}
export default class IndexDb {
    
    static setItem(key: string, value: string, settings?: Partial<IIndexDbSettings>): Promise<any>;
    
    static getItem(key: string, settings?: Partial<IIndexDbSettings>): Promise<any>;
    
    static getAll(settings?: Partial<IIndexDbSettings>): Promise<any>;
    
    static removeItem(key: string, settings?: Partial<IIndexDbSettings>): Promise<any>;
    _settings: {};
    constructor(settings?: Partial<IIndexDbSettings>);
    
    setItem(key: string, value: string, settings?: Partial<IIndexDbSettings>): Promise<any>;
    
    getItem(key: string, settings?: Partial<IIndexDbSettings>): Promise<any>;
    
    getAll(settings?: Partial<IIndexDbSettings>): Promise<any>;
    
    removeItem(key: string, settings?: Partial<IIndexDbSettings>): Promise<any>;
}

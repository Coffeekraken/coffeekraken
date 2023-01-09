import __SClass from '@coffeekraken/s-class';

export interface ISBenchSettings {
    filters: Partial<ISBenchFilters>;
    bubbles: boolean;
}
export interface ISBenchResult {
    id: string;
    duration: number;
    steps: ISBenchStep[];
    stats: ISBenchResultStat[];
}
export interface ISBenchFilters {
    id: string;
    min: number;
    max: number;
}
export interface ISBenchStatsDisplaySettings {
    compact: boolean;
}
export interface ISBenchResultStat {
    id: string;
    startTime: number;
    endTime: number;
    duration: number;
    startPercent: number;
    endPercent: number;
    percent: number;
}
export interface ISBenchGlobalStepsBench {
    duration: number;
    steps: ISBenchStep[];
}
export interface ISBenchGlobalSteps {
    [id: string]: ISBenchGlobalStepsBench;
}
export interface ISBenchStep {
    id: string;
    type: 'start' | 'end' | 'step';
    description: string;
    time: number;
    logs: string[];
}
export default class SBench extends __SClass {
    
    private _steps;
    
    private static _benches;
    
    private static _ipc;
    
    private static _disabled;
    static disable(): void;
    
    static isDisabled(): boolean;
    
    static stats(filters?: Partial<ISBenchFilters>, displaySettings?: Partial<ISBenchStatsDisplaySettings>): SBench;
    
    static _emit(benchResult: ISBenchResult): void;
    
    constructor(id: string, settings?: Partial<ISBenchSettings>);
    
    start(settings?: Partial<ISBenchSettings>): SBench;
    
    step(id: string, description?: string): SBench;
    
    end(settings?: Partial<ISBenchSettings>): SBench;
    
    log(settings?: Partial<ISBenchSettings>): SBench;
    
    toString(settings?: Partial<ISBenchSettings>): string;
}

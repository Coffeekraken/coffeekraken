
export interface IBuildCommandLineSettings {
    keepFalsy: boolean;
}
export default function __buildCommandLine(command: string, args?: Record<string, unknown>, settings?: Partial<IBuildCommandLineSettings>): string;


export interface IComposerPathSettings {
    cwd: string;
    monorepo: boolean;
}
export default function composerPath(name: string, settings?: Partial<IComposerPathSettings>): any;

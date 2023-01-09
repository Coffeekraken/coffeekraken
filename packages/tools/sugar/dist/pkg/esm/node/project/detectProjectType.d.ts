
export interface IDetectProjectTypeResult {
    type: string;
    version: string;
    rawVersion: string;
    major: number;
    minor: number;
    fix: number;
}
export default function detectProjectType(cwd?: string): IDetectProjectTypeResult;

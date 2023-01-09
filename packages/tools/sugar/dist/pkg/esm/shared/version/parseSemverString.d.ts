
export interface ISemverObject {
    options: any;
    loose: boolean;
    includePrerelease: boolean;
    raw: string;
    major: number;
    minor: number;
    patch: number;
    prerelease: string[];
    build: string[];
    version: string;
}
export default function __parseSemverString(semverString: string): ISemverObject;


export interface IGithubDownloadRepositorySettings {
    dest: string;
    unzip: boolean;
    branch: String;
}
export interface IGithubDownloadRepositoryResult {
}
export default function __downloadGithubRepository(repository: string, settings?: Partial<IGithubDownloadRepositorySettings>): Promise<IGithubDownloadRepositoryResult>;

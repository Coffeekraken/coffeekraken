import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __ts from 'typescript';
import * as __tsMorph from 'ts-morph';

export interface ISTypescriptBuilderSettings extends ISBuilderSettings {
}
export interface ISTypescriptBuilderFileToBuild {
    cwd: string;
    relPath: string;
    path: string;
    format: 'esm' | 'cjs';
    platform: 'node' | 'browser';
    declarationFile: boolean;
    outDir: string;
}
export interface ISTypescriptBuilderResultFile {
    input: ISTypescriptBuilderFileToBuild;
    format: 'esm' | 'cjs';
    platform: 'node' | 'browser';
    declarationFiles: boolean;
    module: 'commonjs' | 'amd' | 'umd' | 'es6' | 'es2015' | 'es2020' | 'es2022' | 'esnext' | 'node12' | 'nodenext';
    js: string;
    file: __SFile;
}
export interface ISTypescriptBuildTemporaryResult {
    path: string;
    remove: Function;
}
export interface ISTypescriptBuilderResult {
    glob: string[];
    inDir: string;
    outDir: string;
    formats: ('esm' | 'cjs')[];
    platform: 'node' | 'browser';
    files: ISTypescriptBuilderResultFile[];
}
export interface ISTypescriptBuilderCustomSettingsItem {
    glob: string;
    settings: ISTypescriptBuilderBuildParams;
}
export interface ISTypescriptBuilderCustomSettings {
    [key: string]: ISTypescriptBuilderCustomSettingsItem;
}
export interface ISTypescriptBuilderBuildParams {
    glob: string[] | string;
    inDir: string;
    outDir: string;
    packageRoot?: string;
    formats: ('esm' | 'cjs')[];
    platform: 'node' | 'browser';
    declarationFiles: boolean;
    watch: boolean;
    buildInitial: boolean;
    customSettings: ISTypescriptBuilderCustomSettings;
    exclude: string[];
    save: boolean;
}
export default class STypescriptBuilder extends __SBuilder {
    
    _watchersByGlob: Record<string, any>;
    _tsHost: any;
    
    static buildTemporary(path: string, params?: Partial<ISTypescriptBuilderBuildParams>, settings?: Partial<ISTypescriptBuilderSettings>): Promise<ISTypescriptBuildTemporaryResult>;
    
    constructor(settings?: Partial<ISTypescriptBuilderSettings>);
    
    _build(params: ISTypescriptBuilderBuildParams): Promise<ISTypescriptBuilderResult>;
    _tsProject: any;
    _createTsProgramIfNeeded(compilerOptions: __ts.CompilerOptions, packageRoot?: any): __tsMorph.Project;
    _buildDeclarationFile(filePath: string, outputFilePath: string, packageRoot?: any): __SPromise<string>;
    _buildFile(file: ISTypescriptBuilderFileToBuild, params: ISTypescriptBuilderBuildParams): Promise<ISTypescriptBuilderResultFile>;
}

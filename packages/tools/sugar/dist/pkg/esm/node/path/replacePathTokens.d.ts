
export interface IReplacePathTokensSettings {
    packageTmpDir: boolean;
    packageLocalDir: boolean;
    packageCacheDir: boolean;
    packageRootDir: boolean;
    srcRootDir: boolean;
    distRootDir: boolean;
    srcJsDir: boolean;
    srcCssDir: boolean;
    srcDocDir: boolean;
    srcFontsDir: boolean;
    srcIconsDir: boolean;
    srcImgDir: boolean;
    srcNodeDir: boolean;
    srcViewsDir: boolean;
    distJsDir: boolean;
    distCssDir: boolean;
    distDocDir: boolean;
    distFontsDir: boolean;
    distIconsDir: boolean;
    distImgDir: boolean;
    distNodeDir: boolean;
    distViewsDir: boolean;
}
export default function __replacePathTokens(paths: any, settings?: Partial<IReplacePathTokensSettings>): string | string[];

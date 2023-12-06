export interface ISFrontspec {
    metas?: ISFrontspecMetas;
    assets?: ISFrontspecAssets;
    favicon?: ISFrontspecFavicon;
    theme?: ISFrontspecTheme;
    views?: ISFrontspecViews;
    specs?: ISFrontspecSpecs;
    google?: ISFrontspecGoogle;
    // lod?: ISFrontspecLod;
    partytown?: ISFrontspecPartytown;
    package?: ISFrontspecPackage;
}

export interface ISFrontspecPackage {
    version: string;
    name: string;
    description: string;
    author: string;
    license: string;
}

export interface ISFrontspecPartytown {
    enabled: boolean;
    forward: string[];
}

export interface ISFrontspecLod {
    enabled: boolean;
    defaultLevel: number;
    botLevel: number;
    levels: {
        [key: string]: {
            name: string;
            speedIndex: number;
        };
    };
    method: 'class';
    defaultAction: '>=' | '<=' | '=';
}

export interface ISFrontspecGoogle {
    gtm: string;
    map: {
        apiKey: string;
    };
}

export interface ISFrontspecSpecs {
    namespaces: {
        [key: string]: string[];
    };
    cwd: string;
}

export interface ISFrontspecViews {
    layouts: {
        [key: string]: {
            name: string;
            viewDotPath: string;
        };
    };
    rootDirs: string[];
}

export interface ISFrontspecMedia {
    defaultAction: '<=' | '>=' | '=';
    defaultMedia: string;
    queries: {
        [key: string]: {
            minWidth: number;
            maxWidth: number;
        };
    };
}

export interface ISFrontspecThemeLayout {
    offset: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    container: {
        [key: string]: string;
    };
    grid: {
        [key: string]: number;
    };
    layout: {
        [key: string]: string;
    };
}

export interface ISFrontspecThemeTypo {
    [key: string]: {
        label: 'string';
        group?: 'string';
        button?: {
            [key: string]: any;
        };
        editor?: {
            [key: string]: any;
        };
        style?: {
            [key: string]: any;
        };
    };
}

export interface ISFrontspecThemeLnf {
    margin?: ISFrontspecThemeMargin;
    padding?: ISFrontspecThemePadding;
    font?: ISFrontspecThemeFont;
    layout?: ISFrontspecThemeLayout;
}

export interface ISFrontspecThemeFont {
    family: {
        [key: string]: {
            fontFamily: string;
            fontWeight: string | number;
            import: string;
            fontStyle: string;
            fontDisplay: string;
            capHeight: number;
        };
    };
    size: {
        [key: string]: number | string;
    };
}

export interface ISFrontspecThemeMargin {
    [key: string]: number;
}
export interface ISFrontspecThemePadding {
    [key: string]: number;
}

export interface ISFrontspecThemeMetas {
    title: string;
    description: string;
}
export interface ISFrontspecTheme {
    theme: string;
    variant: string;
    themes: Record<string, ISFrontspecThemeMetas>;
    lnf: ISFrontspecThemeLnf;
}

export interface ISFrontspecFavicon {
    rootDir: string;
    fileName: string;
    filePath: string;
}

export interface ISFrontspecAsset {
    id: string;
    type: 'module';
    defer: boolean;
    nomodule: boolean;
    src: string;
    env: 'development' | 'production';
}
export interface ISFrontspecAssets {
    [key: string]: ISFrontspecAsset;
}

export interface ISFrontspecMetas {
    lang: string;
    title: string;
    description: string;
    homepage: string;
    themeColor: string;
    author: {
        name: string;
        email: string;
        url: string;
    };
    og: {
        title: string;
        description: string;
        type:
            | 'website'
            | 'article'
            | 'book'
            | 'profile'
            | 'music.song'
            | 'music.album'
            | 'music.playlist'
            | 'music.radio_station'
            | 'video.movie'
            | 'video.episode'
            | 'video.tv_show';
        url: string;
        image: string;
    };
}

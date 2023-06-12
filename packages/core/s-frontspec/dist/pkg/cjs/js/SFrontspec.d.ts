import { ISFrontspec, ISFrontspecAssets, ISFrontspecFavicon, ISFrontspecGoogle, ISFrontspecLod, ISFrontspecMedia, ISFrontspecMetas, ISFrontspecPackage, ISFrontspecPartytown, ISFrontspecSpecs, ISFrontspecTheme, ISFrontspecViews } from '@coffeekraken/s-frontspec';

export default class SFrontspec implements ISFrontspec {
    _defaultFrontspecInstance: any;
    
    static init(frontspec?: ISFrontspec): SFrontspec;
    
    static get(dotpath?: string): any;
    
    private _frontspec;
    
    get metas(): ISFrontspecMetas;
    
    get package(): ISFrontspecPackage;
    
    get assets(): ISFrontspecAssets;
    
    get favicon(): ISFrontspecFavicon;
    
    get theme(): ISFrontspecTheme;
    
    get media(): ISFrontspecMedia;
    
    get views(): ISFrontspecViews;
    
    get specs(): ISFrontspecSpecs;
    
    get google(): ISFrontspecGoogle;
    
    get lod(): ISFrontspecLod;
    
    get partytown(): ISFrontspecPartytown;
    
    constructor(frontspec?: ISFrontspec);
    
    get(dotpath?: string): any;
}

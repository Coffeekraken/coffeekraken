import __SColor from '@coffeekraken/s-color';
import __SThemeBase from '../shared/SThemeBase';

export default class STheme extends __SThemeBase {
    
    constructor(theme?: string, variant?: string);
    
    static getCurrentTheme(): STheme;
    
    getColor(name: string, schema?: string, state?: string): __SColor;
}

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __sVitePluginPostcss from '@coffeekraken/s-vite-plugin-postcss';
export default __sVitePluginPostcss(__SugarConfig.get('postcss.plugins'));

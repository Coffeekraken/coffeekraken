import __SugarConfig from '@coffeekraken/s-sugar-config';
import __viteImagemin from 'vite-plugin-imagemin';
export default __viteImagemin(__SugarConfig.get('imagemin'));

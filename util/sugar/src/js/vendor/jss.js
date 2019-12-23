import __jss from 'jss';
import __jssPluginVendorPrefixer from 'jss-plugin-vendor-prefixer';
import __jssPluginGlobal from 'jss-plugin-global';
__jss.use(__jssPluginVendorPrefixer(), __jssPluginGlobal());
export default function jss(styleObject) {
  const sheet = __jss.createStyleSheet(styleObject);
  sheet.attach();
  return sheet;
}

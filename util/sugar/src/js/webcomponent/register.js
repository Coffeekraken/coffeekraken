import __SWebComponent from './SWebComponent';
import __SLitWebComponent from './SLitHtmlWebComponent';
import __getHtmlClassFromTagName from '../html/getHtmlClassFromTagName';

export default function register(name, cls, settings = {}) {
  // check to get if the custom element extends a basic html one or not
  const splitedName = name.split(':');
  let extend = null;
  if (splitedName.length === 2) {
    extend = splitedName[0];
    name = splitedName[1];
  }

  const HtmlClassToExtend = __getHtmlClassFromTagName(extend);
  if (HtmlClassToExtend !== HTMLElement) settings.extends = HtmlClassToExtend;

  let BaseClass;
  if (settings.litHtml) {
    BaseClass = __SLitWebComponent(HtmlClassToExtend);
  } else {
    BaseClass = __SWebComponent(HtmlClassToExtend);
  }

  setTimeout(() => {
    console.log(BaseClass.coco);
    console.log(BaseClass);
    console.log(BaseClass.constructor);
    console.log(BaseClass.constructor.name);
    // BaseClass.define(name, cls, settings);
  }, 1000);

  return BaseClass;

  // function generateClass() {
  //   return cls extends BaseClass;
  // }

  // class MyWebComponent extends BaseClass {}
}

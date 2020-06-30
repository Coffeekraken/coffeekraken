import __SWebComponent from './SWebComponent';
import __SLitWebComponent from './SLitHtmlWebComponent';
import __getHtmlClassFromTagName from '../html/getHtmlClassFromTagName';
import __uncamelize from '../string/uncamelize';
import __htmlTagToHtmlClassMap from '../html/htmlTagToHtmlClassMap';

export { __SWebComponent as SWebComponent };
export { __SLitWebComponent as SLitHtmlWebComponent };
export { define, getComponentMetas };

const _SWebComponentStack = {};
export { _SWebComponentStack as stack };

function getComponentMetas(name) {
  return _SWebComponentStack[__uncamelize(name)] || {};
}

function define(name, cls, settings = {}) {
  if (!name)
    throw new Error(
      `SWebComponent: You must define a name for your webcomponent by setting either a static "name" property on your class, of by passing a name as first parameter of the static "define" function...`
    );

  let extend = null;
  for (let key in __htmlTagToHtmlClassMap) {
    if (cls.prototype instanceof __htmlTagToHtmlClassMap[key]) {
      extend = key;
      break;
    }
  }

  const uncamelizedName = __uncamelize(name);

  cls.componentName = name;

  _SWebComponentStack[uncamelizedName] = {
    name,
    dashName: uncamelizedName,
    class: cls,
    extends: extend,
    settings
  };

  if (window.customElements) {
    window.customElements.define(uncamelizedName, cls, {
      extends: extend
    });
  } else if (document.registerElement) {
    document.registerElement(uncamelizedName, {
      prototype: cls.prototype,
      extends: extend
    });
  } else {
    throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
  }
}

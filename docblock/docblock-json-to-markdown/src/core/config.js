import __abstractTag from "../tags/abstract";
import __categoryTag from "../tags/category";
import __constTag from "../tags/const";
import __copyrightTag from "../tags/copyright";
import __deprecatedTag from "../tags/deprecated";
import __finalTag from "../tags/final";
import __globalTag from "../tags/global";
import __interfaceTag from "../tags/interface";
import __overrideTag from "../tags/override";
import __packageTag from "../tags/package";
import __privateTag from "../tags/private";
import __propertiesTag from "../tags/properties";
import __protectedTag from "../tags/protected";
import __publicTag from "../tags/public";
import __todoTag from "../tags/todo";
import __exampleTag from "../tags/example";
import __extendsTag from "../tags/extends";
import __implementsTag from "../tags/implements";
import __authorTag from "../tags/author";
import __nameTag from "../tags/name";
import __namespaceTag from "../tags/namespace";
import __bodyTag from "../tags/body";
import __paramsTag from "../tags/params";
import __typesTag from "../tags/types";
import __returnTag from "../tags/return";
import __defaultTag from "../tags/default";
import __seeTag from "../tags/see";
import __staticTag from "../tags/static";
import __valuesTag from "../tags/values";

import __defaultTemplate from "../templates/default";
import __scssTemplate from "../templates/scss";
import __jsTemplate from "../templates/js";
import __phpTemplate from "../templates/php";

export default {
  language: "js",
  tags: {
    abstract: __abstractTag,
    category: __categoryTag,
    const: __constTag,
    copyright: __copyrightTag,
    deprecated: __deprecatedTag,
    final: __finalTag,
    global: __globalTag,
    interface: __interfaceTag,
    override: __overrideTag,
    package: __packageTag,
    private: __privateTag,
    properties: __propertiesTag,
    protected: __protectedTag,
    public: __publicTag,
    todo: __todoTag,
    example: __exampleTag,
    extends: __extendsTag,
    implements: __implementsTag,
    author: __authorTag,
    name: __nameTag,
    namespace: __namespaceTag,
    body: __bodyTag,
    params: __paramsTag,
    type: __typesTag,
    types: __typesTag,
    return: __returnTag,
    default: __defaultTag,
    see: __seeTag,
    static: __staticTag,
    values: __valuesTag
  },
  templates: {
    default: __defaultTemplate,
    scss: __scssTemplate,
    js: __jsTemplate,
    php: __phpTemplate
  },
  types: {
    js: {
      HTMLElement: "https://developer.mozilla.org/fr/docs/Web/API/HTMLElement",
      HTMLLinkElement:
        "https://developer.mozilla.org/fr/docs/Web/API/HTMLLinkElement",
      String:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String",
      Array:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array",
      Object:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object",
      Function:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function",
      Boolean:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean",
      Date:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date",
      Error:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Error",
      JSON:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON",
      Map:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map",
      Math:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math",
      NaN:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/NaN",
      Number:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number",
      Promise:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise",
      Proxy:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Proxy",
      RegExp:
        "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/RegExp"
    },
    scss: {
      List:
        "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists",
      String:
        "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings",
      Map:
        "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps",
      Color:
        "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors",
      Function:
        "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions",
      Mixin:
        "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins"
    },
    php: {
      String: "http://php.net/manual/en/language.types.string.php",
      Boolean: "http://php.net/manual/en/language.types.boolean.php",
      Integer: "http://php.net/manual/en/language.types.integer.php",
      Float: "http://php.net/manual/en/language.types.float.php",
      Double: "http://php.net/manual/en/language.types.float.php",
      Array: "http://php.net/manual/en/language.types.array.php",
      Object: "http://php.net/manual/en/language.types.object.php",
      Callable: "http://php.net/manual/en/language.types.callable.php",
      Resource: "http://php.net/manual/en/language.types.resource.php",
      NULL: "http://php.net/manual/en/language.types.null.php",
      Mixed:
        "http://php.net/manual/en/language.pseudo-types.php#language.types.mixed",
      Number:
        "http://php.net/manual/en/language.pseudo-types.php#language.types.number",
      Callback:
        "http://php.net/manual/en/language.pseudo-types.php#language.types.callback"
    }
  }
};

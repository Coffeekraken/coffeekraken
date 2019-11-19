# Coffeekraken Docblock JSON to Markdown <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/docblock-json-to-markdown?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/docblock-json-to-markdown?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/docblock-json-to-markdown?style=flat-square)

This package gives you the ability transform with ease a coffeekraken-docblock-parser resulting JSON into a beautiful markdown file.

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Documentation](#readme-documentation)

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/docblock-json-to-markdown --save-dev
```

<a name="readme-get-started"></a>

## Get Started

First, require the package in your javascript node file like so:

```js
const docblockJSONToMarkdown = require("@coffeekraken/docblock-json-to-markdown");
// use the package like so:
const markdown = docblockJSONToMarkdown(config).jsonToMarkdown(myCoolJSON);
```

<a id="readme-documentation"></a>

## Documentation

### Config

Here's the configuration object that you can hook as needed:

```js
{
  language : 'js', // Specify the language that is being processed like "js, scss, etc..."
  tags : {
    // all the tags render functions
    author : (author) => {
      return `- Author : ${author.name}`
    },
    // etc...
  },
  templates : {
    // all the templates render functions
    default : __defaultTemplate,
    // etc...
  },
  types : {
    // all the types URL for each languages like so:
    js : {
      HTMLElement : 'https://developer.mozilla.org/fr/docs/Web/API/HTMLElement',
      // etc...
      },
    scss : {
      // ...
    }
  }
}
```

### Types

In the config object, you will find the "types" property. This property represent an object by language that simply map a type with a URL where you can find more info on this type.

Here's the available out of the box types:

```js
{
  types : {
    js : {
      HTMLElement : 'https://developer.mozilla.org/fr/docs/Web/API/HTMLElement',
      HTMLLinkElement : 'https://developer.mozilla.org/fr/docs/Web/API/HTMLLinkElement',
      String : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String',
      Array : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array',
      Object : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object',
      Function : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function',
      Boolean : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean',
      Date : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date',
      Error : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Error',
      JSON : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON',
      Map : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map',
      Math : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math',
      NaN : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/NaN',
      Number : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number',
      Promise : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise',
      Proxy : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Proxy',
      RegExp : 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/RegExp'
    },
    scss : {
      List : 'http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists',
      String : 'http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings',
      Map : 'http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps',
      Color : 'http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors',
      Function : 'http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions',
      Mixin : 'http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins'
    },
    php : {
      String: 'http://php.net/manual/en/language.types.string.php',
      Boolean: 'http://php.net/manual/en/language.types.boolean.php',
      Integer: 'http://php.net/manual/en/language.types.integer.php',
      Float: 'http://php.net/manual/en/language.types.float.php',
      Double: 'http://php.net/manual/en/language.types.float.php',
      Array: 'http://php.net/manual/en/language.types.array.php',
      Object: 'http://php.net/manual/en/language.types.object.php',
      Callable: 'http://php.net/manual/en/language.types.callable.php',
      Resource: 'http://php.net/manual/en/language.types.resource.php',
      NULL: 'http://php.net/manual/en/language.types.null.php',
      Mixed: 'http://php.net/manual/en/language.pseudo-types.php#language.types.mixed',
      Number: 'http://php.net/manual/en/language.pseudo-types.php#language.types.number',
      Callback: 'http://php.net/manual/en/language.pseudo-types.php#language.types.callback'
    }
  }
}
```

### Add/Override a tag display

You can through the config add or override how a specific tag will be printed out in your final markdown file. Here's how:

```js
const docblockJSONToMarkdown = require("@coffeekraken/docblock-json-to-markdown");
// make a custom config
const config = {
  tags: {
    example: exampleData => {
      // make your own display
      return `
        ### Example
        \`\`\`${exampleData.language}
        ${exampleData.body}
        \`\`\`
      `;
    },
    myCoolTag: tagData => {
      // return something for your new cool tag
    }
  }
};
// use the package like so:
const markdown = docblockJSONToMarkdown(config).jsonToMarkdown(myCoolJSON);
```

### Custom templates

Templates are the backbone of the outputed markdown file. It describe which docblock will be displayed in which order, group, etc...
Here's the default template:

```js
export default function defaultTemplate(data) {
  return [
    this.renderBlocks(
      data.filter((block, index) => {
        return index === 0 && block.name && !block.private && !block.protected;
      }),
      {
        title: "@[0].name",
        titleLevelAdd: 1,
        doNotRender: ["name"]
      }
    ),
    this.renderBlocks(
      data.filter(block => {
        return block.constructor === true;
      }),
      {
        doNotRender: ["name"],
        title: "Constructor"
      }
    ),
    this.renderBlocks(
      data.filter(block => {
        return !block.event && block.styleguide !== undefined;
      }),
      {
        title: "Examples",
        description: "Here's some usage examples."
      }
    ),
    this.renderBlocks(
      data.filter(block => {
        return (
          !block.event &&
          (block.prop !== undefined || block.attribute !== undefined)
        );
      }),
      {
        title: "Attributes",
        description:
          "Here's the list of available attribute to set on the element."
      }
    ),
    this.renderBlocks(
      data.filter(block => {
        return !block.event && block.setting !== undefined;
      }),
      {
        title: "Settings",
        description: "Here's the list of available settings."
      }
    ),
    this.renderBlocks(
      data.filter(block => {
        return (
          !block.event &&
          !block.return &&
          block.types !== undefined &&
          !block.private &&
          !block.protected
        );
      }),
      {
        title: "Properties"
      }
    ),
    this.renderBlocks(
      data.filter(block => {
        return (
          !block.event && !block.types && !block.private && !block.protected
        );
      }),
      {
        title: "Methods"
      }
    ),
    this.renderBlocks(
      data.filter(block => {
        return block.event && !block.private && !block.protected;
      }),
      {
        title: "Events"
      }
    )
  ].join("\n");
}
```

#### Register/override a new template

You can register or override any template like so:

```js
const docblockJSONToMarkdown = require("@coffeekraken/docblock-json-to-markdown");
// make a custom config
const config = {
  templates: {
    jsx: data => {
      return [
        this.renderBlocks(
          data.filter(block => {
            return block.constructor === true;
          }),
          {
            doNotRender: ["name"],
            title: "Constructor"
          }
        )
      ].join("\n");
    }
  }
};
// use the package like so:
const markdown = docblockJSONToMarkdown(config).jsonToMarkdown(myCoolJSON);
```

> The template index has to be the language extension of the file processed.

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
